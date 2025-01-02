import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume } from 'react-icons/fa'
import { FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from 'react-icons/md'
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

        <div className="contactpage">
            <div className="container_css">
                <div className="contactformp">
                    <div className="leftcontp">
                        <h2>Get in touch</h2>
                        <h2>Let's talk about your poject</h2>
                        <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                        <p>Use the form on this page or get in touch by other means.</p>
                        <p>We love questions and feedback - and we're always happy to help!</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume /> <span>Phone: <a href="tel:+9234*********" target="_blank">+92-34*********</a></span></li>
                                <li><MdAttachEmail /> <span>Email: <a href="mailto:nazeemkhanpk@gmail.com" target="_blank">nazeemkhanpk@gmail.com</a></span></li>
                                <li><GrLinkedin /> <span>LinkedIn: <a href="https://www.linkedin.com/in/nazeemkhannk/" target="_blank">nazeemkhannk</a></span></li>
                                <li><FaGithub /> <span>GitHub: <a href="https://github.com/naxim-khan" target="_blank">naxim-khan</a></span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="rightcontp">
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Your Contact Information</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="First Name" required />
                                <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Last Name" />
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Email" required />
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Company Name" required />
                                <input type="number" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone Number" required />

                                <select
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Country"
                                    required
                                    id="country"
                                >
                                    <option value="">Select Country</option>
                                    <option value="Palestine">Palestine ❤</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cabo Verde">Cabo Verde</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Eswatini">Eswatini</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia">Micronesia</option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="North Korea">North Korea</option>
                                    <option value="North Macedonia">North Macedonia</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestine">Palestine</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="South Sudan">South Sudan</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-Leste">Timor-Leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Vatican City">Vatican City</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>

                            <div className="rightconttitle">
                                <h2>What Services do you need for your Project?</h2>
                            </div>

                            <div className="rightcontcheckbox">
                                {[
                                    'Website Development',
                                    'WebApp Development',
                                    'App Development',
                                    'API Development',
                                    'Website Migration',
                                    'E-Commerce Site',
                                    'Performance Evaluation'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)}
                                        />
                                        {projectOption}  {/* Add label text here for clarity */}
                                    </label>
                                ))}
                            </div>



                            <div className="rightconttitle">
                                <h2>How much is the anticipated budget for your next project?</h2>
                            </div>
                            <div className="rightcontredio">
                                {
                                    ['Less than $300', '$300 - $700', '$700 - $1000', 'More than $1000'].map(
                                        (priceRange) => (
                                            <div className="radio-button" key={priceRange}>
                                                <input
                                                    type="radio"
                                                    className="radio"
                                                    id={priceRange}
                                                    name="price"
                                                    value={priceRange}
                                                    checked={price === priceRange}
                                                    onChange={handlePriceChange}
                                                />
                                                <label htmlFor={priceRange}>{priceRange}</label>
                                            </div>
                                        ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>Tell me about your project</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea name="description" value={description} onChange={ev => setDescription(ev.target.value)} rows={4} placeholder="Project Details"></textarea>
                            </div>
                            <hr/>
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Submit</button>
                                <p>{messageOk}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}