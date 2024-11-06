import { useState, useEffect } from "react";
import { IoSettings } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`/api/photos`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photo');
                }
                const data = await response.json();
                setPhoto(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPhoto();
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!photo) return <p>Loading...</p>;

    // Find the photo with the title "Avatar Image"
    // Find any photo whose title contains "avatar" (case insensitive)
    const avatarPhoto = photo.find(pic => pic.title.toLowerCase().includes("avatar"));
    // console.log(avatarPhoto)

    return (
        <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Admin <span>Settings</span></h2>
                        <h3>Admin PANEL</h3>
                    </div>

                    <div className="breadcrumb">
                        <IoSettings /> <span>/</span> <span>Settings</span>
                    </div>
                </div>
                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        {/* <h2>{avatarPhoto ? avatarPhoto.title : "N/A"}</h2> */}
                        {avatarPhoto && avatarPhoto.images.length > 0 ? (
                            <img 
                            src={avatarPhoto.images[0]} 
                            // src=""
                            alt={avatarPhoto.title} 
                            />
                        ) : (
                            <p>No Avatar Image Available</p>
                        )}

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
