import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { motion } from "framer-motion";
import { CoolMode } from "@/components/magicui/cool-mode";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position

    useEffect(() => {
        // Check dark mode preference on initial load
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Apply dark mode styles when dark mode state changes
        if (darkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem("darkMode", "false");
        }
    }, [darkMode]);

    useEffect(() => {
        // Handle scroll event to hide/show navbar
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // Scroll Down
                setVisible(false);
            } else {
                // Scroll Up
                setVisible(true);
            }
            setLastScrollY(window.scrollY); // Update last scroll position
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState("/");

    const handleLinkClick = (link) => {
        setClicked(false);
    };

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const [mobile, setMobile] = useState(false);
    const handleMobileOpen = () => {
        setMobile(!mobile);
    };

    const handleMobileClose = () => {
        setMobile(false);
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-[1000] border-b border-white/5 dark:border-black/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl transition-all duration-300 border-b-1 border-b-indigo-600"
        >
            <nav className="container_css max-w-7xl mx-auto flex items-center justify-between py-0 px-6">
                <div className="logo flex items-center">
                    <Link href="/">
                        <img src={`/img/${darkMode ? 'logo' : 'logo'}.svg`} />
                    </Link>
                    {/* <h2>Nazeem Khan</h2> */}
                </div>

                <div className="navlist flex items-center gap-6">
                    <ul className="hidden lg:flex items-center gap-6">
                        {['Home', 'Blogs', 'Education', 'Services', 'Projects', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            return (
                                <li key={item}>
                                    <Link
                                        href={path}
                                        onClick={() => handleLinkClick(path)}
                                        className={`text-sm font-medium transition-all hover:text-indigo-500 ${activeLink === path ? 'text-indigo-500' : 'text-slate-300 dark:text-gray-600'}`}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-4">
                        <div className="darkmodetoggle w-10 h-10 rounded-full bg-white/5 dark:bg-black/5 flex items-center justify-center cursor-pointer hover:bg-white/10 dark:hover:bg-black/10 transition-all text-slate-400 dark:text-gray-600" onClick={toggleDarkMode} >
                            {darkMode ? <IoMoonSharp size={18} title="Switch to dark mode" /> : <LuSun size={20} title="Switch to light mode" />}
                        </div>
                        <Link href='/contact' className="hidden md:block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                            Hire Me!
                        </Link>
                        <div className="mobiletogglesvg lg:hidden text-2xl text-slate-400 dark:text-gray-600 cursor-pointer" onClick={handleMobileOpen}>
                            <HiMiniBars3BottomRight />
                        </div>
                    </div>
                </div>

                {/* for small screens */}
                <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
                    <span onClick={handleMobileClose} className={mobile ? 'active ' : ''}></span>
                    <div className="mobilelogo">
                        <img src="/img/logo.svg" alt="logo" />
                        <h2>Nazeem</h2>
                    </div>
                    <ul className="flex_css gap-1_css flex-col_css flex-left_css mt-3_css " onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/education' onClick={() => handleLinkClick('/education')} className={activeLink === '/education' ? 'active' : ''}>Education</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                        </li>
                        {/* <li>
                            <Link href='/shop' onClick={()=>handleLinkClick('/shop')} className={activeLink ==='/shop' ? 'active' : '' }>Shops</Link>
                        </li> */}
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                    <p>Copyright &copy; {currentYear} | NazeemKhan</p>
                </div>

            </nav>
        </motion.header>
    );
}
