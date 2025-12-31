"use client";

import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from "react-icons/fa6";
import { FaGlobe } from 'react-icons/fa6';
import Link from 'next/link';
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import ReactMarkdown from 'react-markdown';
import { ChevronRight, Icon, Pin, Tag } from "lucide-react";
// import { Button } from "./ui/Button";
import { Button } from "./ui/moving-border";
import { MagicCard } from './magicui/magic-card';
import Particles from './magicui/particles';
// import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Lens } from "./ui/lens";
import { motion } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    images: string[];
    description: string;
    status: string;
    slug: string;
    livepreview: string;
    projectcategory: string[];
    tags: string[];
}

const RecentProjects: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [alldata, setAlldata] = useState<Project[]>([]);
    const [selectCategory, setSelectedCategory] = useState<string>('All');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await fetch('/api/projects');
                const projectData: Project[] = await projectResponse.json();
                setAlldata(projectData);
            } catch (error) {
                console.error('Error Fetching Data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter projects based on selected category
        if (selectCategory === 'All') {
            setFilteredProjects(alldata.filter((pro) => pro.status === 'publish'));
        } else {
            setFilteredProjects(
                alldata.filter(
                    (pro) => pro.status === 'publish' && pro.projectcategory.includes(selectCategory)
                )
            );
        }
    }, [selectCategory, alldata]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Utility function to remove Markdown symbols and limit text length
    const formatText = (text: string | undefined, maxLength: number): string => {
        if (!text) return ''; // Return an empty string if text is undefined
        const plainText = text.replace(/[#_*~`>+\-!]/g, ''); // Remove Markdown symbols
        return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
    };

    // Function to pick a random color from predefinedColors
    const predefinedColors = [
        "#1E90FF", // Dodger blue
        "#00BFFF", // Deep sky blue
        "#4682B4", // Steel blue
        "#20B2AA", // Light sea green
        "#2E8B57", // Sea green
        "#3CB371", // Medium sea green
        "#32CD32", // Lime green
        "#228B22", // Forest green
        "#5F9EA0", // Cadet blue
        "#6A5ACD", // Slate blue
        "#7B68EE", // Medium slate blue
        "#4B0082", // Indigo
        "#1C1C1C", // Very dark gray
        "#006400", // Dark green
    ];


    const generateRandomDarkColor = () => {
        const randomIndex = Math.floor(Math.random() * predefinedColors.length);
        return predefinedColors[randomIndex];
    };


    return (
        <section className='bg-black-100 dark:bg-[#cecdcd] '>
            <div className="container_css " id=''>

                <div className="project_titles text-center">
                    <h2 className="text-3xl font-semibold mb-4 py-4">My Recent Works</h2>
                    <p className="text-gray-600 dark:text-gray-400">Explore a selection of my latest projects, showcasing creativity, innovation, and technical expertise across various domains.</p>
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

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 py-10 px-4 sm:px-10 max-w-7xl mx-auto">

                    {filteredProjects.slice(0, 4).map((item, i) => (
                        <>
                            <div key={item.id} className="relative bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 dark:border-black/5 flex flex-col h-full group">
                                {/* <Particles
                                    className='absolute  inset-0 size-full '
                                    color={'#9c38ff'}
                                    size={0.5}
                                    quantity={50}
                                    refresh
                                /> */}
                                <Lens>
                                    <div className="relative overflow-hidden rounded-lg mb-1 sm:mb-4 h-[250px] sm:h-[300px]">
                                        {/* <div className='absolute z-10 bg-black-100/50 bottom-0 w-full text-wrap flex justify-center align-center text-xl p-2 backdrop-blur-[20px] overflow-hidden'><h2 className='text-white'>{formatText(item.title, 40)}</h2></div> */}
                                        <img src={(item.images && item.images[0]) || '/img/noimage.png'} alt="cover" className="w-full h-full object-cover rounded-lg absolute p-1  overflow-hidden" />
                                    </div>
                                </Lens>
                                <h1 className="font-bold text-xl line-clamp-1 mb-2 text-white px-2 tracking-tight dark:text-gray-900 group-hover:text-indigo-400 transition-colors">
                                    {formatText(item.title, 40)}
                                </h1>
                                <p className="text-slate-400 dark:text-slate-600 mb-6 text-sm line-clamp-2 px-2 leading-relaxed">
                                    {formatText(item.description, 100)}
                                </p>

                                {/* tech stack boxes */}
                                <hr className='w-full dark:border-black-100/10 border-white-100/20 mb-2' />
                                <span className='px-2 text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 block'>Technologies Used</span>
                                <div className="flex flex-wrap gap-2 px-2 mb-6">
                                    {item.tags.map((tag, index) => (
                                        <div
                                            key={`${index}-${i}`}
                                            className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 dark:text-indigo-600 text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                                <hr className='w-full dark:border-black-100/10 border-white-100/20 mb-2' />

                                <div className="flex items-center justify-between mt-auto p-2">
                                    <Link href={`/projects/${item.slug}`} className="group/btn flex items-center gap-2 text-white dark:text-gray-900 font-bold text-sm bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-lg active:scale-95">
                                        View Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link href={`${item.livepreview}`} target='_blank' className="flex items-center gap-2 text-indigo-400 dark:text-indigo-600 font-black text-sm hover:underline underline-offset-8 decoration-indigo-500/30">
                                        Live Demo <FaLocationArrow className="w-3 h-3" />
                                    </Link>
                                </div>

                                <BorderBeam
                                    size={300}
                                    duration={12}
                                    delay={9}
                                    borderWidth={2}
                                    colorFrom={'#8750f7'}
                                    colorTo={'#2a1454'}
                                    className=' '
                                />

                            </div>
                        </>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default RecentProjects;
