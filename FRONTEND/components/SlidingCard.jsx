import React, { useState, useEffect } from 'react';
import Spinner from "@/components/Spinner";
const SlidingCard = () => {
    const [loading, setLoading] = useState(true);
    const [alldata, setAlldata] = useState([]);
    const [allwork, setAllWork] = useState([]);
    const [selectCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await fetch('/api/projects');
                const projectData = await projectResponse.json();
                setAlldata(projectData);
            } catch (error) {
                console.error('Error Fetching Data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
        } else {
            setFilteredProjects(
                alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0].includes(selectCategory))
            );
        }
    }, [selectCategory, alldata]);

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date))) {
            return '';
        }
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };

    const formatText = (text, maxLength) => {
        if (!text) return ''; // Return an empty string if text is undefined
        const plainText = text.replace(/[#_*~`>+\-!]/g, ''); // Remove Markdown symbols
        return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
    };
    

    return (
        <div class="wrapper">
                {loading ? (
                    <div className="flex_css flex-center_css wh_100_css"><Spinner /></div>
                ) : (
                    filteredProjects.slice(0, 4).map((pro, index) => (
                        <div className='container_cards '>
                        <input type="radio" name="slide" id={`c${index+1}`} checked />
                        <label for={`c${index+1}`} 
                        class="card w-full"
                        style={{ backgroundImage: `url(${pro.images[0] || '/img/noimage.png'})` }} 
                        >
                            <div class="row" checked>
                                <div class="icon">{index+1}</div>
                                <div class="description">
                                    <h4 className='font font-bold text-lg '>{formatText(pro.title, 40)}</h4>
                                    <p>Winter has so much to offer -
                                        creative activities</p>
                                </div>
                            </div>
                        </label>
                    </div>
                ))
            )}
        </div>
    );
};

export default SlidingCard;
