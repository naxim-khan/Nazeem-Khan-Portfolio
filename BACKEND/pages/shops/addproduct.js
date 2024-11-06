import Product from "@/components/Shop"
import { BiLogoBlogger } from 'react-icons/bi'
export default function Addblog() {



    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Products</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>

                <div className="breadcrumb">
                    <BiLogoBlogger /> <span>/</span> <span>Add Products</span>
                </div>
            </div>

            <div className="blogsadd">
                <Product />
            </div>
        </div>
    </>
}