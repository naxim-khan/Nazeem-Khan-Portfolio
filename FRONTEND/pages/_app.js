"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {Particles} from "@/components/magicui/particles"
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
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
    setTimeout(handleComplete, 3000);

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
    <Preloader isLoading={isLoading} />
    <Header />
    {/* <FloatingNav navItems={navItems} /> */}
    {!isLoading && (
      <main id="site-wrapper">
          <Component {...pageProps} />
      </main>
    )}
    <Footer />

  </>
}
