import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

// Utility function to extract the first paragraph from markdown content
const extractFirstParagraph = (markdown) => {
    const paragraphs = markdown.split('\n\n');
    return paragraphs[0];
};

export default function BlogSearch(props) {
    const { alldata } = useFetchData('/api/blogs');  // Assuming this hook fetches blogs data and returns `alldata`
    
    const [searchResult, setSearchResult] = useState([]);  // Initializing as an empty array
    const [blogTitle, setBlogTitle] = useState('');  // Initializing blogTitle as a string

    // Filter for published blogs
    const publishedData = alldata ? alldata.filter(blog => blog.status === 'publish') : [];

    // Handle search filtering based on blog title
    useEffect(() => {
        if (!blogTitle.trim()) {
            setSearchResult([]);
            return;
        }

        // Filter the blogs whose titles include the search input
        const filteredBlogs = publishedData.filter(blog =>
            blog.title.toLowerCase().includes(blogTitle.toLowerCase())
        );

        setSearchResult(filteredBlogs);  // Update search results based on filtered data
    }, [blogTitle, publishedData]);  // Depend on `publishedData` to re-run when blogs data changes

    // Clears the input field when a blog is clicked
    const handleBlogClick = () => {
        setBlogTitle('');
    };

    return (
        <div className="searchblogfix">
            <div className="searchblogsectionfix">
                <div className="sbsfinput flex gap-1">
                    <input
                        type="text"
                        placeholder="Search blog here"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                    />
                    <div className="sbsinputclose" onClick={props.cls}>
                        <IoClose />
                    </div>
                </div>
                <div className="sbsfsearchlist mt-2">
                    {blogTitle && (
                        <>
                            {searchResult.length === 0 ? (
                                <h3>No Blog Found <span>(please check your spelling)</span></h3>
                            ) : (
                                <>
                                    {searchResult.slice(0, 10).map((blog) => (
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            key={blog._id}
                                            className="sbsfsbox"
                                            onClick={() => {
                                                props.cls();
                                                handleBlogClick();
                                            }}
                                        >
                                            <h2>{blog.title}</h2>
                                            <p>{extractFirstParagraph(blog.description)}</p>
                                        </Link>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
