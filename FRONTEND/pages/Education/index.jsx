import { useState } from "react";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";


// import { CertificateMarquee } from '@/components/CertificateMarquee';
import { FocusCards } from '@/components/ui/focus-cards';
import Marquee from '@/components/magicui/marquee'
import Particles from '@/components/magicui/particles'
import BoxReveal from "@/components/magicui/box-reveal";
import { ShineBorder } from "@/components/magicui/shine-border";
import { FaArrowDown } from "react-icons/fa6";
import { RainbowButton } from "@/components/magicui/rainbow-button";


export default function shop() {

    const { alldata, loading } = useFetchData('/api/education')
    const publisheddata = alldata.filter(ab => ab.status === 'publish');


    // Format Date
    const formatDate = (date) => {
        // check if date if valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12 hour format
        }

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const firstRow = publisheddata.slice(0, publisheddata.length / 2);
    const secondRow = publisheddata.slice(publisheddata.length / 2);

    const cards = publisheddata.map((pro) => ({
        title: pro.title,
        src: pro.images[0] || '/img/no-image.png',
    }));

    return <>
        <Head>
            <title>Certificates</title>
        </Head>
        <section className="hero bg-black-100 dark:bg-[#dedddc]">
            <Particles className="absolute w-screen h-screen top-0 bottom-0 dark:text-black-100" quantity={100} size={0.6} />
            {/* <div className="educationtoptitle pt-[7rem]">
                <div className="container_css">
                    <h2>Academic Journey</h2>
                    <h2>& Technical Expertise</h2>
                </div>
            </div> */}

            <div className="container_css">
                <div class=" w-full flex items-center justify-center mt-8 sm:mt-20">
                    <div class=" px-4 mx-auto  text-center ">
                        <div>
                            <div className="educationtoptitle">
                                <h2 className="mb-8 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none">Academic Journey & Technical Expertise</h2> <br />
                            </div>
                            <p class="mb-4 text-lg font-normal text-slate-200  sm:px-16 lg:px-48 dark:text-slate-800 ">
                                Pursuing a Bachelor's degree in Computer Science at the University of Peshawar, currently in the final semester, I have built a strong foundation in programming, software development, and modern web technologies. My educational journey includes a Diploma in Information Technology (DIT) from the KPK Board of Technical Education and an Intermediate in Pre-Medical from Govt. AKL PG College Matta. Additionally, I completed a comprehensive Full-Stack Web Development online/onsite courses, further solidifying my expertise in MERN stack development and preparing me to excel in the tech industry.
                            </p>
                        </div>
                        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mb-10">

                            <RainbowButton className=" bg-slate-300 dark:bg-black-100" ><a href="#certificates" className="min-w-full min-h-full w-full h-full bg ">Certification Record</a></RainbowButton>
                        </div>
                    </div>
                </div>

                <div id="certificates" className="py-10">

                    {/* Marquee */}
                    <div className=" bg-black-100 dark:bg-[#dedddc] mt-8">
                        <div className="container_css relative flex items-center justify-center flex-col">

                            <div className="relative bg-transparent ">
                                <Marquee pauseOnHover className="[--duration:10s] ">
                                    {publisheddata.map((data) => (
                                        <ShineBorder
                                            className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg p-3 bg-transparent dark:border-none dark:bg-transparent md:shadow-xl "
                                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                            borderWidth={2}
                                            duration={15}
                                        >
                                            <Link href={`/Education/${data.slug}`}>
                                                <img src={data.images[0]} className=" max-h-[200px] sm:max-h-[300px] rounded-lg" />
                                            </Link>
                                        </ShineBorder>
                                    ))}
                                </Marquee>

                                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3  bg-gradient-to-r from-black-100 dark:from-[#dedddc]"></div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3  bg-gradient-to-l from-black-100 dark:from-[#dedddc]"></div>
                            </div>

                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10 mt-8">
                        {publisheddata.map((data) => {
                            return (
                                <div className="w-full h-full relative group">
                                    <Link href={`/Education/${data.slug}`}>
                                        <ShineBorder
                                            className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 sm:p-3 bg-transparent dark:border-none dark:bg-transparent md:shadow-xl border border-slate-400"
                                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                            borderWidth={2}
                                            duration={15}
                                        >
                                            <div className="relative w-full h-full group">
                                                <img className="h-full max-w-full rounded-lg" src={data.images[0] || "/img/no-image.png"} alt="" />
                                                <div className="absolute bottom-0 left-0 w-full rounded-b-lg text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 certificate-bg">
                                                    <h2 className="text-white text-sm font-bold  md:text-lg sm:text-xl">{data.title}</h2>
                                                </div>
                                            </div>

                                        </ShineBorder>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    </>
}