import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';



export default function projectslug() {
    const router = useRouter();

    const { slug } = router.query;

    const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`)

    const createdAt = alldata && alldata[0]?.createdAt ? new Date(alldata && alldata[0]?.createdAt) : null;

    // mark down styles
    const [copiedCode, setCopiedCode] = useState(false);

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

    // remove markdown chars
    const stripMarkdown = (text) => {
        if (typeof text !== 'string') return '';
        return text
            .replace(/(#+\s*)/g, '')                // Remove headers (e.g., ### or ##)
            .replace(/(```[\s\S]*?```)/g, '')       // Remove code blocks completely
            .replace(/`[^`]+`/g, '')                // Remove inline code snippets fully
            .replace(/\*\*(.+?)\*\*/g, '$1')        // Remove bold syntax
            .replace(/\*(.+?)\*/g, '$1')            // Remove italic syntax
            .replace(/!\[.*?\]\(.*?\)/g, '')        // Remove images
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')     // Remove links but keep the text
            .replace(/>\s*/g, '')                   // Remove blockquotes
            .replace(/[-*+]\s+/g, '')               // Remove list bullets
            .replace(/\n+/g, ' ')                   // Replace newlines with spaces
            .trim();                                // Trim any extra whitespace
    };

    // Format Date
    const formatDate = (date) => {
        // check if date if valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12 hour format
        }

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }


    return <>
        <Head>
            <title>{slug}</title>
        </Head>

        <div className="projectslug">
            <div className="projectslugimg">

                <div className="container_css">
                    <div className="proslugimg">
                        <img src={alldata && alldata[0]?.images[0] || '/img/noimage.png'} alt={alldata && alldata[0]?.title} />
                    </div>

                    <div className="projectsluginfo">
                        <div className="leftmainproinfo">
                            <h1>{alldata && alldata[0]?.projectcategory[0]}</h1>
                            <p>{stripMarkdown(alldata && alldata[0]?.description) || ''}</p>
                            <a href={alldata && alldata[0]?.livepreview} target="_blank">Live Preview</a>
                        </div>
                        <div className="rightmainproinfo">
                            <div>
                                <h3>Category</h3>
                                <h2>{alldata && alldata[0]?.projectcategory}</h2>
                            </div>
                            <div>
                                <h3>Client</h3>
                                <h2>{alldata && alldata[0]?.client}</h2>
                            </div>
                            <div>
                                <h3>Start Date</h3>
                                <h2>{formatDate(createdAt)}</h2>
                            </div>
                            <div>
                                <h3>Developer</h3>
                                <h2>Nazeem Khan</h2>
                            </div>
                        </div>
                    </div>

                    <div className="projectslugsliderimg">
                        <Swiper
                            slidesPerView={'auto'}
                            freeMode={true}
                            spaceBetween={30}
                            className='mySwiper'
                            grabCursor={true}
                            modules={[FreeMode]}
                        >
                            {alldata && alldata[0]?.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image || '/img/noimage.png'} alt="project" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </div>

            <div className="projectslugdescription">
                <div className="container_css">
                    <div className="psdescri">
                        <h2>Project Description</h2>
                        <div className="blogcontent">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code: Code
                                }}
                            >
                                {alldata && alldata[0]?.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}