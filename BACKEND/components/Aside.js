import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IoHome } from "react-icons/io5";
import { IoCodeWorkingOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { RiShoppingCart2Line } from 'react-icons/ri';
import { RiGalleryLine } from "react-icons/ri";
import { RiContactsBook2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import LoginLayout from "./LoginLayout";
import { signOut, useSession } from "next-auth/react";

export default function Aside({ asideOpen, handleAsideOpen }) {
        const router = useRouter();
        const [clicked, setClicked] = useState(false);
        const [activeLink, setActiveLink] = useState('/');

        const handleClick = () => {
                setClicked(!clicked);
        }

        const handleLinkClick = (link) => {
                setActiveLink(preActive => (preActive === link ? null : link));
                setClicked(false);
        }

        useEffect(() => {
                // update active link state when the page is reloaded
                setActiveLink(router.pathname);
        }, [router.pathname])

        const {data: session } = useSession()
        
        if (session){
                return <>
                <LoginLayout>
                        <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
                                <ul>
                                        {/* DashBoard */}
                                        <Link href="/">
                                                <li className="navactive">
                                                        <IoHome />
                                                        <span>Dashboard</span>
                                                </li>
                                        </Link>

                                        {/* Blogs */}
                                        <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/blogs')}>
                                                <div className="flex gap-1">
                                                        <BsPostcard />
                                                        <span>Blogs</span>
                                                </div>
                                                {activeLink === '/blogs' && (
                                                        <ul>
                                                                <Link href='/blogs'><li>All Blogs</li></Link>
                                                                <Link href='/blogs/draft'><li>Draft Blogs</li></Link>
                                                                <Link href='/blogs/addblog'><li>Add Blog</li></Link>
                                                        </ul>
                                                )}
                                        </li>

                                        {/* Projects */}
                                        <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/projects')}>
                                                <div className="flex gap-1">
                                                        <IoCodeWorkingOutline />
                                                        <span>Projects</span>
                                                </div>
                                                {activeLink === '/projects' && (
                                                        <ul>
                                                                <Link href='/projects'><li>All Projects</li></Link>
                                                                <Link href='/projects/draftprojects'><li>Draft Projects</li></Link>
                                                                <Link href='/projects/addproject'><li>Add Projects</li></Link>
                                                        </ul>
                                                )}
                                        </li>

                                        {/* Products */}
                                        <li className={activeLink === '/shops' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/shops')}>
                                                <div className="flex gap-1">
                                                        <RiShoppingCart2Line />
                                                        <span>Shops</span>
                                                </div>
                                                {activeLink === '/shops' && (
                                                        <ul>
                                                                <Link href='/shops'><li>All Products</li></Link>
                                                                <Link href='/shops/draftshop'><li>Draft Products</li></Link>
                                                                <Link href='/shops/addproduct'><li>Add Products</li></Link>
                                                        </ul>
                                                )}
                                        </li>

                                        {/* Gallery */}
                                        <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/gallery')}>
                                                <div className="flex gap-1">
                                                        <RiGalleryLine />
                                                        <span>Gallery</span>
                                                </div>
                                                {activeLink === '/gallery' && (
                                                        <ul>
                                                                <Link href='/gallery'><li>All Photos</li></Link>
                                                                <Link href='/gallery/addphoto'><li>Add Photos</li></Link>
                                                        </ul>
                                                )}
                                        </li>

                                        {/* Contacts */}
                                        <Link href="/contacts">
                                                <li className={activeLink === '/contacts' ? 'navactive' : ''} onClick={() => handleClick('/contacts')}>
                                                        <RiContactsBook2Line />
                                                        <span>Contacts</span>
                                                </li>
                                        </Link>

                                        {/* Setting */}
                                        <Link href="/setting">
                                                <li className={activeLink === '/setting' ? 'navactive' : ''} onClick={() => handleClick('/setting')}>
                                                        <IoSettingsOutline />
                                                        <span>Settings</span>
                                                </li>
                                        </Link>
                                </ul>

                                {/* LogOut */}
                                <button onClick={() => signOut()} className="logoutbtn ">LogOut</button>
                        </aside>
                </LoginLayout>
        </>
        }
}