"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Particles } from "@/components/magicui/particles"
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Head from 'next/head';
import Aos from "aos";
import 'aos/dist/aos.css';
import "@/styles/globals.css";

import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { navItems } from '@/data';


export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }

    // simulate loading delay
    setTimeout(handleComplete, 500);

    return () => {
      clearTimeout(handleComplete)
    }
  }, [])


  // aos animation
  useEffect(() => {
    // initialize aos
    Aos.init({
      // global settins
      disable: false, // accepts following values: phone, tablet, mobile, boolean, expression for function
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // settings that can be override on per-element
      offset: 100,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',

    })
  }, [])

  return <>
    <Head>
      <meta name="description" content="Nazeem Khan – Professional web developer specializing in MERN stack, Python Django, and Next.js. Let's build robust and scalable web applications tailored to your business needs. Contact me today!" />
    </Head>
    <Preloader isLoading={isLoading} />
    <Header />
    {/* <FloatingNav navItems={navItems} /> */}
    {!isLoading && (
      <main id="site-wrapper" className="bg-black-100 dark:bg-white-100">
        <Component {...pageProps} />
      </main>
    )}
    <Footer />

  </>
}
