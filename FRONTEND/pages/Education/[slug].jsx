import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Spinner from "@/components/Spinner";
import 'swiper/css';
import 'swiper/css/free-mode';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import SEO from "@/components/SEO";

export default function EducationSlug() {
    const router = useRouter();
    const { slug } = router.query;

    const { alldata, loading } = useFetchData(`/api/education?slug=${slug}`);
    const [mainImage, setMainImage] = useState('');
    const certificate = alldata?.[0];

    useEffect(() => {
        if (certificate?.images?.[0]) {
            setMainImage(certificate.images[0]);
        }
    }, [certificate]);

    const [copiedCode, setCopiedCode] = useState(false);

    const Code = ({ node, inline, className, children, ...props }) => {
        const codeString = String(children).replace(/\n$/, '');
        const handleCodeCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 3000);
        };

        if (inline) {
            return <code className="bg-white/10 px-1 rounded text-indigo-300">{children}</code>;
        } else {
            return (
                <div className="relative my-4 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f1a] border-b border-white/5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Code Snippet</span>
                        <button
                            onClick={handleCodeCopy}
                            className="text-[10px] font-bold text-indigo-400 hover:text-white transition-colors"
                        >
                            {copiedCode ? 'COPIED!' : 'COPY CODE'}
                        </button>
                    </div>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language="javascript"
                        PreTag="div"
                        className="!bg-[#0a0a14] !p-4 !m-0 text-sm"
                        {...props}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            );
        }
    };

    if (loading) return <div className="min-h-screen bg-[#050510] flex items-center justify-center"><Spinner /></div>;

    return (
        <>
            <SEO
                title={`${certificate?.title || 'Certificate'} | Education | Nazeem Khan`}
                description={`View details for ${certificate?.title} from ${certificate?.Institute}.`}
            />

            <div className="min-h-screen bg-[#050510] text-white pt-24 pb-20 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/education"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-400 mb-12 transition-colors uppercase tracking-widest group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        BACK TO EDUCATION
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Image Gallery */}
                        <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
                            <div className="relative aspect-[16/10] bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                <img
                                    src={mainImage || '/img/no-image.png'}
                                    className="w-full h-full object-contain p-2 transition-transform duration-700 hover:scale-105"
                                    alt={certificate?.title}
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="px-2">
                                <Swiper
                                    slidesPerView="auto"
                                    freeMode
                                    spaceBetween={16}
                                    modules={[FreeMode]}
                                    className="pb-4"
                                >
                                    {certificate?.images?.map((image, index) => (
                                        <SwiperSlide key={index} className="!w-24 sm:!w-32">
                                            <div
                                                onClick={() => setMainImage(image)}
                                                className={`aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${mainImage === image ? 'border-indigo-500 scale-95 shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20'}`}
                                            >
                                                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-5 space-y-10" data-aos="fade-left">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 tracking-widest uppercase text-center">
                                        {certificate?.Category?.[0]}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        {certificate?.createdAt ? new Date(certificate.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                    {certificate?.title}
                                </h1>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ISSUING INSTITUTION</span>
                                    <span className="text-xl font-semibold text-indigo-300 italic">{certificate?.Institute}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={certificate?.sourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 
                                        ${certificate?.sourceLink
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25 active:scale-95'
                                            : 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'}`}
                                >
                                    <FaExternalLinkAlt />
                                    <span>VERIFY CREDENTIALS</span>
                                </a>
                            </div>

                            <div className="pt-10 border-t border-white/5">
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Program Overview</h2>
                                <div className="prose prose-invert prose-sm max-w-none text-slate-400 leading-relaxed">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{ code: Code }}
                                    >
                                        {certificate?.description}
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
