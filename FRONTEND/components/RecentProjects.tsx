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

                <div className="grid   grid-cols-1 md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-2 gap-8 py-10 px-4 sm:px-10 ">

                    {filteredProjects.map((item, i) => (
                        <>
                            <div key={item.id} className="relative  bg-gray-800 dark:bg-white-100 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-1 sm:p-4 md:p-2 lg:p-3 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                <Particles
                                    className='absolute  inset-0 size-full '
                                    color={'#9c38ff'}
                                    size={0.5}
                                    quantity={50}
                                    refresh
                                />
                                <Lens>
                                    <div className="relative overflow-hidden rounded-lg mb-1 sm:mb-4 h-[250px] sm:h-[300px]">
                                        {/* <div className='absolute z-10 bg-black-100/50 bottom-0 w-full text-wrap flex justify-center align-center text-xl p-2 backdrop-blur-[20px] overflow-hidden'><h2 className='text-white'>{formatText(item.title, 40)}</h2></div> */}
                                        <img src={(item.images && item.images[0]) || '/img/noimage.png'} alt="cover" className="w-full h-full object-cover rounded-lg absolute p-1  overflow-hidden" />
                                    </div>
                                </Lens>
                                <h1 className="font-normal sm:font-bold text-lg sm:text-xl line-clamp-1 mb-2 text-white px-2  dark:text-gray-800">
                                    {formatText(item.title, 40)}
                                </h1>
                                <p className=" text-slate-300 dark:text-slate-700 mb-4 text-[0.9em] sm:text-[1em] line-clamp-2 px-2 ">
                                    {formatText(item.description, 100)}
                                </p>
                                
                                {/* tech stack boxes */}
                                <hr className='w-full dark:border-black-100/10 border-white-100/20 mb-2' />
                                <span className='px-2 pb-4 text-[0.9em] sm:text-[1em] text-white dark:text-black-100 '>Technologies Used ⤵</span> 
                                <div className="flex flex-wrap gap-2 px-2 pb-4 py-2 ">
                                    {item.tags.map((tag, index) => (

                                        <div
                                            key={`${index}-${i}`}
                                            className="px-2 py-[0.2rem]  rounded-lg text-white text-sm  shadow-md"
                                            style={{
                                                backgroundColor: generateRandomDarkColor(),
                                            }}
                                        >
                                            {tag}
                                        </div>

                                    ))}
                                </div>
                                <hr className='w-full dark:border-black-100/10 border-white-100/20 mb-2' />

                                <div className="flex items-center justify-between mt-3 p-2">
                                    <Link href={`/projects/${item.slug}`} className="hover:text-white-100 text-[#8d29ff] border border-[#8d29ff]/30 px-3 py-1 rounded-full dark:hover:text-slate-700 font-semibold text-sm sm:text-[1rem] flex items-center justify-center " title='Project details page'>
                                        Details <ChevronRight />
                                    </Link>
                                    <div className='z-100   text-white-100 '>
                                        <Link href={`${item.livepreview}`} target='_blank'>
                                            <div className="flex items-center text-purple-600 dark:text-white bg-transparent dark:bg-slate-800/30 px-4 sm border border-white/30 py-2 rounded-full backdrop-blur-lg ">
                                                <p className="text-sm sm:text-[1rem] ">Live-Preview</p>
                                                <FaLocationArrow className="ml-2" />
                                            </div>
                                        </Link>
                                    </div>
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
