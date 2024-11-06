import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

export default function blogs() {

    // pagination 
    const [currentPage, setCurrentPage] = useState(1);// for page 1
    const [pagePage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch Blog data
    const { alldata, loading } = useFetchData('/api/blogs');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // total number of blogs
    const allblog = alldata.length;

    // filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery))

    // calcualte index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * pagePage;
    const indexOfLastblog = currentPage * pagePage;

    // get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog)
    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');

    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')

    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allblog / pagePage); i++) {
        pageNumber.push(i);
    }

    // remove markdown chars
    const stripMarkdown = (text) => {
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


    return <>
        <Head>
            <title>Blogs</title>
        </Head>
        <div className="blogpage">
            <section className="tophero">
                <div className="container_css">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Welcome to <span>Nazeem's Blogs</span></h1>
                            <p>I write about web Development, python and modern JavaScript frame works. The best articles, links and news related to web and mobile development </p>
                            <div className="subemail">
                                <form className='flex'>
                                    <input type="text" placeholder='Search Blogs here...' />
                                    <button>Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="featured">
                        <div className="container_css">
                            <div className="border"></div>
                            <div className="featuredposts">
                                <div className="fetitle flex">
                                    <h3>Featured Posts:</h3>
                                </div>
                                <div className="feposts flex">
                                    <Swiper
                                        slidesPerView={'auto'}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className='mySwiper'
                                        modules={[FreeMode]}
                                    >
                                        {loading ? <Spinner /> : <>{sliderpubdata.slice(0, 6).map((blog) => {
                                            return <SwiperSlide key={blog._id}>
                                                <div className="fpost" key={blog._id}>
                                                    <Link href={`/blogs/${blog.slug}`}>
                                                        <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                                                    </Link>
                                                    <div className="fpostinfo">
                                                        <div className="tegs flex">
                                                            {blog.blogcategory.map((cat) => {
                                                                return <Link href={`/blog/category/${cat}`} className='ai'><span></span>{cat}</Link>
                                                            })}
                                                        </div>
                                                        <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                                        <div className="fpostby flex">
                                                            <img src='/img/nazeem.jpg' alt='profile' />
                                                            <p>By Nazeem-Khan</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        })}</>}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="populartegssec">
                <div className="container_css">
                    <div className="border"></div>
                    <div className="populartegsdata">
                        <div className="fetitle">
                            <h3>Popular Tags: </h3>
                        </div>
                        <div className="poputegs">
                            <Link href={'/blog/category/Next Js'} className='pteg'>
                                <img src='/img/assets/atom.gif' alt='' />
                                <div className="tegs">
                                    <div className="apps"><span></span>Next JS</div>
                                </div>
                            </Link>

                            <Link href={'/blog/category/Next Js'} className='pteg'>
                                <img src='/img/assets/atom.gif' alt='' />
                                <div className="tegs">
                                    <div className="apps"><span></span>React JS</div>
                                </div>
                            </Link>

                            <Link href={'/blog/category/Next Js'} className='pteg'>
                                <img src='/img/assets/atom.gif' alt='' />
                                <div className="tegs">
                                    <div className="apps"><span></span>Next JS</div>
                                </div>
                            </Link>

                            <Link href={'/blog/category/Next Js'} className='pteg'>
                                <img src='/img/assets/atom.gif' alt='' />
                                <div className="tegs">
                                    <div className="apps"><span></span>Next JS</div>
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>
            </section>

            <section className="latestpostsec">
                <div className="container_css">
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3>Latest Articles:</h3>
                        </div>
                        <div className="latestposts">
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    return <div className="lpost" key={blog._id}>
                                        <div className="lpostimg">
                                            <Link href={`/blogs/${blog.slug}`}>
                                                <img src={blog.images[0]} alt={blog.title} />
                                                <div className="tegs">
                                                    {blog.blogcategory.map((cat) => {
                                                        return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                    })}
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="lpostinfo">
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                            <p>{stripMarkdown(blog.description)}</p>
                                            <h4 className='flex'><img src="/img/nazeem.jpg" alt="nazeem khan" />by nazeem-khan</h4>
                                        </div>
                                    </div>
                                })}
                            </>}
                        </div>
                        {/* for pagination */}
                        {publishedData.length === 0 ? ("") : (
                            <div className="blogspaginationbtn flex flex-center mt-3 ">
                                <button onClick={() => { paginate(currentPage - 1) }} disabled={currentPage === 1}>Previous</button>
                                {pageNumber.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumber.length)).map(number => (
                                    <button key={number}
                                        onClick={() => paginate(number)}
                                        className={`${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button onClick={() => { paginate(currentPage - 1) }} disabled={currentBlogs.length < pagePage}>Next</button>
                            </div>
                        )}
                    </div>
                    
                </div>
            </section>
        </div>
    </>
}