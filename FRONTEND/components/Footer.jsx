import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer ">
         <div className="footersec flex_css flex-center_css flex-col_css gap-2_css">
            <div className="logo">
                <img src="/img/logo.svg" alt="logo" />
            </div>
            <div className="ul flex flex-wrap justify-center gap-2_css">
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/services">Works</Link></li>
                <li><Link href="/services">Resume</Link></li>
                <li><Link href="/services">Skills</Link></li>
                <li><Link href="/services">Testimonials</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </div>
            <ul className="hero_social">
                <li><a href="/" target="_blank"><FaTwitter /></a></li>
                <li><a href="/" target="_blank"><LiaBasketballBallSolid /></a></li>
                <li><a href="/" target="_blank"><GrLinkedinOption /></a></li>
                <li><a href="/" target="_blank"><FaGithub /></a></li>
                <li><a href="/" target="_blank"><FaFacebookF /></a></li>
            </ul>
            <div className="copyrights">&copy; {new Date().getFullYear()} All Rights Reserved By <span>Nazeem-Khan</span></div>
         </div>
        </footer>
    </>
}