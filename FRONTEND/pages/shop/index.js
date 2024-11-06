import { useState } from "react";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function shop() {

    const { alldata, loading } = useFetchData('/api/shops')
    const publisheddata = alldata.filter(ab => ab.status === 'publish');

    
    // Format Date
    const formatDate = (date) => {
        // check if date if valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12 hour format
        }

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return <>

        <Head>
            <title>Shop</title>
        </Head>
        <div className="shoppage">
            <div className="shoppagetoptitle">
                <div className="container_css">
                    <h3>SHOP ONLINE</h3>
                    <h2>OUR PRODUCTS</h2>
                </div>
            </div>
            <div className="shopproducts">
                <div className="container_css">
                    <div className="shopprocards">
                        {loading ? <Spinner /> : <>
                            {publisheddata.map((pro) => {
                                return <Link href={`/shop/${pro.slug}`} className="spprocard">
                                    <div className="spprocardimg">
                                        <img src={pro.images[0]} alt={pro.title} />
                                    </div>
                                    <div className="spprocinfo">
                                        <h2>{pro.title}</h2>
                                        <h3>{pro.price}</h3>
                                        <div className="spprotags">
                                            {pro.tags.map((tag) => {
                                                return <span key={tag}>{tag}</span>
                                            })}
                                        </div>
                                        
                                    </div>
                                    <p>{formatDate(pro.createdAt? new Date(pro && pro?.createdAt) : null)}</p>
                                </Link>

                            })}
                        </>}
                    </div>

                </div>
            </div>
        </div>
    </>
}