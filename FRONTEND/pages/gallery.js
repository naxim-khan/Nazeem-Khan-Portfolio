import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";


export default function gallery() {

    const {alldata, loading } = useFetchData('/api/photos')


    return <>
        <Head>
            <title>Nazeem-Khan: Gallery Photos</title>
        </Head>

        <div className="gallerypage">
            <div className="container_css">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4>NAZEEM KHAN GALLERY PHOTOS</h4>
                            <h1>Nazeem's <br /> Photographs</h1>
                            <Link href={'/gallery#galleryimages'}>
                                <button>VIEW MORE</button>
                            </Link>
                        </div>
                        <div className="rightimgsec">
                            <img src="/img/nazeem.jpg" alt="" />
                            <div className="r_imge_top">
                                <img src="https://i.pinimg.com/564x/b0/aa/0e/b0aa0efb3d3c229ef4adf21062795a21.jpg"/>
                            </div>
                            <div className="r_img_top">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container_css">
                    <div className="gbtmtitles text-center_css">
                        <h3><span>01//</span> OUR PORTFOLIO</h3>
                        <h2>Nazeem's capture <span>All of your</span> <br /> beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner/> :<>
                            {alldata.map((photo)=>{
                                return <div className="image-item">
                                    <img src={photo.images[0]} alt="" />
                                </div>
                            })}
                        </>}
                       
                    </div>
                </div>
            </div>
        </div>
    </>
}