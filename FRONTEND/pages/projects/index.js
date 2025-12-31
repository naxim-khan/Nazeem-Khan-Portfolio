import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import Link from "next/link";
import { GoArrowUpRight, GoProject } from "react-icons/go";
import { FaCode, FaLaptopCode, FaMobileAlt, FaShoppingBag, FaServer } from "react-icons/fa";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";

export default function projects() {
    const { alldata, loading } = useFetchData('/api/projects');

    const publishedData = alldata.filter(ab => ab.status === 'publish');

    const [selectCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        // Filter projects based on selected category
        if (selectCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
        } else {
            setFilteredProjects(
                alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0].includes(selectCategory))

            );
        }


    }, [selectCategory, alldata]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage bg-black-100 dark:bg-[#dedddc] min-h-screen pt-32 pb-20">
            <div className="container_css px-5">
                <div className="project_titles text-center mb-16 px-5">
                    <h2 className="text-sm font-bold tracking-[0.4em] text-indigo-500 uppercase mb-4 flex items-center justify-center gap-2">
                        <GoProject /> MY PORTFOLIO
                    </h2>
                    <h3 className="text-4xl lg:text-6xl font-bold text-white dark:text-gray-900 mb-6 tracking-tight">Recent Works & Projects</h3>
                    <p className="text-slate-400 dark:text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">A collection of my recent developments, ranging from high-performance MERN sites to complex full-stack applications.</p>
                </div>

                <div className="flex justify-center mb-20 px-5">
                    <Dock
                        distance={60}
                        magnification={60}
                        className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 backdrop-blur-xl p-2 rounded-full gap-2 h-fit overflow-x-auto max-w-full"
                    >
                        {[
                            { id: 'All', label: 'All', icon: <FaLaptopCode /> },
                            { id: 'website development', label: 'Websites', icon: <FaCode /> },
                            { id: 'app development', label: 'Apps', icon: <FaMobileAlt /> },
                            { id: 'E-commerce site', label: 'E-Commerce', icon: <FaShoppingBag /> },
                            { id: 'Node JS', label: 'Backend', icon: <FaServer /> }
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${selectCategory === cat.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                                    : 'text-slate-400 dark:text-gray-600 hover:bg-white/5 dark:hover:bg-black/5'
                                    }`}
                                onClick={() => handleCategoryChange(cat.id)}
                            >
                                <span className="text-lg">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </Dock>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 px-5 max-w-7xl mx-auto">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20"><Spinner /></div>
                    ) : (
                        filteredProjects.map((pro) => (
                            <Link href={`/projects/${pro.slug}`} key={pro._id} className="group relative block">
                                <div className="relative h-full bg-white/5 dark:bg-black/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 dark:border-black/5 overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 flex flex-col">
                                    <div className="relative h-64 w-full rounded-[1rem] overflow-hidden mb-6">
                                        <img
                                            src={pro.images?.[0] || '/img/noimage.png'}
                                            alt={pro.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                            <span className="text-white font-bold flex items-center gap-2">
                                                View Details <GoArrowUpRight />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {pro.projectcategory[0]}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                                            {pro.title}
                                        </h2>
                                        <p className="text-slate-400 dark:text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                            {pro.description || "A professional web development project built with modern technologies and a focus on scalability and user experience."}
                                        </p>
                                    </div>

                                    <BorderBeam size={250} duration={12} delay={9} />

                                    {/* Corner Glow */}
                                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>

            </div>
        </div>
    </>
}