"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaGithub, FaInstagram, FaCalendarDay, FaCode, FaLayerGroup, FaServer, FaCloud } from "react-icons/fa";
import { FaFacebookF, FaGithubAlt, FaLinkedin, FaLinkedinIn, FaTwitter, FaTerminal, FaDatabase } from "react-icons/fa6";
import { GoArrowUpRight } from 'react-icons/go';
import { LuMedal } from "react-icons/lu";
import dynamic from "next/dynamic";

// Dynamically load heavy components
const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: false });
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), { ssr: false });
const BackgroundBeams = dynamic(() => import("@/components/ui/background-beams").then(m => m.BackgroundBeams), { ssr: false });

// Recent Projects
import { HyperText } from "@/components/magicui/hyper-text";
import SEO from "@/components/SEO";


export default function Home() {
  // active service background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as active
    // when mouse leave
  }


  // services data
  const services = [
    {
      title: "MERN Stack Development",
      description: "Building scalable, high-performance web applications using MongoDB, Express, React, and Node.js. Architecting end-to-end solutions from database design to frontend deployment.",
      icon: <FaCode />
    },
    {
      title: "Next.js & Frontend Engineering",
      description: "Crafting modern, SEO-optimized, and lightning-fast user interfaces with Next.js 14, React Server Components, and Tailwind CSS. Focused on Core Web Vitals and UX.",
      icon: <FaLayerGroup />
    },
    {
      title: "Backend & API Architecture",
      description: "Designing robust RESTful and GraphQL APIs with Node.js and Django. Implementing secure authentication, real-time features with WebSockets, and efficient database indexing.",
      icon: <FaTerminal />
    },
    {
      title: "Cloud Deployment & DevOps",
      description: "Experience in deploying MERN applications to AWS, Vercel, and Docker. Implementing CI/CD pipelines, load balancing, and cloud-native scaling strategies.",
      icon: <FaCloud />
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllWork] = useState([]);
  const [selectCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs'),
        ]);

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();
        const filteredBlogs = await blogsData.filter(blog => blog.status === 'publish');

        setAlldata(projectData);
        setAllWork(filteredBlogs);
      } catch (error) {
        console.error('Error Fetching Data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    // Filter projects based on selected category
    if (selectCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(
        alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0].includes(selectCategory))

      );
    }


  }, [selectCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // function to format the date as '20 may 2024 14:11 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ''; // handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true, // use 12-hour format
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <>
      {/* D:\3_Web_Projects\PortfolioWork\React_ThreeJs\3d_Portfolio> */}
      <SEO
        title="Home"
        description="Professional MERN Stack web developer freelancer specialized in building premium, responsive, and high-performance web applications using React, Next.js, and Node.js."
        keywords="MERN Stack web developer freelancer, React developer, Next.js developer, Full Stack Developer, Nazeem Khan, Portfolio"
      />

      {/* hero section */}
      <section className="hero bg-black-100 dark:bg-[#dedddc] ">
        <BackgroundBeams className="h-screen w-screen" />
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' text-anchor='middle' className="animate-stroke" data-aos='fade-right'>HI </text>

          </svg>
        </div>

        <div className="container_css">
          <div className="flex_css w-100_css flex items-center justify-center ">
            <div className="heroinfoleft">
              <span className="hero_sb_title dark:text-[#414141] font-bold tracking-widest uppercase text-xs mb-4 block" data-ao='fade-right'>I'm Nazeem Khan </span>
              <h1 className="hero_title bg-dot dark:text-[#2c2c2c] text-5xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent" data-ao='fade-left'>Full Stack Web Developer </h1>

              <div className="hero_img_box heroimgbox " data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' >
                <img src="/img/nazeem.jpg" alt="Nazeem khan" />
              </div>

              <div className="lead dark:text-[#4d4d4d] max-w-xl text-lg text-slate-400 mb-10 leading-relaxed" data-ao='fade-up' >I craft user-focused websites and applications to elevate your business and bring your ideas to life. Let's create something extraordinary together.</div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link
                  href='/img/resume.pdf'
                  className='download_cv'
                  title="Download CV"
                  target="_blank"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    const link = document.createElement('a');
                    link.href = '/img/resume.pdf';
                    link.download = 'resume.pdf'; // You can change the filename if needed
                    link.click(); // Trigger the download
                  }}
                >
                  Download CV <BiDownload />
                </Link>
                <div className="subsocial">
                  <ul className="hero_social flex gap-4">
                    <li><a href="https://www.coursera.org/user/ed8917ae9cc8a33be8969325841526be" target="_blank" title="visit my X profile"><FaTwitter /> </a></li>
                    <li><a href="https://www.linkedin.com/in/nazeemkhannk/" target="_blank" title="visit my LinkedIn profile"><FaLinkedinIn /> </a></li>
                    <li><a href="https://github.com/naxim-khan" target="_blank" title="visit my GitHub profile"><FaGithub /> </a></li>
                    <li><a href="https://www.facebook.com/nzm.khan.5245" target="_blank" title="visit my FaceBook profile"><FaFacebookF /> </a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* right side image */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' >
                <img src="/img/nazeem.jpg" alt="Nazeem Khan" />
              </div>
            </div>
          </div>

          {/* funfact text */}
          <div className="funfect_area relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20  mx-auto">
            {[
              { num: "3+", label: "Years of Experience" },
              { num: "20+", label: "Projects Completed" },
              { num: "10+", label: "Happy Clients" },
            ].map((fact, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h3 className="text-5xl font-bold text-indigo-500">
                  <HyperText text={fact.num} />
                </h3>
                <h4 className="text-slate-400 text-sm font-medium leading-tight">{fact.label}</h4>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* About Section  */}
      <section className="about   bg-black-100 dark:bg-[#cecdcd]  p-5 h-fit max-h-fit" id="about">

        <div className="container_css">
          <Grid />
        </div>
      </section>

      <section className="services py-24 bg-black-100 dark:bg-[#dedddc]">
        <div className="container_css">
          <div className="services_titles">
            <h2 className="text-3xl sm:text-5xl font-bold dark:text-gray-900 text-white mb-4">My Quality Services</h2>
            <p className="text-slate-400 dark:text-gray-600">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-black/5 p-8 sm:p-10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl text-indigo-500 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-gray-900 mb-4 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 dark:text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-indigo-400 dark:text-indigo-600 font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Explore Details
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[100px] group-hover:bg-indigo-500/40 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      {/* <section className="projects ">

        <div className="container_css">

          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <div className="project_buttons">
            <button className={selectCategory === 'All' ? 'active' : ''} onClick={() => handleCategoryChange('All')}>All</button>
            <button className={selectCategory === 'website development' ? 'active' : ''} onClick={() => handleCategoryChange('website development')}>Websites</button>
            <button className={selectCategory === 'app development' ? 'active' : ''} onClick={() => handleCategoryChange('app development')}>Apps</button>
            <button className={selectCategory === 'E-commerce site' ? 'active' : ''} onClick={() => handleCategoryChange('E-commerce site')}>E-Commerce Sites</button>
            <button className={selectCategory === 'Node JS' ? 'active' : ''} onClick={() => handleCategoryChange('Node JS')}>Content</button>
          </div>

          <div className=" w-full  flex flex-wrap items-center justify-center p-4 gap-16 mt-10">

            {loading ? (
              <div className="flex flex-center wh_100"><Spinner /></div>
            ) : (
              filteredProjects.slice(0, 4).map((pro) => (
                <div className="w-[37rem]">
                  

                  <CardContainer className=" w-full h-full min-h-full min-w-full  dark:bg-slate-200  bg-black-100 p-5  rounded-[1rem]  m-0 ">
                    <FlickeringGrid
                      className="z-0 absolute inset-0 size-full rounded-[1rem]"
                      squareSize={4}
                      gridGap={6}
                      color="#6208ff"
                      maxOpacity={0.5}
                      flickerChance={0.1}
                    />
                    <div className="bg-white/10 backdrop-blur-[3px]  size-full absolute rounded-[1rem]"></div>
                    <CardBody href={`/projects/${pro.slug}`} key={pro._id} className="lg:min-h-[30.5rem] h-[28rem]  w-full px-4  ">
                      
                      <CardItem
                        translateZ="50"
                        className="text-2xl font-bold text-white dark:text-[#9500ff] mt-1"
                      >
                        {pro.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-400 text-lg max-w-sm mt-1 dark:text-slate-800 font-bold"
                      >
                        {pro.description.slice(0, 70) + "..."}
                      </CardItem>

                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={pro.images[0] || '/img/noimage.png'}
                          height="1000"
                          width="2000"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />

                      </CardItem>

                      <div className="flex justify-between w-full relative overflow-hidden min-h-fit  items-center flex-grow  mt-2 pb-0 ">
                        <CardItem
                          translateZ={20}
                          as={Link}
                          href={`/projects/${pro.slug}`}
                          // target="__blank"
                          className="px-4 py-2 rounded-xl text-lg  font-bold dark:text-[#9500ff] "
                        >
                          Details →
                        </CardItem>
                        <CardItem
                          translateZ={20}

                        >
                          <Link href={pro.livepreview} target="_blank">
                            
                            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                              <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                              </span>
                              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 justify-center p-4">
                                <span className="text-lg">
                                  Live Preview
                                </span>
                                <svg
                                  fill="none"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.75 8.75L14.25 12L10.75 15.25"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </div>
                              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </button>
                          </Link>
                        </CardItem>
                      </div>
                      

                    </CardBody>
                    <BorderBeam size={300} duration={12} delay={9} borderWidth={2} colorFrom={'#8750f7'} colorTo={'#2a1454'} />
                  </CardContainer>
                  
                </div>
              ))
            )}
          </div>
        </div>
      </section> */}

      <RecentProjects />

      {/* Experience study */}
      < section className="bg-black-100 dark:bg-[#dedddc]  mt-9 h-fit max-h-fit" >
        <div className="container_css ">
          {/* <div className="experience">
            <div className="experience_title flex gap-1">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Developer</p>
              </div>

              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Developer</p>
              </div>

              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Developer</p>
              </div>
            </div>
          </div> */}
          <div className="flex items-center justify-center w-full ">
            <div className="experience_title flex gap-8 mt-2 items-center justify-center">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
          </div>
          <Experience className="bg-blue-600" />
        </div>
      </ section>

      {/* My Skills */}
      <section className="myskills py-24 bg-black-100 dark:bg-[#cecdcd]">
        <div className="container_css">
          <div className="services_titles">
            <h2 className="text-3xl sm:text-5xl font-bold dark:text-gray-900 text-white mb-4">My Skills</h2>
            <p className="text-slate-400 dark:text-gray-600">Below are the key technologies and frameworks I work with to build robust and scalable applications.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { img: "python.png", name: "Python Django", pct: "92%" },
              { img: "firebase.svg", name: "FireBase", pct: "85%" },
              { img: "mongodb.svg", name: "MongoDB", pct: "92%" },
              { img: "redux.svg", name: "Redux", pct: "88%" },
              { img: "react.svg", name: "React / Next.js", pct: "95%" },
              { img: "js.svg", name: "JavaScript", pct: "95%" }
            ].map((skill, i) => (
              <div key={i} className="group relative bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-black/5 p-6 rounded-[2rem] text-center hover:-translate-y-2 transition-all duration-300">
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                    <img src={`/img/${skill.img}`} alt={skill.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-500 mb-1">{skill.pct}</h3>
                  <p className="text-slate-400 dark:text-gray-600 text-xs font-bold uppercase tracking-widest">{skill.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs py-24 bg-black-100 dark:bg-[#dedddc]">
        <div className="container_css">
          <div className="services_titles">
            <h2 className="text-3xl sm:text-5xl font-bold dark:text-gray-900 text-white mb-4">Recent Blogs</h2>
            <p className="text-slate-400 dark:text-gray-600">I write about web development and Python, sharing tips, tutorials, and insights to help you stay updated with the latest trends and technologies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allwork.slice(0, 3).map((blog) => (
              <Link href={`/blogs/${blog.slug}`} className="group relative bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-black/5 rounded-[2.5rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-indigo-500/10" key={blog._id}>
                <div className="relative h-60 overflow-hidden">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-4 py-2 rounded-full bg-indigo-600/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest">{blog.blogcategory[0]}</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-gray-500 text-xs font-bold mb-4">
                    <FaCalendarDay className="text-indigo-500" />
                    <span>{formatDate(new Date(blog.createdAt))}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white dark:text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">{blog.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
