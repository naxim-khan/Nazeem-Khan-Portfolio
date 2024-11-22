import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const Grid = () => {
  return (
    <section id="about dark:bg-slate-200  bg-black-100">
      <div className="container_css text-center">
      <div className="mt-3 bg-gradient-to-r from-main-site to-slate-900 dark:to-slate-100 w-full h-[2px] opacity-10"/>
      <div className="mt-1 bg-gradient-to-l from-main-site to-slate-900 dark:to-slate-100 w-full h-[2px] opacity-10"/>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-main-site to-custom-gray text-5xl py-8">Introduction </h2>
          <p className="text-slate-400 dark:text-slate-700 text-start sm:text-center w-full m-0 p-0 text-lg sm:text-xl px-8">I'm a skilled software developer with experience in JavaScript, and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!</p>
          
      </div>
      <BentoGrid className="w-full py-20 ">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;