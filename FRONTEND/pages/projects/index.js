import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { Dock, DockIcon } from "@/components/magicui/dock";

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
        <div className="projectpage">
            <div className="projects">
                <div className="container_css">
                    <div className="project_titles">
                        <h2>My Recent Works</h2>
                        <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
                    </div>
                    
                    <Dock distance={60} magnification={60} className="items-center justify-center px-3 gap-2 border-purple dark:shadow-md shadow-black grid grid-cols-1 w-[90%] sm:w-fit sm:grid-cols-2 md:grid-cols-3 lg:flex lg:space-x-4 h-fit">
                    <button
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectCategory === 'All'
                            ? 'border-slate-500 bg-purple-600 text-white dark:text-slate-600'
                            : 'border-transparent dark:bg-gray-300 bg-gray-700 text-white-100 dark:text-slate-600'
                            } hover:border-slate-500 hover:bg-transparent hover:text-slate-600`}
                        onClick={() => handleCategoryChange('All')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectCategory === 'website development'
                            ? 'border-slate-500 bg-purple-600 text-white dark:text-slate-600'
                            : 'border-transparent dark:bg-gray-300 bg-gray-700 text-white-100 dark:text-slate-600'
                            } hover:border-slate-500 hover:bg-transparent hover:text-slate-600`}
                        onClick={() => handleCategoryChange('website development')}
                    >
                        Websites
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectCategory === 'app development'
                            ? 'border-slate-500 bg-purple-600 text-white dark:text-slate-600'
                            : 'border-transparent dark:bg-gray-300 bg-gray-700 text-white-100 dark:text-slate-600'
                            } hover:border-slate-500 hover:bg-transparent hover:text-slate-600`}
                        onClick={() => handleCategoryChange('app development')}
                    >
                        Apps
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectCategory === 'E-commerce site'
                            ? 'border-slate-500 bg-purple-600 text-white dark:text-slate-600'
                            : 'border-transparent dark:bg-gray-300 bg-gray-700 text-white-100 dark:text-slate-600'
                            } hover:border-slate-500 hover:bg-transparent hover:text-slate-600`}
                        onClick={() => handleCategoryChange('E-commerce site')}
                    >
                        E-Commerce Sites
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${selectCategory === 'Node JS'
                            ? 'border-slate-500 bg-purple-600 text-white dark:text-slate-600'
                            : 'border-transparent dark:bg-gray-300 bg-gray-700 text-white-100 dark:text-slate-600'
                            } hover:border-slate-500 hover:bg-transparent hover:text-slate-600`}
                        onClick={() => handleCategoryChange('Node JS')}
                    >
                        Content
                    </button>
                </Dock>

                    <div className="projects_cards_2">
                        {loading ? (
                            <div className="flex_css flex-center_css wh_100_css"><Spinner /></div>
                        ) : (
                            filteredProjects.map((pro) => (
                                <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard_2">
                                    <div className="proimgbox">
                                        <img src={pro.images?.[0] || '/img/noimage.png'} alt={pro.title} />
                                    </div>
                                    <div className="procontentbox">
                                        <h2>{pro.title}</h2>
                                        <GoArrowUpRight />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    </>
}