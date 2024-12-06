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
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom flex items-center justify-center max-sm:w-full"
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

        <div className="flex justify-center items-center flex-col ">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-white dark:text-black-100 min-w-auto sm:max-w-[500px]  max-sm:text-xl">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500 max-sm:text-sm max-md:mb-2">
              {testimonials[active].designation}
            </p>
            {/* <motion.p className="text-lg text-gray-500 mt-2 dark:text-neutral-300">
              {testimonials[active].quote?.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p> */}

          </motion.div>

          <div className="flex gap-4 pt-0 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
