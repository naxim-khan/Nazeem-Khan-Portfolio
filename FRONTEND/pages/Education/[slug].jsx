import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import Spinner from "@/components/Spinner";
import 'swiper/css';
import 'swiper/css/free-mode';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export default function ShopSlug() {
    const router = useRouter();
    const { slug } = router.query;

    const { alldata, loading } = useFetchData(`/api/education?slug=${slug}`);
    const [mainImage, setMainImage] = useState('');

    // useEffect to set mainImage once alldata is available
    useEffect(() => {
        console.log('Fetched DATA: ', alldata)
        if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
            setMainImage(alldata[0].images[0]);
        }
    }, [alldata]);

    const handleImageClick = (imageSrc) => {
        setMainImage(imageSrc);
    };

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

    return (
        <>
            <Head>
                <title>Certificates Page</title>
            </Head>
            <div className="shopslugpage">
                <div className="shopcont">
                    <div className="container_css">
                        <div className="shopcontbox">
                            <div className="leftshopimgbox">
                                <div className="leftshopmainimg">
                                    {loading ? <Spinner /> : <img src={mainImage || '/img/noimage.png'} alt="Main Product" />}
                                </div>
                                <div className="leftsimgboxlist">
                                    <Swiper
                                        slidesPerView="auto"
                                        freeMode
                                        spaceBetween={15}
                                        grabCursor
                                        modules={[FreeMode]}
                                        className="mySwiper"
                                    >
                                        {alldata && alldata[0]?.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    onClick={() => handleImageClick(image)}
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="swiperThumbnail"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="rightshopcontbox">
                                <h1>{alldata && alldata[0]?.title}</h1>
                                <h3 className="rightshopprice">Institute : <span>{alldata && alldata[0]?.Institute}</span></h3>
                                <a className={`shopnowbtn ${!alldata?.[0]?.sourceLink ? 'disabled-btn' : ''}`} href={alldata && alldata[0]?.sourceLink} target="_blank">Verify Certificate</a>
                                <div className="blogcontent">
                                    <h2 className="bctitle">Description:</h2>
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
            </div>
        </>
    );
}
