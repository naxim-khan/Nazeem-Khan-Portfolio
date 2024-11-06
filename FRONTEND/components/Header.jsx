import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";

export default function Header() {
    // Dark Mode Toggle
    const [darkMode, setDarkMode] = useState();
    useEffect(()=>{
        // check local storage for dak mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    },[])

    useEffect(()=>{
        // apply dark mode styles when darkmode state changes
        if(darkMode){
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        }else{
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    },[darkMode])

    // toggle darkmode function
    const toggleDarkMode=()=>{
        setDarkMode(!darkMode);
    }

    // navlist active
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link)=>{
        // setActiveLink(link);
        setClicked(false);
        setMobile(false); // Close mobile menu after click
    }

    useEffect(()=>{
        // update active link state when the page is reload
        setActiveLink(router.pathname);
    },[router.pathname])

    // mobile navbar
    const [mobile, setMobile] = useState(false);

    const handleMobileOpen = () =>{
        setMobile(!mobile);
    }

    // close 
    const handleMobileClose = (()=>{
        setMobile(false);
    })
    return <>
        <header>
            <nav className="container_css m-auto max-w-[1400px] flex flex-sb justify-between">
                <div className="logo flex ">
                    <Link href="/">
                       <img src={`/img/${darkMode ? 'logo':'logo'}.svg`} />
                    </Link>
                    {/* <h2>Nazeem Khan</h2> */}
                </div>

                {/* for large screens */}
                <div className="navlist flex gap-2">
                    <ul className="flex gap-2">
                    <li>
                            <Link href='/' onClick={()=>handleLinkClick('/')} className={activeLink ==='/' ? 'active' : '' }>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={()=>handleLinkClick('/blogs')} className={activeLink ==='/blogs' ? 'active' : '' }>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={()=>handleLinkClick('/gallery')} className={activeLink ==='/gallery' ? 'active' : '' }>Gallery</Link>
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

                    <div className="darkmodetoggle" onClick={toggleDarkMode}>
                        {darkMode ? <IoMoonSharp /> : <LuSun/>}
                    </div>
                    <button><Link href='/'>Hire Me!</Link></button>
                    <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight />
                    </div>
                </div>

                {/* for small screens */}
                <div className={mobile ? 'mobilenavlist active': 'mobilenavlist'}>
                    <span onClick={handleMobileClose} className={mobile ? 'active':''}></span>
                    <div className="mobilelogo">
                        <img src="/img/logo.svg" alt="logo" />
                        <h2>Nazeem</h2>
                    </div>
                    <ul className="flex gap-1 flex-col flex-left mt-3" onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={()=>handleLinkClick('/')} className={activeLink ==='/' ? 'active' : '' }>Home</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={()=>handleLinkClick('/blogs')} className={activeLink ==='/blogs' ? 'active' : '' }>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={()=>handleLinkClick('/gallery')} className={activeLink ==='/gallery' ? 'active' : '' }>Gallery</Link>
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
        </header>

    </>
}