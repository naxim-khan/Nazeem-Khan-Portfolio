import { useState } from "react"
import { RiBarChartHorizontalLine } from "react-icons/ri"
import { BiExitFullscreen } from 'react-icons/bi'
import { GoScreenFull } from 'react-icons/go'
import LoginLayout from "./LoginLayout"
import { useSession } from "next-auth/react"

export default function Header({ handleAsideOpen }) {
    const [isFullScreen, setIsFullScreen] = useState(false)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            // Request full screen on the document element
            document.documentElement.requestFullscreen().then(() => {
                setIsFullScreen(true);
            }).catch((err) => {
                console.error("Error attempting to enable full-screen mode:", err);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullScreen(false);
            }).catch((err) => {
                console.error("Error attempting to exit full-screen mode:", err);
            });
        }
    };

    const {data:session} = useSession()

    if(session){
        return <>
        <LoginLayout>
            <header className="header flex flex-sb">
                <div className="logo flex gap-2">
                    <h1>ADMIN</h1>
                    <div className="headerham flex flex-center" onClick={handleAsideOpen}>
                        <RiBarChartHorizontalLine />

                    </div>
                </div>

                <div className="rightnav flex gap-2">
                    {/* full screen toggle */}
                    <div onClick={toggleFullScreen}>
                        {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                    </div>
                    {/* notification Image */}
                    <div className="notification">
                        <img src="/img/notification.png" alt="notification"></img>
                    </div>

                    <div className="profilenav">
                        <img src="/img/user.png" alt="user"></img>
                    </div>
                </div>

            </header>
        </LoginLayout>
    </>
    }
    
}