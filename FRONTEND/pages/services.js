import Head from "next/head";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

export default function services() {
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
            <div className="centerservices">
                <div className="container_css">
                    <div className="cservicesbox">
                        {/* box 1 */}
                        <div className="csservice">
                            <span>01</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        {/* box 2 */}
                        <div className="csservice">
                            <span>02</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        {/* box 3 */}
                        <div className="csservice">
                            <span>03</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        {/* box 4 */}
                        <div className="csservice">
                            <span>04</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        {/* box 5 */}
                        <div className="csservice">
                            <span>05</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        {/* box 6 */}
                        <div className="csservice">
                            <span>06</span>
                            <div>
                                <h2>Web Deveopment</h2>
                                <img src="/img/website_icon.svg" alt="website icon" />
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing.</li>
                                <li>Quality maintenance, updates, and bug fixes.</li>
                            </ul>

                            <p>I am very good in web development offering services, i offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pricingplansec">
                <div className="container_css">
                    <div className="pricingtitles text-center">
                        <h3><img src="/img/chevron_right.png" alt="chevron" />PRICING PLAN</h3>
                        <h3>Pricing My Work</h3>
                    </div>

                    <div className="pricingcards">
                        <div className="pricingcard">
                            <h4>Basic Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$29.00 <span>Monthly</span></h2>
                            <Link href="/contact"> <button>Get Start Now</button></Link>
                            <div>
                                <h5>Lite includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful Admin Panel</li>
                                    <li><IoMdCheckmark /> 1 Native webApp</li>
                                    <li><HiXMark /> Multi-language support</li>
                                    <li><HiXMark /> 1 Native webApp</li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div className="pricingcard">
                            <h4>Premium Plan</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$59.00 <span>Monthly</span></h2>
                            <Link href="/contact"> <button>Get Start Now</button></Link>
                            <div>
                                <h5>Lite includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful Admin Panel</li>
                                    <li><IoMdCheckmark /> 1 Native webApp</li>
                                    <li><HiXMark /> Multi-language support</li>
                                    <li><HiXMark /> 1 Native webApp</li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div className="pricingcard">
                            <h4>Standard</h4>
                            <p>Perfect Choice for individual</p>
                            <h2>$79.00 <span>Monthly</span></h2>
                            <Link href="/contact"> <button>Get Start Now</button></Link>
                            <div>
                                <h5>Lite includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark /> Powerful Admin Panel</li>
                                    <li><IoMdCheckmark /> 1 Native webApp</li>
                                    <li><IoMdCheckmark /> Multi-language support</li>
                                    <li><IoMdCheckmark /> 1 Native webApp</li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>
}