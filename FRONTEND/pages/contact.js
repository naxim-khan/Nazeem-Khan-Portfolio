import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume, FaLinkedinIn, FaGithub, FaTwitter, FaFacebookF } from 'react-icons/fa'
import { MdAttachEmail, MdMessage } from 'react-icons/md'
import { GoProject } from 'react-icons/go'
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BorderBeam } from "@/components/magicui/border-beam";
export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


    const [messageOk, setMessageOk] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();

        setMessageOk('Sending...')

        const data = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('Message sent successfully ✔')
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.log("Error occurred sending message : ", error)
            if (error.response) {
                // the req was made and the server responded with a status code
                // the falls out of the range of 2xx
                console.error("server error", error.response.data)
            } else if (error.request) {
                // the req was made but no response was received
                console.error('Network Error', error.request)
            } else {
                // something happend in setting up the  req that triggered an error
                console.error("Unkown Error: ", error.message)
            }
            setMessageOk('❌ Failed to send message...!')
        }
    }

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter((item) => item !== projectName));
        } else {
            setProject([...project, projectName]);
        }
    };

    const handlePriceChange = (eve) => {
        console.log('PriceChanged: ', eve.target.value)
        setPrice(eve.target.value)
    }

    return <>
        <Head>
            <title>Contact us</title>
        </Head>

        <div className="contactpage bg-black-100 dark:bg-[#dedddc] min-h-screen pt-32 pb-20 relative overflow-hidden">
            <BackgroundBeams className="opacity-40" />
            <div className="container_css px-5 relative z-10">
                <div className="contactformp flex flex-col lg:flex-row bg-white/5 dark:bg-black/5 backdrop-blur-xl border border-white/10 dark:border-black/5 rounded-2xl overflow-hidden shadow-2xl relative">
                    <BorderBeam size={400} duration={15} />

                    <div className="leftcontp lg:w-1/3 p-10 lg:p-16 bg-indigo-600/5 border-r border-white/10 dark:border-black/5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-indigo-500 font-bold tracking-widest uppercase text-xs mb-6">
                            <MdMessage className="text-lg" /> CONTACT ME
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-gray-900 mb-4 leading-tight">Get in touch</h2>
                        <h3 className="text-xl lg:text-2xl font-medium text-slate-300 dark:text-gray-700 mb-8">Let's talk about your project</h3>

                        <div className="space-y-6 text-slate-400 dark:text-gray-600 leading-relaxed text-lg">
                            <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                            <p>I love questions and feedback - and I'm always happy to help!</p>
                        </div>

                        <div className="leftsociinfo mt-12 space-y-6">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 group cursor-pointer hover:text-indigo-400 dark:hover:text-indigo-600 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <FaPhoneVolume />
                                    </div>
                                    <span className="text-sm font-medium"> <a href="tel:+9234*********" target="_blank" className="hover:underline">+92-34*********</a></span>
                                </li>
                                <li className="flex items-center gap-4 group cursor-pointer hover:text-indigo-400 dark:hover:text-indigo-600 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <MdAttachEmail />
                                    </div>
                                    <span className="text-sm font-medium"> <a href="mailto:nazeemkhanpk@gmail.com" target="_blank" className="hover:underline">nazeemkhanpk@gmail.com</a></span>
                                </li>
                            </ul>

                            <div className="flex gap-4 pt-6">
                                {[
                                    { icon: <FaGithub />, link: "https://github.com/naxim-khan" },
                                    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/nazeemkhannk/" },
                                    { icon: <FaTwitter />, link: "https://www.coursera.org/user/ed8917ae9cc8a33be8969325841526be" },
                                    { icon: <FaFacebookF />, link: "https://www.facebook.com/nzm.khan.5245" }
                                ].map((social, i) => (
                                    <a key={i} href={social.link} target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 dark:border-black/5 flex items-center justify-center text-slate-400 dark:text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-lg active:scale-90">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rightcontp lg:w-2/3 p-10 lg:p-16">
                        <form onSubmit={createProduct} className="space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white dark:text-gray-900 border-b border-indigo-500/20 pb-4">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="First Name" required className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                                    <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Last Name" className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                                    <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Email Address" required className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                                    <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Company Name" className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                                    <input type="number" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone Number" required className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all"
                                    >
                                        <option value="" className="bg-gray-900 text-white">Select Country</option>
                                        <option value="Palestine" className="bg-gray-900">Palestine ❤</option>
                                        <option value="Pakistan" className="bg-gray-900">Pakistan</option>
                                        <option value="United States" className="bg-gray-900">United States</option>
                                        <option value="United Kingdom" className="bg-gray-900">United Kingdom</option>
                                        <option value="Germany" className="bg-gray-900">Germany</option>
                                        <option value="India" className="bg-gray-900">India</option>
                                        <option value="Canada" className="bg-gray-900">Canada</option>
                                        <option value="Australia" className="bg-gray-900">Australia</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white dark:text-gray-900 border-b border-indigo-500/20 pb-4">Services Required</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        'Website Development',
                                        'WebApp Development',
                                        'App Development',
                                        'API Development',
                                        'Website Migration',
                                        'E-Commerce Site'
                                    ].map((projectOption) => (
                                        <label key={projectOption} className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${project.includes(projectOption) ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-white/5 dark:bg-black/5 border-white/10 dark:border-black/5 text-slate-400 dark:text-gray-600 hover:border-indigo-500/50'}`}>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                value={projectOption}
                                                checked={project.includes(projectOption)}
                                                onChange={() => handleProjectChange(projectOption)}
                                            />
                                            <span className="text-sm font-medium">{projectOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white dark:text-gray-900 border-b border-indigo-500/20 pb-4">Project Budget</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Less than $300', '$300 - $700', '$700 - $1000', 'More than $1000'].map((priceRange) => (
                                        <label key={priceRange} className={`flex items-center justify-center p-4 rounded-xl border transition-all cursor-pointer text-center ${price === priceRange ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/10' : 'bg-white/5 dark:bg-black/5 border-white/10 dark:border-black/5 text-slate-400 dark:text-gray-600 hover:border-indigo-500/50'}`}>
                                            <input
                                                type="radio"
                                                className="hidden"
                                                name="price"
                                                value={priceRange}
                                                checked={price === priceRange}
                                                onChange={handlePriceChange}
                                            />
                                            <span className="text-sm font-medium">{priceRange}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white dark:text-gray-900 border-b border-indigo-500/20 pb-4">Project Story</h3>
                                <textarea name="description" value={description} onChange={ev => setDescription(ev.target.value)} rows={4} placeholder="Tell me about your vision, goals, and any specific requirements..." className="w-full bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/5 rounded-xl px-4 py-3 text-white dark:text-gray-900 outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500" />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                                <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2">
                                    Send Message <GoProject className="animate-pulse" />
                                </button>
                                {messageOk && (
                                    <p className={`text-sm font-medium ${messageOk.includes('successfully') ? 'text-green-400' : 'text-indigo-400 animate-pulse'}`}>
                                        {messageOk}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}