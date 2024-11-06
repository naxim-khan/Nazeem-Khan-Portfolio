import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData"
import { useState } from "react";
import { BiLogoBlogger } from "react-icons/bi"
import Link from "next/link";
import { ImConfused } from "react-icons/im";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Contacts() {
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);// for page 1
    const [pagePage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch Contact data
    const { alldata, loading } = useFetchData('/api/contacts');

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
    const publishedblogs = currentBlogs; // .filter(ab => ab.status === 'publish')
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allblog / pagePage); i++) {
        pageNumber.push(i);
    }

    return <>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <h2>All <span>Contacts</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
                <BiLogoBlogger /> <span>/</span> <span>Contacts</span>
            </div>

            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Contacts by name:</h2>
                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by name..." />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Phone no</th>
                            <th>Project</th>
                            <th>Open Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <tr>
                                <td><Dataloading /></td>
                            </tr>
                        </> : <>
                            {publishedblogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">No Contacts Found...! <ImConfused /></td>
                                </tr>
                            ) : (
                                publishedblogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h3>{blog.name}</h3></td>
                                        <td><h3>{blog.email}</h3></td>
                                        <td><h3>{blog.phone}</h3></td>
                                        <td><h3>{blog.title}</h3></td>
                                        <td><h3>{blog.project}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/contacts/view/` + blog._id}>
                                                    <button> <FaRegEye /> </button>
                                                </Link>

                                                {/* <Link href={`/blogs/delete/` + blog._id}>
                                                    <button> <RiDeleteBin6Fill /> </button>
                                                </Link> */}
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
                {publishedblogs.length === 0 ? ("") : (
                    <div className="blogpagination">
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
    </>
}