import Photo from "@/components/photo"
import { BiLogoBlogger } from 'react-icons/bi'
export default function Addblog() {



    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Photo</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>

                <div className="breadcrumb">
                    <BiLogoBlogger /> <span>/</span> <span>Add Photos</span>
                </div>
            </div>

            <div className="blogsadd">
                <Photo />
            </div>
        </div>
    </>
}