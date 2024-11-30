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
        >
            <nav className="container_css m-auto_css max-w-[1400px] flex_css flex-sb_css justify-between_css">
                <div className="logo flex_css ">
                    <Link href="/">
                       <img src={`/img/${darkMode ? 'logo':'logo'}.svg`} />
                    </Link>
                    {/* <h2>Nazeem Khan</h2> */}
                </div>

                {/* for large screens */}
                <div className="navlist flex_css gap-2_css">
                    <ul className="flex_css gap-2_css">
                    <li>
                            <Link href='/' onClick={()=>handleLinkClick('/')} className={activeLink ==='/' ? 'active' : '' }>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={()=>handleLinkClick('/blogs')} className={activeLink ==='/blogs' ? 'active' : '' }>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/Education' onClick={()=>handleLinkClick('/Education')} className={activeLink ==='/Education' ? 'active' : '' }>Education</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={()=>handleLinkClick('/services')} className={activeLink ==='/services' ? 'active' : '' }>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={()=>handleLinkClick('/projects')} className={activeLink ==='/projects' ? 'active' : '' }>Projects</Link>
                        </li>
                        <li>
                            <Link href='/shop' onClick={()=>handleLinkClick('/shop')} className={activeLink ==='/shop' ? 'active' : '' }>Shops</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={()=>handleLinkClick('/contact')} className={activeLink ==='/contact' ? 'active' : '' }>Contact</Link>
                        </li>
                    </ul>

                    <div className="darkmodetoggle" onClick={toggleDarkMode} >
                        {darkMode ? <IoMoonSharp title="Switch to dark mode"/> : <LuSun title="Switch to light mode"/>}
                    </div>
                    <button><Link href='/'>Hire Me!</Link></button>
                    <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight />
                    </div>
                </div>

                {/* for small screens */}
                <div className={mobile ? 'mobilenavlist active': 'mobilenavlist'}>
                    <span onClick={handleMobileClose} className={mobile ? 'active ':''}></span>
                    <div className="mobilelogo">
                        <img src="/img/logo.svg" alt="logo" />
                        <h2>Nazeem</h2>
                    </div>
                    <ul className="flex_css gap-1_css flex-col_css flex-left_css mt-3_css " onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={()=>handleLinkClick('/')} className={activeLink ==='/' ? 'active' : '' }>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={()=>handleLinkClick('/blogs')} className={activeLink ==='/blogs' ? 'active' : '' }>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/Education' onClick={()=>handleLinkClick('/Education')} className={activeLink ==='/Education' ? 'active' : '' }>Education</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={()=>handleLinkClick('/services')} className={activeLink ==='/services' ? 'active' : '' }>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={()=>handleLinkClick('/projects')} className={activeLink ==='/projects' ? 'active' : '' }>Projects</Link>
                        </li>
                        <li>
                            <Link href='/shop' onClick={()=>handleLinkClick('/shop')} className={activeLink ==='/shop' ? 'active' : '' }>Shops</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={()=>handleLinkClick('/contact')} className={activeLink ==='/contact' ? 'active' : '' }>Contact</Link>
                        </li>
                    </ul>
                    <p>Copyright &copy; {currentYear} | NazeemKhan</p>
                </div>

            </nav>
        </motion.header>
    );
}
