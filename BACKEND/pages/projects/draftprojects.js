import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData"
import { useState } from "react";
import { BiLogoBlogger } from "react-icons/bi"
import Link from "next/link";
import { ImConfused } from "react-icons/im";
import {FaEdit} from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Draft() {
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);// for page 1
    const [pagePage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch Blog data
    const { alldata, loading } = useFetchData('/api/projects');

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
    const publishedblogs = currentBlogs.filter(ab => ab.status === 'draft');
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allblog / pagePage); i++) {
        pageNumber.push(i);
    }

    return <>
       <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <h2>All Drafts <span>Projects</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
                <BiLogoBlogger /> <span>/</span><span>Projects / Drafts</span>
            </div>

            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Draft Projects:</h2>
                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title...." />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <tr>
                                <td><Dataloading /></td>
                            </tr>
                        </> : <>
                            {publishedblogs.length === 0 ?(
                                <tr>
                                    <td colSpan={4} className="text-center">NO Drafts Projects Found...! <ImConfused /></td>
                                </tr>
                            ) : (
                                publishedblogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td>
                                            <div className="w-[180px] h-[180px] overflow-hidden">
                                                <img
                                                    src={blog.images[0]}
                                                    alt="image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td>{blog.title}</td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/projects/edit/` + blog._id}>
                                                    <button> <FaEdit /> </button>
                                                </Link>

                                                <Link href={`/projects/delete/` + blog._id}>
                                                    <button> <RiDeleteBin6Fill /> </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </>
                        }
                    </tbody>
                </table>
                {/* for pagination */}
                {publishedblogs.length === 0 ? (""):(
                    <div className="blogpagination">
                        <button onClick={()=>{paginate(currentPage-1)}} disabled={currentPage === 1}>Previous</button>
                        {pageNumber.slice(Math.max(currentPage-3,0), Math.min(currentPage+2, pageNumber.length)).map(number =>(
                            <button key={number}
                            onClick={()=> paginate(number)}
                            className={`${currentPage === number ? 'active':''}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={()=>{paginate(currentPage-1)}} disabled={currentBlogs.length < pagePage}>Next</button>
                    </div>
                )}
                
            </div>
        </div>
    </>
}