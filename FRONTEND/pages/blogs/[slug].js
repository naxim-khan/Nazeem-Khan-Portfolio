// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import {FiSearch } from 'react-icons/fi'
import {BiSearch} from 'react-icons/bi';
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";

const BlogPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { alldata } = useFetchData('/api/blogs');

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = ()=>{
        setSearchInput(!searchInput);
    }
    const handleSearchClose = ()=>{
        setSearchInput(false)
    }

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [messageOk, setMessageOk] = useState(false);

    const [copiedCode, setCopiedCode] = useState(false);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setBlogData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError("Failed to fetch blog data. Please try again later.");
                    setLoading(false);
                }
            }
        }
        fetchBlogData();
    }, [slug]);

    // comments section
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);

            // check if it's reply (nested comment) or root comment
            if (newComment.parent) {
                // add the new comment to it's parent's children array
                setBlogData(prevData => {
                    const updatedComments = prevData.comments.map(comment => {
                        if (comment._id === newComment.parent) {
                            return {
                                ...comment,
                                children: [...comment.children, response.data]
                            }
                        } else if (comment.children && comment.children.length > 0) {
                            // recursively update children comments
                            return {
                                ...comment,
                                children: updateChildrenComments(comment.children, newComment.parent, response.data),
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prevData,
                        comments: updatedComments
                    }

                })
            } else {
                // add new root comment
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments]
                }))
            }

            setMessageOk('✅ Comment posted successfully')
            setTimeout(() => {
                setMessageOk('')

            }, 5000) // clear message after 5 seconds
            // clear form after successfull submission

            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: '' // reset parent name after submission
            })

        } catch (error) {
            setMessageOk('❌ Failed to post comment')
            setTimeout(() => {
                setMessageOk('')
            }, 5000)
        }
    }

    // for scroll down to comment form
    const replyFormRef = useRef(null);
    const handleReply = (parentCommentId, parentName)=>{
        setNewComment({
            ...newComment,
            parent:parentCommentId,
            parentName: parentName , // set parent for the reply
            maincomment: false, // set main comment to false for replies
        })
        if(replyFormRef.current){
            replyFormRef.current.scrollIntoView({behave:"smooth"})
        }
    }
    const handleRemoveReply =()=>{
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,
            maincomment:true // set maincomment to true
        })
    }

    const updateChildrenComments = (comments, parentId, newComment) => {
        return comments.map(comment => {
            if(comment._id === parentId){
                // add new reply to children array
                return{
                    ...comment,
                    children:[...comment.children, newComment]
                }
            }else if (comment.children && comment.children.length > 0){
                // recursively update children comments
                return{
                    ...comment,
                    children: updateChildrenComments(comment.children, parentId, newComment)
                }
            }
            return comment;
        })

     }

    if (loading) {
        return <div className="flex_css flex-center_css wh_100_css"><Spinner /></div>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const createdAtDate = blogData.blog.createdAt ? new Date(blogData.blog.createdAt) : null;

    const formatDate = (date) => {
        if (!date || isNaN(date)) {
            return '';
        }
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true,
        }
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const blogUrl = `http://localhost:3000/blogs/${slug}`;

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    const detectLanguage = (code) => {
        // Trim whitespace from the beginning of the code
        const trimmedCode = code.trim();
    
        // Detect Python
        if (/^\s*def\s+\w+\s*\(/.test(trimmedCode) || /^\s*print\s*\(/.test(trimmedCode) || /^\s*import\s+\w+/.test(trimmedCode)) return 'python';
    
        // Detect Java
        if (/^\s*System\.out\.println\s*\(/.test(trimmedCode) || /^\s*class\s+\w+/.test(trimmedCode) || /^\s*public\s+static\s+void\s+main\s*\(/.test(trimmedCode)) return 'java';
    
        // Detect JavaScript
        if (/^\s*function\s+\w*\s*\(/.test(trimmedCode) || /=>\s*{/.test(trimmedCode) || /^\s*console\.log\s*\(/.test(trimmedCode)) return 'javascript';
    
        // Detect C
        if (/^\s*#include\s+<.*>/.test(trimmedCode) || /^\s*int\s+main\s*\(/.test(trimmedCode) || /^\s*printf\s*\(/.test(trimmedCode)) return 'c';
    
        // Detect C++
        if (/^\s*#include\s+<.*>/.test(trimmedCode) || /^\s*using\s+namespace\s+\w+;/.test(trimmedCode) || /^\s*cout\s*<</.test(trimmedCode)) return 'cpp';
    
        // Detect Ruby
        if (/^\s*def\s+\w+\s*\n/.test(trimmedCode) || /^\s*puts\s+/.test(trimmedCode)) return 'ruby';
    
        // Detect PHP
        if (/^\s*\<\?php/.test(trimmedCode) || /^\s*echo\s+/.test(trimmedCode)) return 'php';
    
        // Detect TypeScript
        if (/^\s*import\s+\w+\s+from\s+['"]/.test(trimmedCode) || /^\s*class\s+\w+\s*extends\s+\w+/.test(trimmedCode)) return 'typescript';
    
        // Detect Swift
        if (/^\s*import\s+\w+/.test(trimmedCode) || /^\s*func\s+\w+\s*\(/.test(trimmedCode)) return 'swift';
    
        // Detect HTML
        if (/^\s*<!DOCTYPE\s+html>/i.test(trimmedCode) || /^\s*<html>/i.test(trimmedCode) || /<\/[a-z]+>/i.test(trimmedCode)) return 'html';
    
        // Detect CSS
        if (/^\s*[a-zA-Z0-9\s.#:_-]+\s*{\s*[^{}]*\s*}/.test(trimmedCode) || /^\s*@\w+\s+[^{]*\s*{/.test(trimmedCode)) return 'css';
    
        // Default fallback for plaintext
        return 'plaintext';
    };
    
    const Code = ({ node, inline, className, children, ...props }) => {
        const codeString = String(children).replace(/\n$/, '');
        const language = detectLanguage(codeString);

        const handleCodeCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 3000);
        };

        if (inline) {
            return <code>{children}</code>;
        } else {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={language}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto' } }}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                    <button onClick={handleCodeCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
                        {copiedCode ? 'Copied' : 'Copy Code'}
                    </button>
                </div>
            );
        }
    };

    const renderComments = () => {
        const comments = blogData.comments; // Access comments from blogData
    
        if (!comments || comments.length === 0) {
            return <p>No comments yet. Be the first to comment!</p>;
        }
    
        // Create a map to efficiently find children of each comment
        const commentsMap = new Map();
        comments.forEach(comment => {
            if (comment.maincomment) {
                commentsMap.set(comment._id, []);
            }
        });
    
        // Populate children comments into their respective parents
        comments.forEach(comment => {
            if (!comment.maincomment && comment.parent) {
                if (commentsMap.has(comment.parent)) {
                    commentsMap.get(comment.parent).push(comment);
                }
            }
        });
    
        // Render the comments, starting with main comments
        return comments
            .filter(comment => comment.maincomment)
            .map(parentComment => (
                <div className="blogcomment" key={parentComment._id}>
                   <h3>{parentComment.name} <span>{new Date(parentComment.createdAt).toLocaleString()}</span></h3>
                   <h4>Topic: <span>{parentComment.title}</span></h4>
                   <p>{parentComment.contentpera}</p>
                   <button onClick={()=> handleReply(parentComment._id, parentComment.name)}>Reply</button>
                   {parentComment.parent && (
                    <span className="repliedto">Replied to {parentComment.parentName}</span>
                   )}

                   <div className="children-comments">
                    {commentsMap.get(parentComment._id).map(childComment =>(
                        <div className="child-comment" key={childComment._id}>
                            <h3>{childComment.name} <span>{new Date(childComment.createdAt).toLocaleString()}</span></h3>
                            <span>Replied to {childComment.parentName}</span>
                            <h4>Topic: <span>{childComment.title}</span></h4>
                            <p>{childComment.contentpera}</p>
                        </div>
                    ))}
                   </div>

                </div>
            ));
    };
    

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div>
                {blogData && (
                    <div className="blogslugpage">
                        <div className="container_css">
                            <div className="blogslugpagecont">
                                <div className="leftsitedetails">
                                    <div className="leftbloginfoimg">
                                        <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData.blog.title} />
                                    </div>
                                    <div className="slugbloginfopub">
                                        <div className="flex_css gap-2_css">
                                            <div className="adminslug">
                                                <img src='/img/nazeem.jpg' alt="nazeem khan" />
                                                <span>By Nazeem</span>
                                            </div>
                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>
                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comment ({blogData.comments.length})</span>
                                            </div>
                                        </div>

                                        <div className="shareblogslug">
                                            <div title="Copy URL" onClick={() => handleCopyUrl(blogUrl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <RiFacebookFill />
                                            </a>
                                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <FaTwitter />
                                            </a>
                                            <a href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <RiWhatsappFill />
                                            </a>
                                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <BiLogoLinkedin />
                                            </a>
                                        </div>
                                    </div>

                                    <h1>{blogData.blog.title}</h1>
                                    <div className="blogcontent">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: Code
                                            }}
                                        >
                                            {blogData.blog.description}
                                        </ReactMarkdown>
                                    </div>

                                    <div className="blogslugtags">
                                        <div className="blogstegs">
                                            <h2>Tags:</h2>
                                            <div className="flex_css flex-wrap_css gap-1_css">
                                                {blogData && blogData.blog.tags.map((cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blogusecomments">
                                        <h2>Comments</h2>
                                        { renderComments(blogData.comments) }
                                    </div>
                                    <div className="blogslugcomments" ref={replyFormRef}>
                                        { newComment.parentName && (
                                            <h2>Leave a reply to <span className="perentname">{newComment.parentName}</span><button onClick={handleRemoveReply} className="removereplybtn">Remove Reply</button> </h2>
                                        )}

                                        { !newComment.parent && (
                                            <h2>Leave a reply</h2>
                                        )}

                                        <p>Your email address will not be publish. Required fields are marked *</p>
                                        <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                            <div className="nameemailcomment">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={newComment.name}
                                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Email"
                                                    value={newComment.email}
                                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter Title" 
                                                value={newComment.title}
                                                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                            />
                                            <textarea
                                                name=""
                                                placeholder="Enter Your Comment"
                                                id="textcomments"
                                                value={newComment.contentpera}
                                                onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}
                                            />
                                            <div className="flex_css gap-2_css">
                                                <button type="submit">Post Comment</button>
                                                {messageOk && <p>{messageOk}</p>}
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                <div className="rightsitedetails">
                                    <div className="rightslugsearchbar">
                                        <input onClick={handleSearchOpen} type="text" placeholder="Search..." />
                                        <button><FiSearch/></button>
                                    </div>
                                    <div className="rightslugcategory">
                                        <h2>CATEGORIES</h2>
                                        <ul>
                                            <Link href={'/blogs/category/Node js'} ><li>Node js <span>({alldata.filter(ab => ab.blogcategory[0] === 'Node js').length})</span></li></Link>
                                            <Link href={'/blogs/category/Next js'} ><li>Next js <span>({alldata.filter(ab => ab.blogcategory[0] === 'Next js').length})</span></li></Link>
                                            <Link href={'/blogs/category/React js'} ><li>React js <span>({alldata.filter(ab => ab.blogcategory[0] === 'React js').length})</span></li></Link>
                                            <Link href={'/blogs/category/Express js'} ><li>Express js <span>({alldata.filter(ab => ab.blogcategory[0] === 'Express js').length})</span></li></Link>
                                            <Link href={'/blogs/category/Full Stack'} ><li>Full Stack Web Dev <span>({alldata.filter(ab => ab.blogcategory[0] === 'Full Stack').length})</span></li></Link>
                                            <Link href={'/blogs/category/JavaScript'} ><li>JavaScript <span>({alldata.filter(ab => ab.blogcategory[0] === 'JavaScript').length})</span></li></Link>
                                            <Link href={'/blogs/category/Python'} ><li>Python <span>({alldata.filter(ab => ab.blogcategory[0] === 'Python').length})</span></li></Link>
                                            <Link href={'/blogs/category/Database'} ><li>Database <span>({alldata.filter(ab => ab.blogcategory[0] === 'Database').length})</span></li></Link>
                                            <Link href={'/blogs/category/CSS'} ><li>CSS <span>({alldata.filter(ab => ab.blogcategory[0] === 'CSS').length})</span></li></Link>
                                            <Link href={'/blogs/category/HTML'} ><li>HTML <span>({alldata.filter(ab => ab.blogcategory[0] === 'HTML').length})</span></li></Link>
                                        </ul>
                                    </div>
                                    <div className="rightrecentpost">
                                        <h2>RECENT POST</h2>
                                        {alldata.slice(0,3).map((blog)=>{
                                            return <Link key={blog._id} href={`/blogs/${blog.slug}`} className="rightrecentp">
                                                <img src={blog.images[0] || "/img/noimage.png"} alt={blog.title}/>
                                                <div>
                                                    <h3>{blog.title}</h3>
                                                    <h4 className="mt-1">
                                                        {blog.tags.map((cat)=>{
                                                            return <span key={cat}>{cat}</span>
                                                        })}
                                                    </h4>
                                                </div>
                                            </Link>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {searchInput ? <Blogsearch cls={handleSearchClose}/> : null}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPage;
