import Spinner from "@/components/Spinner";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaGithub, FaInstagram, FaCalendarDay } from "react-icons/fa";
import { FaFacebookF, FaGithubAlt, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from 'react-icons/go';
import { LuMedal } from "react-icons/lu";


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
      <Head>
        <title>Nazeem Khan - Personal Portfolio</title>
        <meta name="description" content="nazeem khan- Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/svg" href="/img/logo.svg" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' text-anchor='middle' className="animate-stroke" data-aos='fade-right'>HI</text>
          </svg>
        </div>

        <div className="container_css">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos='fade-right'>I'm Nazeem Khan</span>
              <h1 className="hero_title" data-aos='fade-left'>Full Stack Web Developer </h1>
              <div className="hero_img_box heroimgbox " data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' >
                <img src="/img/nazeem.jpg" alt="Nazeem khan"  />
              </div>
              <div className="lead" data-aos='fade-up' >I break down complex user experience problems to create integrity focussed solution that connect billions of poeples</div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link href='/' download={'/img/resume.pdf'} className='download_cv' title="Download CV">Download CV <BiDownload /></Link>
                <div className="subsocial">
                  <ul className="hero_social flex ">
                    <li><a href="www.google.com/" target="_blank" title="visit my X profile"><FaTwitter /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/" target="_blank" title="visit my LinkedIn profile"><FaLinkedinIn /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/" target="_blank" title="visit my GitHub profile"><FaGithub /> </a></li>
                  </ul>
                  <ul className="hero_social">
                    <li><a href="www.google.com/" target="_blank" title="visit my FaceBook profile"><FaFacebookF /> </a></li>
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
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos='fade-left'>
              <h3>3+</h3>
              <h4>Year of <br /> Experience</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>20+</h3>
              <h4>Projects <br /> Completed</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>25+</h3>
              <h4>Happy <br /> Costumers</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
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
      <section className="projects">
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

          <div className="projects_cards">
            {loading ? (
              <div className="flex flex-center wh_100"><Spinner /></div>
            ) : (
              filteredProjects.slice(0, 4).map((pro) => (
                <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                  <div className="proimgbox">
                    <img src={pro.images?.[0] || '/img/noimage.png'} alt={pro.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{pro.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container_css flex flex-left flex-sb">
          <div className="experience">
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
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container_css">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, beatae.</p>
          </div>
          <div className="myskills_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.png" alt="python" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python Django</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center">FireBase</p>
            </div>

            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="MongoDB" />
                <h3>92%</h3>
              </div>
              <p className="text-center">MongoDB</p>
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
              <p className="text-center">React</p>
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
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container_css">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, voluptatum delectus. Laudantium tempore, magnam eaque delectus cum ea cupiditate est?</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} className="re_blog" key={blog._id}>
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
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
      </section>

    </>
  );
}
