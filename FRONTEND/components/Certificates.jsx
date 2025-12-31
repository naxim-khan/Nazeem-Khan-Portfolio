import React, { useState, useRef } from 'react';
import Link from 'next/link';
import useFetchData from '@/hooks/useFetchData';
import { FaGraduationCap, FaCertificate, FaTrophy, FaScroll, FaEye } from 'react-icons/fa6';
import Spinner from "@/components/Spinner";
import { MagicCard } from "@/components/magicui/magic-card";

const Certificates = () => {
    const certificatesRef = useRef(null);
    const { alldata, loading } = useFetchData('/api/education');
    const publisheddata = alldata.filter(ab => ab.status === 'publish');

    const categories = [
        { icon: <FaGraduationCap />, title: 'Degrees', categoryKey: 'Degree' },
        { icon: <FaCertificate />, title: 'Certificates', categoryKey: 'Certificate' },
        { icon: <FaScroll />, title: 'Diplomas', categoryKey: 'Diploma' },
        { icon: <FaTrophy />, title: 'Achievements', categoryKey: 'Awards/Achievements' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryClick = (categoryKey) => {
        setSelectedCategory(categoryKey === selectedCategory ? null : categoryKey);
        if (certificatesRef.current) {
            certificatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const filteredData = searchQuery.trim() === ''
        ? (selectedCategory ? publisheddata.filter(cert => cert.Category[0] === selectedCategory) : publisheddata)
        : (selectedCategory
            ? publisheddata.filter(cert => cert.Category[0] === selectedCategory && cert.title.toLowerCase().includes(searchQuery.toLowerCase()))
            : publisheddata.filter(cert => cert.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    return (
        <div className="w-full mt-4">
            <div className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl m-auto">
                {/* Professional Category Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-20" data-aos="fade-up">
                    {categories.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(item.categoryKey)}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl border text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 backdrop-blur-md group
                                ${selectedCategory === item.categoryKey
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                                    : 'bg-white/5 dark:bg-black/5 border-white/10 dark:border-black/5 text-slate-400 dark:text-slate-600 hover:border-indigo-500/50 hover:text-indigo-400'
                                }`}
                        >
                            <span className={`text-lg transition-transform duration-500 group-hover:scale-110 ${selectedCategory === item.categoryKey ? 'text-white' : 'text-indigo-500'}`}>{item.icon}</span>
                            {item.title}
                        </button>
                    ))}
                </div>

                {/* Certificates Grid */}
                <div
                    ref={certificatesRef}
                    id="certificates"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 w-full"
                >
                    {loading ? (
                        <div className="col-span-full h-[400px] flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm" data-aos="fade-up">
                            <h3 className="text-xl font-semibold text-slate-300 mb-1">No matches found</h3>
                            <p className="text-sm text-slate-500">{selectedCategory ? `No items in ${selectedCategory} yet` : 'Try a different search'}</p>
                        </div>
                    ) : (
                        filteredData.map((certificate, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                                <MagicCard
                                    className="cursor-default flex flex-col h-full border-white/5 dark:border-black/5 bg-[#0f0f1a]/40 dark:bg-white backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-500 rounded-2xl overflow-hidden group shadow-lg"
                                    gradientColor={typeof window !== 'undefined' && document.body.classList.contains('dark') ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)"}
                                >
                                    <div className="w-full relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={certificate.images[0] || '/img/no-image.png'}
                                            alt={certificate.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3 z-20">
                                            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-indigo-400 tracking-wider">
                                                {certificate.createdAt ? new Date(certificate.createdAt).getFullYear() : '2025'}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] dark:from-white/10 via-transparent to-transparent opacity-60"></div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{certificate.Category[0]}</span>
                                            </div>
                                            <h3 className="text-base font-bold text-white dark:text-gray-900 line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors duration-300 min-h-[3rem]">
                                                {certificate.title}
                                            </h3>
                                            <p className="text-xs text-indigo-400/80 dark:text-indigo-600 font-medium italic uppercase tracking-wider line-clamp-1">
                                                {certificate.Institute}
                                            </p>
                                        </div>

                                        <div className="mt-8">
                                            <Link
                                                href={certificate.slug ? `/Education/${certificate.slug}` : '#'}
                                                className={`group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] transition-all duration-300 uppercase
                                                    ${certificate.slug
                                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_5px_15px_rgba(79,70,229,0.3)]'
                                                        : 'bg-white/5 dark:bg-black/5 text-slate-600 border border-white/5 dark:border-black/5 cursor-not-allowed'}`}
                                            >
                                                <FaEye className="group-hover:scale-110 transition-transform text-sm" />
                                                <span>VIEW CREDENTIALS</span>
                                            </Link>
                                        </div>
                                    </div>
                                </MagicCard>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Certificates;
