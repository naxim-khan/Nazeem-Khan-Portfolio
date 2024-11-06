import Head from "next/head";
import axios from "axios";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
export default function DeleteProduct() {
    const router = useRouter();
    const { id } = router.query; // Extracting the id from the URL

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return; // Exit if no ID yet (router still loading)
        } else {
            axios.get(`/api/blogs/?id=${id}`).then(response => {
                setProductInfo(response.data);
            }).catch(err => {
                console.error("Error deleting blog: ", err);
            });
        }
    }, [id]); // Re-run effect when `id` changes

    function goBack() {
        router.push('/blogs')
    }

    async function deleteBlog() {
        await axios.delete('/api/blogs?id=' + id)
        toast.success('fetched Successfully...!')
        goBack();
    }

    return <>
        <Head>
            <title>Deleted Blog</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete (<span>{productInfo?.title || 'Blog'}</span>)</h2>
                    <h3>ADMIN PANEL</h3>
                </div>

                <div className="breadcrumb">
                    <BsPostcard />
                    <span>/</span> <span>Delete Blog</span>

                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M3 6h18M5 6V4h14v2M7 6v14h10V6H7zm1 2h8v10H8V8zm2 4h1v4h-1v-4zm4 0h1v4h-1v-4z" />
                        <path d="M12 10v2M12 16v2" />
                        <path d="M12 12h0v-2" fill="black" />
                    </svg>

                    <p className="cookieHeading">Are You Sure?</p>
                    <p className="cookieDescription">If you delete this website content it will be permenent delete your content.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    </>
}