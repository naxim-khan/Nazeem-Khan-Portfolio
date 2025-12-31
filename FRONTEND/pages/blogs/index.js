import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import Head from 'next/head';
import { FiSearch } from 'react-icons/fi';
import { LuLayoutDashboard } from "react-icons/lu";

export default function blogs() {

    // pagination 
    const [currentPage, setCurrentPage] = useState(1);// for page 1
    const [perPage] = useState(6); // Increased per page for better grid view

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch Blog data
    const { alldata, loading } = useFetchData('/api/blogs');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // total number of blogs
    const allblog = alldata.length;

    // filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

    // calcualte index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    // get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog)
    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');

    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    // remove markdown chars
    const stripMarkdown = (text) => {
        if (!text) return '';
        return text
            .replace(/(#+\s*)/g, '')               // Remove headers (e.g., ### or ##)
            .replace(/(```[\s\S]*?```)/g, '')       // Remove code blocks
            .replace(/`(.+?)`/g, '$1')              // Remove inline code
            .replace(/\*\*(.+?)\*\*/g, '$1')        // Remove bold syntax
            .replace(/\*(.+?)\*/g, '$1')            // Remove italic syntax
            .replace(/!\[.*?\]\(.*?\)/g, '')        // Remove images
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')     // Remove links but keep the text
            .replace(/>\s*/g, '')                   // Remove blockquotes
            .replace(/[-*+]\s+/g, '')               // Remove list bullets
            .replace(/\n+/g, ' ')                   // Replace newlines with spaces
            .trim();                                // Trim any extra whitespace
    };

    return (
        <>
            <Head>
                <title>Blogs - Nazeem Khan</title>
            </Head>
            {/* INVERTED LOGIC: Default is Dark, .dark class is Light */}
            <div className="bg-[#000319] dark:bg-white min-h-screen text-white dark:text-gray-900 font-sans pt-24 pb-12 overflow-hidden selection:bg-[#cbacf9] selection:text-[#000319] transition-colors duration-300">

                {/* Background Effects */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    {/* Dark Mode Blobs (Visible by default) */}
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-100 dark:opacity-0 transition-opacity" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen opacity-100 dark:opacity-0 transition-opacity" />

                    {/* Light Mode Gradient (Visible via .dark) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 opacity-0 dark:opacity-100 transition-opacity -z-10" />
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">

                    {/* Hero Section */}
                    <div className="text-center mb-16 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 dark:from-gray-900 dark:via-gray-700 dark:to-gray-500">
                            Knowledge <span className="text-[#cbacf9] dark:text-[#8750f7]">Hub</span>
                        </h1>
                        <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Exploring Web Development, Python, and the modern JavaScript ecosystem.
                            Insights, tutorials, and deep dives into the technologies building the web.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-lg mx-auto mt-8 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#cbacf9] to-[#8750f7] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative flex items-center bg-[#100d25] dark:bg-white border border-white/10 dark:border-gray-200 rounded-full shadow-xl h-12">
                                <div className="pl-5 pr-2 text-gray-400 dark:text-gray-400 text-lg">
                                    <FiSearch />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search article..."
                                    className="flex-1 bg-transparent text-white dark:text-gray-900 px-2 py-2 focus:outline-none placeholder-gray-500 dark:placeholder-gray-500 text-base h-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="mr-1 bg-[#cbacf9] dark:bg-[#8750f7] text-[#000319] dark:text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm h-10 my-1 mr-1">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Posts Slider */}
                    {!searchQuery && (
                        <div className="mb-20">
                            <div className="flex items-center gap-2 mb-8 ml-2">
                                <LuLayoutDashboard className="text-[#cbacf9] dark:text-[#8750f7] text-xl" />
                                <h2 className="text-2xl font-bold text-white dark:text-gray-900">Featured Posts</h2>
                            </div>

                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    1024: { slidesPerView: 3, spaceBetween: 30 },
                                }}
                                freeMode={true}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                modules={[FreeMode, Pagination, Autoplay]}
                                className="pb-12"
                            >
                                {loading ? (
                                    <div className="flex justify-center py-20"><Spinner /></div>
                                ) : (
                                    sliderpubdata.slice(0, 6).map((blog) => (
                                        <SwiperSlide key={blog._id} className="h-auto">
                                            <Link href={`/blogs/${blog.slug}`} className="block h-full group">
                                                <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/5 dark:border-gray-200 bg-[#100d25] dark:bg-white shadow-sm hover:shadow-md transition-shadow">
                                                    <img
                                                        src={blog.images[0] || '/img/noimage.png'}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            {blog.blogcategory.slice(0, 2).map((cat) => (
                                                                <span key={cat} className="text-[10px] uppercase tracking-wider font-semibold bg-[#cbacf9] dark:bg-[#8750f7] text-[#000319] dark:text-white px-2 py-1 rounded">
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#cbacf9] dark:group-hover:text-[#8750f7] transition-colors line-clamp-2">
                                                            {blog.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                )}
                            </Swiper>
                        </div>
                    )}


                    {/* Latest Articles Grid */}
                    <div id="latest-posts" className="min-h-[500px]">
                        <div className="flex items-center justify-between mb-8 ml-2">
                            <h2 className="text-2xl font-bold text-white dark:text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-8 bg-[#cbacf9] dark:bg-[#8750f7] rounded-full block"></span>
                                {searchQuery ? `Search Results for "${searchQuery}"` : "Latest Articles"}
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20"><Spinner /></div>
                        ) : (
                            <>
                                {publishedData.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {publishedData.map((blog) => (
                                            <div key={blog._id} className="group bg-[#100d25] dark:bg-white border border-white/5 dark:border-gray-200 rounded-2xl overflow-hidden hover:border-[#cbacf9]/30 dark:hover:border-[#8750f7]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 dark:hover:shadow-purple-900/20 flex flex-col h-full">
                                                {/* Image Container */}
                                                <div className="relative w-full aspect-[16/10] overflow-hidden">
                                                    <Link href={`/blogs/${blog.slug}`}>
                                                        <div className="absolute inset-0 bg-gray-900 dark:bg-gray-200 animate-pulse" /> {/* Placeholder */}
                                                        <img
                                                            src={blog.images[0] || '/img/noimage.png'}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                                                        />
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-20" />
                                                    </Link>

                                                    {/* Categories on Image */}
                                                    <div className="absolute top-4 left-4 z-30 flex flex-wrap gap-2">
                                                        {blog.blogcategory.slice(0, 2).map((cat) => (
                                                            <span key={cat} className="text-[10px] font-bold uppercase tracking-wider bg-black/60 dark:bg-white/90 backdrop-blur-md text-white dark:text-gray-900 px-2 py-1 rounded border border-white/10 shadow-sm">
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Content - Flex-Grow ensures equal height cards alignment */}
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <Link href={`/blogs/${blog.slug}`} className="block mb-3">
                                                        <h3 className="text-xl font-bold text-gray-100 dark:text-gray-900 group-hover:text-[#cbacf9] dark:group-hover:text-[#8750f7] transition-colors leading-tight line-clamp-2" title={blog.title}>
                                                            {blog.title}
                                                        </h3>
                                                    </Link>

                                                    {/* Description with defined Line Clamp */}
                                                    <p className="text-gray-400 dark:text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                        {stripMarkdown(blog.description)}
                                                    </p>

                                                    {/* Footer (Author) - Pushed to bottom */}
                                                    <div className="mt-auto pt-4 border-t border-white/5 dark:border-gray-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <img src="/img/nazeem.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover border border-white/10 dark:border-gray-200" />
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-medium text-white dark:text-gray-900">Nazeem Khan</span>
                                                                <span className="text-[10px] text-gray-500">Author</span>
                                                            </div>
                                                        </div>
                                                        <Link href={`/blogs/${blog.slug}`} className="text-xs font-medium text-[#cbacf9] dark:text-[#8750f7] hover:text-white dark:hover:text-gray-900 transition-colors">
                                                            Read More →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                                        <p className="text-xl">No articles found matching your search.</p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Pagination */}
                        {pageNumbers.length > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-16 pb-8">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-[#100d25] dark:bg-white border border-white/10 dark:border-gray-200 text-white dark:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 dark:hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Previous
                                </button>

                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center border font-medium transition-all shadow-sm ${currentPage === number
                                                ? 'bg-[#cbacf9] dark:bg-[#8750f7] border-[#cbacf9] dark:border-[#8750f7] text-[#000319] dark:text-white'
                                                : 'bg-[#100d25] dark:bg-white border-white/10 dark:border-gray-200 text-white dark:text-gray-700 hover:bg-white/5 dark:hover:bg-gray-50'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === pageNumbers.length}
                                    className="px-4 py-2 rounded-lg bg-[#100d25] dark:bg-white border border-white/10 dark:border-gray-200 text-white dark:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 dark:hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </>
    )
}