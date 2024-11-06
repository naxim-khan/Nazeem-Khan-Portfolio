import Project from "@/components/Project";
import { BiLogoBlogger } from "react-icons/bi";

export default function Addproject() {

    return <>
     <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Project</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>

                <div className="breadcrumb">
                    <BiLogoBlogger /> <span>/</span> <span>add project</span>
                </div>
            </div>

            <div className="blogsadd">
                <Project />
            </div>
        </div>
    </>
}