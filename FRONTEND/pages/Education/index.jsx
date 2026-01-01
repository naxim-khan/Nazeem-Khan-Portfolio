import { useState } from "react";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import Marquee from '@/components/magicui/marquee'
import Particles from '@/components/magicui/particles'
import { ShineBorder } from "@/components/magicui/shine-border";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { BiCollection } from "react-icons/bi";
import Certificates from "@/components/Certificates";
import SEO from "@/components/SEO";

export default function EducationPage() {
    const { alldata, loading } = useFetchData('/api/education')
    const publisheddata = alldata.filter(ab => ab.status === 'publish');

    const handleScroll = () => {
        const certificatesSection = document.getElementById('certificates');
        if (certificatesSection) {
            certificatesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const filteredData = searchQuery.trim() === ''
        ? publisheddata
        : publisheddata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <>
            <SEO
                title="Education & Certifications | Nazeem Khan"
                description="Explore my academic journey and professional certifications as a Software Engineer. Graduated in Computer Science from the University of Peshawar, currently building production-grade apps at BXtrack Solutions."
                keywords="Computer Science Education, Web Development Certifications, MERN Stack Course, Nazeem Khan Education"
            />

            <section className="relative min-h-screen bg-[#050510] dark:bg-[#f3f4f6] text-white dark:text-gray-900 transition-colors duration-500 overflow-hidden">
                {/* Background Particles */}
                <Particles
                    className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
                    quantity={120}
                    staticity={30}
                    color={typeof window !== 'undefined' && document.body.classList.contains('dark') ? "#6366f1" : "#4f46e5"}
                    size={0.6}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col items-start space-y-8">
                            <div className="space-y-4">
                                <BoxReveal boxColor="#6366f1" duration={0.6}>
                                    <span className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase">
                                        Learning & Growth
                                    </span>
                                </BoxReveal>

                                <BoxReveal boxColor="#6366f1" duration={0.8}>
                                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white dark:text-gray-900">
                                        Academic<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">Journey.</span>
                                    </h1>
                                </BoxReveal>

                                <BoxReveal boxColor="#6366f1" duration={1}>
                                    <p className="max-w-xl text-lg text-slate-400 dark:text-gray-600 leading-relaxed">
                                        Graduated in <span className="text-white dark:text-indigo-600 font-medium">Computer Science</span> from the University of Peshawar, I am now thriving as a <span className="text-white dark:text-indigo-600 font-medium">Software Engineer</span> at <a href="https://bxtrack.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 font-bold hover:underline decoration-indigo-500/30 underline-offset-4">BXtrack Solutions</a>. I specialize in crafting high-performance, production-ready applications using the <span className="text-white dark:text-indigo-600 font-medium">MERN Stack</span> and <span className="text-white dark:text-indigo-600 font-medium">Next.js</span>, dedicated to delivering seamless user experiences through modern engineering practices.
                                    </p>
                                </BoxReveal>
                            </div>

                            <BoxReveal boxColor="#6366f1" duration={1.2}>
                                <button
                                    onClick={handleScroll}
                                    className="group relative flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <span className="relative z-10 text-white flex items-center gap-2">
                                        Explore Certifications
                                        <BiCollection className="text-lg group-hover:translate-x-1 transition-transform duration-500" />
                                    </span>
                                </button>
                            </BoxReveal>
                        </div>

                        <div className="relative" data-aos="zoom-in" data-aos-duration="1000">
                            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full animate-pulse"></div>
                            <AnimatedTestimonials />
                        </div>
                    </div>

                    {/* Marquee Section */}
                    <div className="mt-12 relative group" data-aos="fade-up">
                        <div className="flex flex-col items-center mb-6 text-center">
                            <h2 className="text-[10px] font-bold tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase mb-2">Honors & Accreditations</h2>
                            <div className="w-8 h-0.5 bg-indigo-500/50"></div>
                        </div>

                        <div className="relative flex items-center justify-center flex-col w-full overflow-hidden py-4">
                            <Marquee pauseOnHover className="[--duration:45s]">
                                {loading ? (
                                    Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="w-[280px] h-[160px] rounded-xl bg-white/5 dark:bg-black/5 animate-pulse mx-4" />
                                    ))
                                ) : filteredData.map((data) => (
                                    <ShineBorder
                                        key={data.slug}
                                        className="relative flex w-[280px] sm:w-[380px] mx-4 flex-col items-center justify-center overflow-hidden rounded-xl p-0 bg-transparent dark:border-none shadow-2xl border border-white/5 dark:border-black/5"
                                        color={["#6366f1", "#a855f7", "#6366f1"]}
                                        borderWidth={2}
                                        duration={10}
                                        borderRadius={12}
                                    >
                                        <Link href={`/education/${data.slug}`} className="w-full block">
                                            <img
                                                src={data.images[0]}
                                                className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
                                                alt={data.title}
                                            />
                                        </Link>
                                    </ShineBorder>
                                ))}
                            </Marquee>
                            {/* Gradients */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050510] dark:from-[#f3f4f6]"></div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050510] dark:from-[#f3f4f6]"></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-16">
                        <div className="flex flex-col items-center mb-10 text-center" data-aos="fade-up">
                            <h2 className="text-2xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">Detailed Credentials</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-600 max-w-xl">A comprehensive collection of my education, professional diplomas, and skill certifications.</p>
                        </div>
                        <Certificates />
                    </div>
                </div>
            </section>
        </>
    );
}