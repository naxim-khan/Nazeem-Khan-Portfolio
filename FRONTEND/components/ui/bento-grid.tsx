"use client";
import { useEffect, useState, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

// Dynamically import GridGlobe and Lottie Player
const GridGlobe = dynamic(() => import("./GridGlobe"), { ssr: false });
const Player = dynamic(() => import("lottie-react"), { ssr: false });

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["VueJS", "NuxtJS", "GraphQL"];
  const [copied, setCopied] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false); // State to control 3D rendering

  // Ref for the Lottie player to control the animation manually
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Check if deviceMemory exists in navigator
    const deviceMemory = (navigator as any).deviceMemory || 4; // Default to 4GB if unsupported
    if (deviceMemory > 2) {
      setCanRender3D(true); // Allow rendering 3D if memory > 2GB
    }
  }, []);  

  const handleCopy = () => {
    const text = "nazeemkhanpk@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);

    // Play the animation once
    if (playerRef.current) {
      playerRef.current.stop();
      playerRef.current.goToAndStop(0, true);
      playerRef.current.play();
    }

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-lg dark:shadow-black-100/50 justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Image div */}
      <div className={`${id === 6 && "flex justify-center "} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl "></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {/* Conditionally render the 3D component */}
          {id === 2 && canRender3D && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-4 w-fit h-full absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className=" lg:py-[0.7rem] lg:px-2 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
                <span className="lg:py-4 lg:px-4 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-[0.5rem] lg:px-2 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg  text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                <Player
                  animationData={animationData}
                  autoplay={false} // Disable autoplay
                  loop={false} // Disable looping
                  lottieRef={playerRef} // Attach ref to the Player
                  style={{ height: 200, width: 400 }}
                />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy} // Set the handleCopy function
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
