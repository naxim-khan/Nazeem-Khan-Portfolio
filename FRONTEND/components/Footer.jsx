import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return <>
        <footer className="footer bg-black-100 dark:bg-[#fafafa] border-t border-white/5 dark:border-black/5 py-8">
            <div className="footersec flex flex-col items-center gap-8 max-w-7xl mx-auto px-6">
                <div className="logo flex flex-col items-center gap-2">
                    <img src="/img/logo.svg" alt="logo" className="w-12 h-12" />
                    <span className="text-xl font-bold text-white dark:text-gray-900 tracking-wider">NAZEEM KHAN</span>
                </div>

                <div className="flex flex-wrap justify-center gap-8 gap-y-4">
                    {['Services', 'Works', 'Resume', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Contact' ? '/contact' : '/services'}
                            className="text-sm font-medium text-slate-400 dark:text-gray-600 hover:text-indigo-500 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex gap-4">
                    {[
                        { icon: <FaTwitter />, link: "/" },
                        { icon: <FaLinkedinIn />, link: "/" },
                        { icon: <FaGithub />, link: "/" },
                        { icon: <FaFacebookF />, link: "/" },
                        { icon: <MdEmail />, link: "mailto:nazeemkhanpk@gmail.com" }
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 dark:border-black/5 flex items-center justify-center text-slate-400 dark:text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-md active:scale-90"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <div className="text-sm text-slate-500 dark:text-gray-400 text-center">
                    &copy; {new Date().getFullYear()} All Rights Reserved By
                    <span className="text-indigo-500 font-bold ml-1">Nazeem-Khan</span>
                </div>
            </div>
        </footer>
    </>
}