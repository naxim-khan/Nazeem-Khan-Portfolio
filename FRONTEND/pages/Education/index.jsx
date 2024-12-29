import { useState } from "react";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

import Marquee from '@/components/magicui/marquee'
// import Particles from '@/components/magicui/particles'
import { ShineBorder } from "@/components/magicui/shine-border";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { BiDownload } from "react-icons/bi";


export const FadeUp = (delay) => {
    return {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.5,
                delay: delay,
                ease: "easeInOut",
            },
        },
    };
};



export default function shop() {

    const { alldata, loading } = useFetchData('/api/education')
    const publisheddata = alldata.filter(ab => ab.status === 'publish');

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // filter all data based on search query
    const filteredData = searchQuery.trim() === '' ? publisheddata : publisheddata.filter(blog => blog.title.toLowerCase().includes(searchQuery))

    return <>
        <Head>
            <title>Certificates</title>
        </Head>

        {/* hero section */}
        <section className="max-w-[1300px] bg-black-100 dark:bg-[#dedddc] m-auto">
            {/* <Particles className="absolute w-full h-full top-0 bottom-0 dark:text-black-100" quantity={100} size={0.6} /> */}

            <div className=" px-2 sm:px-8">

                <div className="w-full grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 items-center pt-8 justify-center">
                    <div className="heroinfoleft-2 flex flex-col items-center md:items-start w-full custom-1008:py-32 custom-1008:items-center custom-1008:justify-center custom-1008:flex custom-1008:pb-0 custom-1008:px-0 custom-1008:w-full">
                        <span className="hero_sb_title dark:text-[#414141] " data-aos='fade-right'>Academic Journey &</span>
                        <h1 className="hero_title bg-dot dark:text-[#2c2c2c]" data-aos='fade-left'>Certification</h1>

                        <div className="lead dark:text-[#4d4d4d]" data-aos='fade-up' >I'm a final-semester Computer Science student at the University of Peshawar with expertise in programming, Web development, and MERN stack. I also hold a Diploma in IT and completed Full-Stack Web Development courses, preparing me for success in tech.</div>
                        <div className="" data-aos='fade-up'>
                            <div className="subemail">
                                <form className="flex_css" onSubmit={(event) => {
                                    event.preventDefault();
                                    const certificatesSection = document.getElementById("certificates");
                                    if (certificatesSection) {
                                        certificatesSection.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                }}>
                                    <input
                                        value={searchQuery}
                                        onChange={ev => setSearchQuery(ev.target.value)}
                                        type="text"
                                        placeholder="Search Certificate by title ..."
                                    />
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className=" px-2 py-8">
                        <div className=" h-full flex items-center justify-center max-md:mt-0  pt-0 md:pt-1 sm:pt-8  px-4 max-sm:min-w-auto max-sm:w-full">
                            <AnimatedTestimonials />
                        </div>
                    </div>
                </div>

                <div className="container_css relative flex items-center justify-center flex-col">

                    <div className="relative bg-transparent w-full " >
                        <Marquee pauseOnHover className="[--duration:10s] container_css overflow-hidden">
                            {loading ? (
                                <div className="flex_css flex-center_css wh_100_css w-full"><Spinner /></div>
                            ) : filteredData.length === 0 ? (
                                <div className="w-full text-center py-10 text-xl text-gray-500">No data found</div>
                            ) : (
                                filteredData.map((data) => (
                                    <ShineBorder
                                        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-3 bg-transparent dark:border-none dark:bg-transparent md:shadow-xl "
                                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                        borderWidth={2}
                                        duration={15}
                                        key={data.slug}  // Adding a unique key for each item in the list
                                    >
                                        <Link href={`/Education/${data.slug}`} className="overflow-hidden">
                                            <img src={data.images[0]} className="max-h-[200px] sm:max-h-[300px] rounded-lg" />
                                        </Link>
                                    </ShineBorder>
                                ))
                            )}
                        </Marquee>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%]  bg-gradient-to-r from-black-100 dark:from-[#dedddc]"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%]  bg-gradient-to-l from-black-100 dark:from-[#dedddc]"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10 mt-8 " id="certificates">

                    {loading ? (
                        <div className="flex_css flex-center_css wh_100_css w-full"><Spinner /></div>
                    ) : filteredData.length === 0 ? (
                        <div className="w-full text-center py-10 text-xl text-gray-500">No data found...!</div>
                    ) : (
                        filteredData.map((data) => (
                            <div className="w-full h-full relative group">
                                <Link href={`/Education/${data.slug}`}>
                                    <ShineBorder
                                        className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 sm:p-3 bg-transparent dark:border-none dark:bg-transparent md:shadow-xl border border-slate-400"
                                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                        borderWidth={2}
                                        duration={15}
                                    >
                                        <div className="relative w-full  group">
                                            <img className=" max-w-full rounded-lg" src={data.images[0] || "/img/no-image.png"} alt="" />
                                            <div className="absolute bottom-0 left-0 w-full rounded-b-lg text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 certificate-bg">
                                                <h2 className="text-white text-sm font-bold  md:text-lg sm:text-xl">{data.title}</h2>
                                            </div>
                                        </div>

                                    </ShineBorder>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

            </div>

        </section>
    </>
}