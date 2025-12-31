import Head from "next/head";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
import { FaCode, FaLayerGroup, FaServer, FaCloud, FaTerminal, FaDatabase, FaMobileAlt, FaSearchDollar } from "react-icons/fa";
import { GoArrowUpRight } from 'react-icons/go';

export default function services() {
    const servicesData = [
        {
            title: "MERN Stack Development",
            description: "Building scalable, high-performance web applications using MongoDB, Express, React, and Node.js. Architecting end-to-end solutions from database design to frontend deployment.",
            icon: <FaCode />,
            features: ["Scalable Architecture", "RESTful/GraphQL APIs", "Real-time Operations", "State Management", "Performance Optimization"]
        },
        {
            title: "Next.js & Frontend Engineering",
            description: "Crafting modern, SEO-optimized, and lightning-fast user interfaces with Next.js 14, React Server Components, and Tailwind CSS. Focused on Core Web Vitals and UX.",
            icon: <FaLayerGroup />,
            features: ["Server-Side Rendering", "Client-Side Hydration", "Responsive Design", "Advanced Animations", "SEO Best Practices"]
        },
        {
            title: "Backend & API Architecture",
            description: "Designing robust server-side logic and secure APIs. Implementing authentication, WebSockets, and efficient database indexing to ensure maximum reliability.",
            icon: <FaTerminal />,
            features: ["JWT Authentication", "Role-Based Access", "API Rate Limiting", "Database Modeling", "Microservices Support"]
        },
        {
            title: "Cloud Deployment & DevOps",
            description: "Experience in deploying applications to AWS, Vercel, and Docker. Implementing CI/CD pipelines, load balancing, and cloud-native scaling strategies.",
            icon: <FaCloud />,
            features: ["Docker Containerization", "CI/CD Pipelines", "AWS S3 / Lambda", "Vercel Deployment", "Monitoring & Logs"]
        },
        {
            title: "Custom Web Solutions",
            description: "Developing tailored web applications that solve specific business problems. From e-commerce platforms to complex management systems.",
            icon: <FaDatabase />,
            features: ["CMS Integration", "Payment Gateway Setup", "Custom Workflow Logic", "Data Migration", "Third-party Integrations"]
        },
        {
            title: "Mobile-First Design",
            description: "Ensuring your web application looks and performs beautifully on every device. Prioritizing accessibility and mobile-first engineering principles.",
            icon: <FaMobileAlt />,
            features: ["PWA Development", "Cross-browser Support", "Mobile Performance", "Accessibility (A11y)", "Touch Optimization"]
        }
    ];

    return <>
        <Head>
            <title>Services</title>
        </Head>

        <div className="servicespage">
            <div className="topservices">
                <div className="container_css">
                    <h2>My Services</h2>
                    <p>Home <span>&gt;</span> Services</p>
                </div>
            </div>
            <div className="centerservices py-20 bg-black-100 dark:bg-[#dedddc]">
                <div className="container_css px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 border border-white/10 dark:border-black/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-2xl hover:shadow-indigo-500/20"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-4xl text-indigo-500 mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-indigo-500/10">
                                        {service.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-slate-400 dark:text-gray-600 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 font-medium tracking-wide">
                                                <IoMdCheckmark className="text-indigo-500 text-lg flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center gap-2 text-indigo-400 dark:text-indigo-600 font-bold text-xs tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Learn More <GoArrowUpRight className="text-lg" />
                                    </div>
                                </div>

                                {/* Background Glow */}
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] group-hover:bg-indigo-500/30 transition-all duration-500 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pricingplansec pt-40 pb-20 bg-black-100 dark:bg-[#dedddc]">
                <div className="container_css px-5">
                    <div className="pricingtitles text-center mb-16">
                        <h3 className="text-sm font-bold tracking-[0.4em] text-indigo-500 uppercase mb-4 flex items-center justify-center gap-2">
                            OUR PRICING
                        </h3>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-gray-900 mb-6">Expert Solutions for Your Scale</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Basic Plan",
                                price: "$29",
                                desc: "Perfect for personal branding or MVPs.",
                                features: ["Single Page React/Next.js App", "Standard UI Components", "Basic SEO Optimization", "One Month Support", "Basic Cloud Setup"]
                            },
                            {
                                name: "Premium Plan",
                                price: "$59",
                                desc: "Ideal for growing businesses and startups.",
                                features: ["Full-stack MERN Application", "Advanced UI with Animations", "User Authentication & Database", "Search Engine Optimization", "Three Months Support"]
                            },
                            {
                                name: "Enterprise Plan",
                                price: "$99",
                                desc: "Highest-scale corporate web solutions.",
                                features: ["Custom Next.js SaaS Architecture", "E-commerce & CMS Integration", "Docker & CI/CD Pipelines", "API Security & Rate Limiting", "Six Months Priority Support"]
                            }
                        ].map((plan, i) => (
                            <div key={i} className={`group relative p-10 rounded-2xl border transition-all duration-500 hover:-translate-y-4 ${i === 1 ? 'bg-indigo-600/10 border-indigo-500/50 shadow-indigo-500/20 shadow-2xl scale-105 z-20' : 'bg-white/5 dark:bg-black/5 border-white/10 dark:border-black/5'}`}>
                                <h4 className="text-xl font-bold text-white dark:text-gray-900 mb-2">{plan.name}</h4>
                                <p className="text-slate-400 dark:text-gray-600 text-sm mb-8">{plan.desc}</p>
                                <h2 className="text-5xl font-bold text-white dark:text-gray-900 mb-8">{plan.price} <span className="text-base font-normal text-slate-500">/ project</span></h2>
                                <Link href="/contact" className="block text-center py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all active:scale-95 mb-10 shadow-lg shadow-indigo-600/25">
                                    Get Started
                                </Link>
                                <div className="space-y-4 text-sm text-slate-300 dark:text-gray-700">
                                    <p className="font-bold text-indigo-400 uppercase tracking-widest text-xs mb-4">What's included:</p>
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            <IoMdCheckmark className="text-indigo-500 text-lg" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                {i === 1 && (
                                    <div className="absolute top-6 right-6 px-4 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">
                                        Most Popular
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>;
}