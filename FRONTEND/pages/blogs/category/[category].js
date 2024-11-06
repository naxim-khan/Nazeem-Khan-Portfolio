import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';



export default function Category() {

    const router = useRouter();
    const { category } = router.query;

    const [currentPage, setCurrentPage] = useState(1);
    const [pagePage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');

    // fetch blog category data
    const { alldata, loading } = useFetchData(`/api/blogs?blogcategory=${category}`);

    const filteredBlogs = alldata.filter((item) => item.category === item.category).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

    const blogcategory = [...filteredBlogs].reverse();

    // function to handle page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length; // total number of blogs

    // calcualte index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * pagePage;
    const indexOfLastblog = currentPage * pagePage;

    // get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog)
    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');
    console.log(publishedData)

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
            <title>Blog category page</title>
        </Head>
        <div className="blogcategory">
            <section className="tophero">
                <div className="container_css">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latestpostssec">
                <div className="container_css">
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3>Next Js Articles : </h3>
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
                    </div>
                </div>
            </section>

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
    </>
}