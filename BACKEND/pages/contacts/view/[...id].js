// Contactview.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IoSettings } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";


export default function Contactview() {
    const router = useRouter();
    const { id } = router.query; // Extracting the id from the URL

    const [productInfo, setProductInfo] = useState(null);
 
    useEffect(() => {
        if (!id) {
            return; // Exit if no ID yet (router still loading)
        } else {
            axios.get(`/api/contacts/?id=${id}`).then(response => {
                setProductInfo(response.data);
            }).catch(err => {
                console.error("Error fetching blog data: ", err);
            });
        }
    }, [id]); // Re-run effect when `id` changes

    if (!productInfo) return <p>Loading...</p>;


    return (
        <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Admin <span>Contacts</span></h2>
                        <h3>Admin PANEL</h3>
                    </div>

                    <div className="breadcrumb">
                        <IoSettings /> <span>/</span> <span>Contacts</span>
                    </div>
                </div>
                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <div className="w-100">
                            <div className="flex flex-sb flex-left mt-2">
                                <h2>My Profile:</h2>
                                <h3>Nazeem Khan <br />Web Developer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" defaultValue={"+923433333331"}/>
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue={"nazeemkhanpk@gmail.com"}/>
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Save</button>
                            </div>
                        </div>
                    </div>

                    <div className="rightlogoutsec">
                    <div className="topaccountbox">
                        <h2 className="flex flex-sb">My Account <MdOutlineAccountCircle /></h2>
                        <hr />
                        <div className="flex flex-sb mt-1">
                            <h3>Active Account <br /><span>Email</span></h3>
                            <button>Log Out</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
