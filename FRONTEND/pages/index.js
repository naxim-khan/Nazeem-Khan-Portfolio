"use client";

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaGithub, FaInstagram, FaCalendarDay } from "react-icons/fa";
import { FaFacebookF, FaGithubAlt, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from 'react-icons/go';
import { LuMedal } from "react-icons/lu";
import Grid from "@/components/Grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Experience from "@/components/Experience"
import RecentProjects from "@/components/RecentProjects";

// Recent Projects
import { HyperText } from "@/components/magicui/hyper-text";


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
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
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

        setAlldata(projectData);
        setAllWork(blogsData);
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
      <Head>
        <title>Nazeem Khan - Personal Portfolio</title>
        <meta name="description" content="nazeem khan- Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/svg" href="/img/logo.svg" />
      </Head>

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
              <span className="hero_sb_title dark:text-[#414141] " data-ao='fade-right'>I'm Nazeem Khan </span>
              <h1 className="hero_title bg-dot dark:text-[#2c2c2c]" data-ao='fade-left'>Full Stack Web Developer </h1>
              
                <div className="hero_img_box heroimgbox " data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' >
                  <img src="/img/nazeem.jpg" alt="Nazeem khan" />
                </div>
                
              <div className="lead dark:text-[#4d4d4d]" data-ao='fade-up' >I craft user-focused websites and applications to elevate your business and bring your ideas to life. Let's create something extraordinary together.</div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link href='/' download={'/img/resume.pdf'} className='download_cv ' title="Download CV">Download CV<BiDownload />  </Link>
                <div className="subsocial">
                  <ul className="hero_social flex ">
                    <li><a href="www.google.com/"  target="_blank" title="visit my X profile"><FaTwitter /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/"  target="_blank" title="visit my LinkedIn profile"><FaLinkedinIn /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/"  target="_blank" title="visit my GitHub profile"><FaGithub /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/"  target="_blank" title="visit my FaceBook profile"><FaFacebookF /> </a></li>
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
          <div className="funfect_area flex_css flex-sb_css">
            <div className="funfect_item" >
              <h3><HyperText className='' text="3+" animateOnLoad={true} /></h3>
              <h4>Years of <br /> Experience</h4>
            </div>
            <div className="funfect_item" >
              <h3 className="flex items-center justify-center"><HyperText className='' text="20" animateOnLoad={true} />+</h3>
              <h4>Projects <br /> Completed</h4>
            </div>
            <div className="funfect_item" >
              <h3 className="flex items-center justify-center"><HyperText className='' text="25" animateOnLoad={true} />+</h3>
              <h4>Happy <br /> Costumers</h4>
            </div>
          </div>

        </div>

      </section>

      {/* About Section  */}
      <section className="about   bg-black-100 dark:bg-[#cecdcd]  p-5 h-fit max-h-fit" id="about">

        <div className="container_css">
          <Grid />
        </div>
      </section>

      {/* Services */}
      <section className=" services p-5 pb-0 h-fit_css max-h-fit bg-black-100 dark:bg-[#dedddc]">
        <div className="container_css">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>

          <div className="services_menu">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
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
      < section className="myskills  bg-black-100 dark:bg-[#cecdcd]" >
        <div className="container_css">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, beatae.</p>
          </div>
          <div className="myskills_cards grid grid-cols-2 md:grid-cols-6 sm:grid-cols-4 gap-4">
            <div className="mys_card ">
              <div className="mys_inner">
                <img src="/img/python.png" alt="python" />
                <h3>92%</h3>
              </div>
              <p className="text-center_css">Python Django</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center_css">FireBase</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="MongoDB" />
                <h3>92%</h3>
              </div>
              <p className="text-center_css">MongoDB</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="Redux" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="React" />
                <h3>92%</h3>
              </div>
              <p className="text-center_css">React</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="Js" />
                <h3>95%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
          </div>
        </div>
      </ section>

      {/* Recent Blogs */}
      < section className="recentblogs bg-black-100 dark:bg-[#dedddc]" >
        <div className="container_css">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, voluptatum delectus. Laudantium tempore, magnam eaque delectus cum ea cupiditate est?</p>
          </div>
          <div className="recent_blogs mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} className="re_blog" key={blog._id}>
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex_css gap-1_css">
                    <div className="res_date">
                      <FaCalendarDay /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </ section>

    </>
  );
}
