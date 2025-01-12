import React, { useState, useRef } from 'react';
import useFetchData from '@/hooks/useFetchData';
import { FaGraduationCap, FaCertificate, FaTrophy, FaScroll, FaEye } from 'react-icons/fa6';
import Spinner from "@/components/Spinner";
import { ShineBorder } from "@/components/magicui/shine-border";

const Certificates = () => {
    const certificatesRef = useRef(null);
    const { alldata, loading } = useFetchData('/api/education');
    const publisheddata = alldata.filter(ab => ab.status === 'publish');

    // Categories
    const categories = [
        {
            icon: <FaGraduationCap />,
            title: 'Degrees',
            description: 'Academic Degrees',
            categoryKey: 'Degree',
        },
        {
            icon: <FaCertificate />,
            title: 'Certificates',
            description: 'Professional certifications',
            categoryKey: 'Certificate',
        },
        {
            icon: <FaScroll />,
            title: 'Diplomas',
            description: 'Professional diplomas',
            categoryKey: 'Diploma',
        },
        {
            icon: <FaTrophy />,
            title: 'Achievements',
            description: 'Awards and special recognitions',
            categoryKey: 'Achievement',
        },
    ];

    // State for selected category
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Handle category click
    const handleCategoryClick = (categoryKey) => {
        setSelectedCategory(categoryKey); // Update selected category
        if (certificatesRef.current) {
            certificatesRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to certificates section
        }
    };

    // Filtered data
    const filteredData = searchQuery.trim() === ''
        ? (selectedCategory ? publisheddata.filter(cert => cert.Category[0] === selectedCategory) : publisheddata)
        : (selectedCategory
            ? publisheddata.filter(cert => cert.Category[0] === selectedCategory && cert.title.toLowerCase().includes(searchQuery))
            : publisheddata.filter(cert => cert.title.toLowerCase().includes(searchQuery))
        );

    return (
        <div className="min-h-screen mt-8">
            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 w-full">
                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12 gap-8 py-8">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="c_category_card bg-[#1f1f70] rounded-lg p-6 hover:bg-gray-750 transition-all cursor-pointer border border-[#252586] hover:border-indigo-500 group"
                            onClick={() => handleCategoryClick(item.categoryKey)} // Use the handler
                        >
                            <div className="edu_icons mb-4 text-2xl">{item.icon}</div>
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Certificates Section */}
                <div
                    ref={certificatesRef} // Attach the ref here
                    id="certificates"
                    className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8 w-full"
                >
                    {loading ? (
                        <div className="flex_css flex-center_css wh_100_css w-full">
                            <Spinner />
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="w-full text-center py-10 text-xl text-gray-500">
                            {selectedCategory ? `${selectedCategory} Isn't Uploaded Yet!` : 'No data found'}
                        </div>
                    ) : (
                        filteredData.map((certificate, index) => (
                            <ShineBorder
                                className="relative text-white-100  rounded-lg max-w-fit max-h-fit m-0 p-0 bg-transparent dark:border-none dark:bg-transparent md:shadow-xl"
                                color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                                borderWidth={1}
                                duration={15}
                                key={index}
                            >
                                <div
                                    key={index}
                                    className="certificate_card rounded-lg overflow-hidden group hover:ring-2 hover:ring-indigo-500 transition-all"
                                >
                                    <div className="relative w-full h-48">
                                        <img
                                            src={certificate.images[0] || '/img/no-image.png'}
                                            alt={certificate.title}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2">{certificate.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="c_institute text-sm text-slate-500">{certificate.Institute}</p>
                                            <span className="c_year text-slate-500 text-sm">
                                                {certificate.createdAt ? new Date(certificate.createdAt).getFullYear() : 'N/A'}
                                            </span>
                                        </div>
                                        <a
                                            href={certificate.slug ? `/Education/${certificate.slug}` : '#'}
                                            className="c_button mt-4 flex items-center justify-center rounded-sm gap-2"
                                        >
                                            <FaEye />
                                            <button
                                                className={`inline-block py-2 ${
                                                    !certificate.slug ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
                                                }`}
                                            >
                                                View Details
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </ShineBorder>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Certificates;
