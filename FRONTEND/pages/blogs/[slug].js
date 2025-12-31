// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { FiSearch, FiCopy } from 'react-icons/fi';
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Imported prism (light) style
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";

const detectLanguage = (code) => {
    const trimmedCode = code.trim();
    if (/^\s*def\s+\w+\s*\(/.test(trimmedCode) || /^\s*print\s*\(/.test(trimmedCode) || /^\s*import\s+\w+/.test(trimmedCode)) return 'python';
    if (/^\s*System\.out\.println\s*\(/.test(trimmedCode) || /^\s*class\s+\w+/.test(trimmedCode) || /^\s*public\s+static\s+void\s+main\s*\(/.test(trimmedCode)) return 'java';
    if (/^\s*function\s+\w*\s*\(/.test(trimmedCode) || /=>\s*{/.test(trimmedCode) || /^\s*console\.log\s*\(/.test(trimmedCode)) return 'javascript';
    return 'plaintext';
};

const CodeBlock = ({ node, inline, className, children, copiedCode, setCopiedCode, ...props }) => {
    const codeString = String(children).replace(/\n$/, '');
    const language = detectLanguage(codeString);

    const handleCodeCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 3000);
    };

    if (inline) {
        // Inverted: Default Dark (gray-800), .dark Light (gray-200/300)
        return <code className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900 rounded px-1 py-0.5" {...props}>{children}</code>;
    } else {
        return (
            <div className="relative group my-6 overflow-hidden rounded-lg shadow-xl ring-1 ring-white/10 dark:ring-gray-200">
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] dark:bg-gray-100 border-b border-white/5 dark:border-gray-200">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-600 uppercase tracking-wider">{language}</span>
                    <button
                        onClick={handleCodeCopy}
                        className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900 transition-colors"
                    >
                        {copiedCode ? (
                            <>
                                <span className="text-green-400 dark:text-green-600 font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <FiCopy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
                {/* Syntax Highlighter - This is trickier to swap dynamically without context or a full reload, 
                    but we can try to wrap it. For now, we'll stick to a Dark theme for code blocks as it's often preferred, 
                    or we could try to conditional rendering if we had access to the theme state. 
                    Given the structure, we'll keep it dark for consistency, but container is theme aware. */}
                <div className="dark:hidden">
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={language}
                        PreTag="div"
                        {...props}
                        customStyle={{ margin: 0, padding: '1.5rem', background: '#1e1e1e', fontSize: '0.9rem', lineHeight: '1.6' }}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
                <div className="hidden dark:block">
                    <SyntaxHighlighter
                        style={prism} // Light theme for code
                        language={language}
                        PreTag="div"
                        {...props}
                        customStyle={{ margin: 0, padding: '1.5rem', background: '#f5f5f5', fontSize: '0.9rem', lineHeight: '1.6' }}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
};

const BlogPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { alldata } = useFetchData('/api/blogs');

    const [searchInput, setSearchInput] = useState(false);
    const handleSearchOpen = () => setSearchInput(!searchInput);
    const handleSearchClose = () => setSearchInput(false);

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
    const [newComment, setNewComment] = useState({
        name: '', email: '', title: '', contentpera: '', maincomment: true, parent: null, parentName: ''
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);
            // ... (comment logic remains same, abstracted) ...
            if (newComment.parent) {
                setBlogData(prevData => {
                    const updatedComments = prevData.comments.map(comment => {
                        if (comment._id === newComment.parent) {
                            return { ...comment, children: [...comment.children, response.data] }
                        } else if (comment.children?.length > 0) {
                            return { ...comment, children: updateChildrenComments(comment.children, newComment.parent, response.data) };
                        }
                        return comment;
                    });
                    return { ...prevData, comments: updatedComments }
                })
            } else {
                setBlogData(prevData => ({ ...prevData, comments: [response.data, ...prevData.comments] }))
            }
            setMessageOk('✅ Comment posted successfully');
            setTimeout(() => setMessageOk(''), 5000);
            setNewComment({ name: '', email: '', title: '', contentpera: '', maincomment: true, parent: null, parentName: '' });
        } catch (error) {
            setMessageOk('❌ Failed to post comment');
            setTimeout(() => setMessageOk(''), 5000);
        }
    }

    const replyFormRef = useRef(null);
    const handleReply = (parentCommentId, parentName) => {
        setNewComment({ ...newComment, parent: parentCommentId, parentName: parentName, maincomment: false });
        if (replyFormRef.current) replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const handleRemoveReply = () => {
        setNewComment({ ...newComment, parent: null, parentName: null, maincomment: true });
    }

    const updateChildrenComments = (comments, parentId, newComment) => {
        return comments.map(comment => {
            if (comment._id === parentId) {
                return { ...comment, children: [...comment.children, newComment] }
            } else if (comment.children?.length > 0) {
                return { ...comment, children: updateChildrenComments(comment.children, parentId, newComment) }
            }
            return comment;
        })
    }

    if (loading) return <div className="flex items-center justify-center w-full h-screen bg-[#000319] dark:bg-white transition-colors duration-300"><Spinner /></div>
    if (error) return <div className="text-center text-red-500 py-10 bg-[#000319] dark:bg-white h-screen flex items-center justify-center transition-colors duration-300">{error}</div>

    const createdAtDate = blogData.blog.createdAt ? new Date(blogData.blog.createdAt) : null;
    const formatDate = (date) => date ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date) : '';
    const blogUrl = typeof window !== 'undefined' ? `${window.location.origin}/blogs/${slug}` : '';

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    const renderComments = () => {
        const comments = blogData.comments;
        if (!comments || comments.length === 0) return <div className="text-gray-400 dark:text-gray-500 italic text-center py-8">No comments yet. Be the first to start the conversation!</div>;

        const commentsMap = new Map();
        comments.forEach(comment => { if (comment.maincomment) commentsMap.set(comment._id, []); });
        comments.forEach(comment => {
            if (!comment.maincomment && comment.parent && commentsMap.has(comment.parent)) {
                commentsMap.get(comment.parent).push(comment);
            }
        });

        return comments.filter(comment => comment.maincomment).map(parentComment => (
            <div className="bg-[#100d25]/50 dark:bg-white/50 border border-white/5 dark:border-gray-200 rounded-xl p-6 mb-6 transition-colors duration-300" key={parentComment._id}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white dark:text-gray-900 font-semibold text-lg flex items-center gap-2">
                        {parentComment.name}
                        <span className="text-xs text-gray-500 font-normal bg-[#1e1e1e] dark:bg-gray-100 dark:text-gray-600 px-2 py-1 rounded-full">{new Date(parentComment.createdAt).toLocaleDateString()}</span>
                    </h3>
                    <button onClick={() => handleReply(parentComment._id, parentComment.name)} className="text-[#cbacf9] dark:text-[#8750f7] text-sm hover:text-white dark:hover:text-gray-900 transition-colors underline-offset-4 hover:underline">Reply</button>
                </div>
                {parentComment.title && <h4 className="text-gray-300 dark:text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide opacity-80">{parentComment.title}</h4>}
                <p className="text-gray-300 dark:text-gray-700 leading-relaxed text-sm mb-4">{parentComment.contentpera}</p>
                {parentComment.parent && <span className="text-xs text-indigo-400 dark:text-indigo-600 block mt-2">Replied to {parentComment.parentName}</span>}

                <div className="pl-6 border-l-2 border-white/10 dark:border-gray-200 space-y-4 mt-6">
                    {commentsMap.get(parentComment._id).map(childComment => (
                        <div className="bg-[#0a0518] dark:bg-gray-50 rounded-lg p-4 transition-colors duration-300" key={childComment._id}>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-gray-200 dark:text-gray-900 font-semibold text-sm">
                                    {childComment.name}
                                    <span className="ml-2 text-[10px] text-gray-500">{new Date(childComment.createdAt).toLocaleDateString()}</span>
                                </h3>
                            </div>
                            <p className="text-gray-400 dark:text-gray-600 text-sm leading-relaxed">{childComment.contentpera}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <>
            <Head>
                <title>{blogData.blog.title || slug}</title>
            </Head>

            {/* Inverted Logic: bg-[#000319] (Dark) is Default. dark:bg-white (Light) is active when .dark class is present */}
            <div className="bg-[#000319] dark:bg-white min-h-screen text-white dark:text-gray-900 font-sans selection:bg-[#cbacf9] selection:text-[#000319] pt-24 pb-12 transition-colors duration-300">
                {/* Background Effects */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-100 dark:opacity-0 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen opacity-100 dark:opacity-0 transition-opacity" />
                    {/* Light Mode Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 opacity-0 dark:opacity-100 transition-opacity -z-10" />
                </div>

                {blogData && blogData.blog && (
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                            {/* Main Content Column */}
                            <div className="lg:col-span-8 flex flex-col gap-10">

                                {/* Hero Section */}
                                <div className="space-y-6">
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 dark:ring-gray-200 group bg-[#100d25] dark:bg-white transition-colors duration-300">
                                        <img
                                            src={blogData.blog.images?.[0] || '/img/noimage.png'}
                                            alt={blogData.blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#000319] via-transparent to-transparent opacity-60 dark:opacity-20" />
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500 border-b border-white/5 dark:border-gray-200 pb-6">
                                        <div className="flex items-center gap-2 bg-[#100d25] dark:bg-white px-3 py-1.5 rounded-full ring-1 ring-white/5 dark:ring-gray-200 shadow-sm">
                                            <img src='/img/nazeem.jpg' alt="nazeem khan" className="w-6 h-6 rounded-full object-cover" />
                                            <span className="font-medium text-gray-200 dark:text-gray-700">Nazeem</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-2">
                                            <SlCalender className="text-[#cbacf9] dark:text-[#8750f7]" />
                                            <span>{formatDate(createdAtDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-2">
                                            <CiRead className="text-[#cbacf9] dark:text-[#8750f7] text-lg" />
                                            <span>{blogData.comments.length} Comments</span>
                                        </div>

                                        <div className="ml-auto flex items-center gap-3">
                                            <button
                                                onClick={() => handleCopyUrl(blogUrl)}
                                                className="p-2 hover:bg-white/5 dark:hover:bg-gray-100 rounded-full transition-colors relative group"
                                                title="Copy Link"
                                            >
                                                <BsCopy className={copied ? "text-green-400 dark:text-green-600" : "text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-gray-900"} />
                                                {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">Copied!</span>}
                                            </button>
                                            <div className="h-4 w-px bg-white/10 dark:bg-gray-300" />
                                            <div className="flex gap-2">
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#1877f2]/20 hover:text-[#1877f2] rounded-full transition-colors text-gray-400 dark:text-gray-500"><RiFacebookFill /></a>
                                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#1da1f2]/20 hover:text-[#1da1f2] rounded-full transition-colors text-gray-400 dark:text-gray-500"><FaTwitter /></a>
                                                <a href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#25d366]/20 hover:text-[#25d366] rounded-full transition-colors text-gray-400 dark:text-gray-500"><RiWhatsappFill /></a>
                                                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#0a66c2]/20 hover:text-[#0a66c2] rounded-full transition-colors text-gray-400 dark:text-gray-500"><BiLogoLinkedin /></a>
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 dark:from-gray-900 dark:via-gray-700 dark:to-gray-500 font-sans tracking-tight">
                                        {blogData.blog.title}
                                    </h1>
                                </div>

                                {/* Content Body */}
                                <div className="prose prose-lg max-w-none 
                                    prose-invert dark:prose-gray
                                    prose-h1:text-white dark:prose-h1:text-gray-900
                                    prose-h2:text-white dark:prose-h2:text-gray-900
                                    prose-h3:text-gray-100 dark:prose-h3:text-gray-800
                                    prose-p:text-gray-300 dark:prose-p:text-gray-700 prose-p:leading-relaxed 
                                    prose-a:text-[#cbacf9] dark:prose-a:text-[#8750f7] prose-a:no-underline hover:prose-a:text-white dark:hover:prose-a:text-gray-900 hover:prose-a:underline
                                    prose-strong:text-white dark:prose-strong:text-gray-900
                                    prose-code:text-[#cbacf9] dark:prose-code:text-[#8750f7] prose-code:bg-white/5 dark:prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                                    prose-blockquote:border-l-4 prose-blockquote:border-[#cbacf9] dark:prose-blockquote:border-[#8750f7] prose-blockquote:bg-white/5 dark:prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                                    prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-[#cbacf9] dark:prose-li:marker:text-[#8750f7]
                                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/10 dark:prose-img:border-gray-200
                                    mb-6">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code: ({ node, inline, className, children, ...props }) => (
                                                <CodeBlock
                                                    node={node}
                                                    inline={inline}
                                                    className={className}
                                                    copiedCode={copiedCode}
                                                    setCopiedCode={setCopiedCode}
                                                    {...props}
                                                >
                                                    {children}
                                                </CodeBlock>
                                            )
                                        }}
                                    >
                                        {blogData.blog.description}
                                    </ReactMarkdown>
                                </div>

                                {/* Tags */}
                                <div className="bg-[#100d25] dark:bg-white p-6 rounded-xl border border-white/5 dark:border-gray-200 shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4 text-white dark:text-gray-900 flex items-center gap-2"><span className="w-1 h-6 bg-[#cbacf9] dark:bg-[#8750f7] rounded-full block"></span>Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {blogData.blog.tags?.map((tag) => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 dark:bg-gray-100 text-gray-300 dark:text-gray-700 text-sm rounded-lg border border-white/5 dark:border-gray-200 hover:bg-[#cbacf9]/10 dark:hover:bg-[#8750f7]/10 hover:text-[#cbacf9] dark:hover:text-[#8750f7] hover:border-[#cbacf9]/30 dark:hover:border-[#8750f7]/30 transition-all cursor-default">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Comments Area */}
                                <div className="space-y-8" ref={replyFormRef}>
                                    <div className="flex items-center justify-between border-b border-white/10 dark:border-gray-200 pb-4">
                                        <h2 className="text-2xl font-bold text-white dark:text-gray-900">Discussion</h2>
                                        <span className="bg-white/10 dark:bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-200 dark:text-gray-700">{blogData.comments.length} Comments</span>
                                    </div>

                                    <div className="space-y-8">
                                        {renderComments()}
                                    </div>

                                    <div className="bg-[#100d25] dark:bg-white p-8 rounded-2xl border border-white/5 dark:border-gray-200 shadow-xl dark:shadow-sm">
                                        <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                                            {newComment.parentName ? (
                                                <div className="flex items-center justify-between">
                                                    <span>Reply to <span className="text-[#cbacf9] dark:text-[#8750f7]">{newComment.parentName}</span></span>
                                                    <button onClick={handleRemoveReply} className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded hover:bg-red-500/20 transition-colors">Cancel</button>
                                                </div>
                                            ) : "Leave a Comment"}
                                        </h3>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Your email address will not be published. Required fields are marked *</p>

                                        <form className="space-y-4" onSubmit={handleCommentSubmit}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Name *"
                                                    required
                                                    className="w-full bg-[#0a0518] dark:bg-gray-50 border border-white/10 dark:border-gray-200 rounded-lg px-4 py-3 text-white dark:text-gray-900 focus:outline-none focus:border-[#cbacf9] dark:focus:border-[#8750f7] focus:ring-1 focus:ring-[#cbacf9] dark:focus:ring-[#8750f7] transition-all placeholder-gray-600 dark:placeholder-gray-400"
                                                    value={newComment.name}
                                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email *"
                                                    required
                                                    className="w-full bg-[#0a0518] dark:bg-gray-50 border border-white/10 dark:border-gray-200 rounded-lg px-4 py-3 text-white dark:text-gray-900 focus:outline-none focus:border-[#cbacf9] dark:focus:border-[#8750f7] focus:ring-1 focus:ring-[#cbacf9] dark:focus:ring-[#8750f7] transition-all placeholder-gray-600 dark:placeholder-gray-400"
                                                    value={newComment.email}
                                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                className="w-full bg-[#0a0518] dark:bg-gray-50 border border-white/10 dark:border-gray-200 rounded-lg px-4 py-3 text-white dark:text-gray-900 focus:outline-none focus:border-[#cbacf9] dark:focus:border-[#8750f7] focus:ring-1 focus:ring-[#cbacf9] dark:focus:ring-[#8750f7] transition-all placeholder-gray-600 dark:placeholder-gray-400"
                                                value={newComment.title}
                                                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                            />
                                            <textarea
                                                rows="5"
                                                placeholder="Your Comment *"
                                                required
                                                className="w-full bg-[#0a0518] dark:bg-gray-50 border border-white/10 dark:border-gray-200 rounded-lg px-4 py-3 text-white dark:text-gray-900 focus:outline-none focus:border-[#cbacf9] dark:focus:border-[#8750f7] focus:ring-1 focus:ring-[#cbacf9] dark:focus:ring-[#8750f7] transition-all placeholder-gray-600 dark:placeholder-gray-400 resize-none"
                                                value={newComment.contentpera}
                                                onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}
                                            />
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="submit"
                                                    className="px-8 py-3 bg-gradient-to-r from-[#2a1454] to-[#8750f7] hover:from-[#3a1d70] hover:to-[#9661ff] dark:from-[#8750f7] dark:to-[#6a3db5] dark:hover:from-[#9661ff] dark:hover:to-[#7c4bd4] text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/30"
                                                >
                                                    Post Comment
                                                </button>
                                                {messageOk && <span className="text-green-400 dark:text-green-600 font-medium animate-pulse">{messageOk}</span>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Column */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="sticky top-24 space-y-8">

                                    {/* Search Widget */}
                                    <div className="bg-[#100d25] dark:bg-white p-1 rounded-xl border border-white/5 dark:border-gray-200 overflow-hidden shadow-sm">
                                        <div className="relative">
                                            <input
                                                onClick={handleSearchOpen}
                                                type="text"
                                                placeholder="Search articles..."
                                                className="w-full bg-[#0a0518] dark:bg-gray-50 rounded-lg pl-4 pr-12 py-3 text-white dark:text-gray-900 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cbacf9] dark:focus:ring-[#8750f7]"
                                                readOnly
                                            />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-900">
                                                <FiSearch className="text-xl" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Categories Widget */}
                                    <div className="bg-[#100d25] dark:bg-white rounded-2xl border border-white/5 dark:border-gray-200 overflow-hidden shadow-lg dark:shadow-sm">
                                        <div className="p-6 border-b border-white/5 dark:border-gray-200 bg-white/[0.02] dark:bg-gray-50">
                                            <h2 className="text-lg font-bold text-white dark:text-gray-900">Categories</h2>
                                        </div>
                                        <ul className="divide-y divide-white/5 dark:divide-gray-100">
                                            {['Node js', 'Next js', 'React js', 'Express js', 'Full Stack', 'JavaScript', 'Python'].map((cat) => (
                                                <li key={cat}>
                                                    <Link
                                                        href={`/blogs/category/${cat}`}
                                                        className="flex items-center justify-between px-6 py-4 hover:bg-white/5 dark:hover:bg-gray-50 transition-colors group"
                                                    >
                                                        <span className="text-gray-300 dark:text-gray-600 group-hover:text-white dark:group-hover:text-gray-900 transition-colors">{cat}</span>
                                                        <span className="bg-white/5 dark:bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full group-hover:bg-[#cbacf9]/20 dark:group-hover:bg-[#8750f7]/10 group-hover:text-[#cbacf9] dark:group-hover:text-[#8750f7] transition-colors">{alldata.filter(ab => ab.blogcategory[0] === cat).length}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Recent Posts Widget */}
                                    <div className="bg-[#100d25] dark:bg-white rounded-2xl border border-white/5 dark:border-gray-200 overflow-hidden shadow-lg dark:shadow-sm">
                                        <div className="p-6 border-b border-white/5 dark:border-gray-200 bg-white/[0.02] dark:bg-gray-50">
                                            <h2 className="text-lg font-bold text-white dark:text-gray-900">Recent Posts</h2>
                                        </div>
                                        <div className="p-2">
                                            {alldata.slice(0, 3).map((blog) => (
                                                <Link
                                                    key={blog._id}
                                                    href={`/blogs/${blog.slug}`}
                                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 dark:hover:bg-gray-50 transition-all group mb-2"
                                                >
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 dark:border-gray-200">
                                                        <img
                                                            src={blog.images[0] || "/img/noimage.png"}
                                                            alt={blog.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-200 dark:text-gray-900 group-hover:text-[#cbacf9] dark:group-hover:text-[#8750f7] transition-colors line-clamp-2 leading-snug">
                                                            {blog.title}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {blog.tags.slice(0, 2).map(tag => (
                                                                <span key={tag} className="text-[10px] text-gray-500 dark:text-gray-400 bg-white/5 dark:bg-gray-100 px-1.5 py-0.5 rounded border border-white/5 dark:border-gray-200">#{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {searchInput && <Blogsearch cls={handleSearchClose} />}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPage;
