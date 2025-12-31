"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData"; // import this module from here
import Link from "next/link";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  slug: string;
};

export const AnimatedTestimonials = ({ autoplay = false }: { autoplay?: boolean }) => {
  // Fetching data using useFetchData
  const { alldata, loading } = useFetchData("/api/education");

  // Filter published data and map it to the Testimonial format
  const testimonials: Testimonial[] = alldata
    .filter((item: any) => item.status === "publish")
    .map((data: any) => ({
      quote: data.quote || "",
      name: data.title || "Unknown Name",
      designation: data.Institute || "Unknown Designation",
      src: (data.images && data.images[0]) || "/img/noimage.png",
      slug: data.slug
    }));

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (testimonials.length === 0) {
    return <div>No testimonials available.</div>;
  }

  return (
    <div className="max-w-full md:max-w-4xl mx-0 antialiased font-sans px-0 md:px-8 lg:px-12 sm:py-20 py-2  max-sm:max-w-full  max-sm:min-w-auto max-sm:p-0 max-sm:m-0">
      <div className="relative grid grid-cols-1 gap-20">
        <div>
          <div className="relative h-80 w-full ">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  {...({
                    key: testimonial.src,
                    initial: {
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    },
                    animate: {
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    },
                    exit: {
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    },
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                    className: "absolute inset-0 origin-bottom flex items-center justify-center max-sm:w-full",
                  } as any)}
                >
                  <Link href={`/Education/${testimonial.slug}`}>
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className=" h-full w-full rounded-2xl object-cover object-center max-w-[500px] min-w-auto  max-sm:h-auto max-sm:min-w-auto max-sm:w-[100%] max-sm:mx-0 max-sm:px-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col space-y-3">
          <motion.div
            {...({
              key: active,
              initial: {
                y: 15,
                opacity: 0,
              },
              animate: {
                y: 0,
                opacity: 1,
              },
              exit: {
                y: -15,
                opacity: 0,
              },
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            } as any)}
            className="text-center w-full px-4 overflow-hidden"
          >
            <h3 className="text-lg font-bold text-white dark:text-gray-900 tracking-tight truncate whitespace-nowrap">
              {testimonials[active].name}
            </h3>
            <p className="text-[10px] font-extrabold text-indigo-400 dark:text-indigo-600 uppercase tracking-[0.2em] mt-0.5">
              {testimonials[active].designation}
            </p>
          </motion.div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5 hover:bg-indigo-600 dark:hover:bg-indigo-600 flex items-center justify-center group/button transition-all duration-300"
            >
              <IconArrowLeft className="h-4 w-4 text-slate-400 group-hover/button:text-white transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5 hover:bg-indigo-600 dark:hover:bg-indigo-600 flex items-center justify-center group/button transition-all duration-300"
            >
              <IconArrowRight className="h-4 w-4 text-slate-400 group-hover/button:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
