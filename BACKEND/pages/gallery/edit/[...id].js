import Photo from "@/components/photo";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import {  BsPostcard } from "react-icons/bs";

export default function EditPhoto() {
    const router = useRouter();
    const { id } = router.query; // Extracting the id from the URL

    const [productInfo, setProductInfo] = useState(null);
 
    useEffect(() => {
        if (!id) {
            return; // Exit if no ID yet (router still loading)
        } else {
            axios.get(`/api/photos/?id=${id}`).then(response => {
                setProductInfo(response.data);
            }).catch(err => {
                console.error("Error fetching blog data: ", err);
            });
        }
    }, [id]); // Re-run effect when `id` changes

    if (!productInfo) return <p>Loading...</p>; // Show loading state while fetching

    return (
        <>
            <Head>
                <title>Update Blog</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{productInfo?.title || 'Photo'}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>

                    <div className="breadcrumb">
                        <BsPostcard />
                            <span>/</span> <span>Edit Blog</span>
                        
                    </div>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Photo {...productInfo}/>
                        )
                    }
                </div>
                
            </div>
        </>
    );
}
