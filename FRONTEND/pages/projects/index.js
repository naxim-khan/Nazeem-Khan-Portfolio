import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {
    const { alldata, loading } = useFetchData('/api/projects');

    const publishedData = alldata.filter(ab => ab.status === 'publish');

    const [selectCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

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

    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
            <div className="projects">
                <div className="container_css">
                    <div className="project_titles">
                        <h2>My Recent Works</h2>
                        <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
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
                            filteredProjects.map((pro) => (
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
            </div>
        </div>
    </>
}