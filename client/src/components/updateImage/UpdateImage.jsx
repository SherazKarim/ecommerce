import React, { useState } from 'react';
import { newRequest } from '../utills/newRequest';
import { useAuth } from '../../pages/api/api';
import { upload } from '../utills/upload';
import { useNavigate } from 'react-router-dom';
const UpdateImage = ({ setOpenDropdown, profile, userImage }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { logOut } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate()
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Preview the selected image
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImagePreview(null);
        }
    };

    const userid = profile?._id ? profile?._id : profile?.user?._id

    const handleSubmit = async () => {
        if (!file) return;
        const url = await upload(file);

        try {
            const res = await newRequest.put(`auth/updateImage/${userid}`, {
                img: url,
            });
            console.log(res)
            const { image, authSource } = res.data.userUpdate;
            if (authSource === "google") {
                const updateLocalStorage = { ...profile, image: image }
                localStorage.setItem("profileData", JSON.stringify(updateLocalStorage))
            } else {
                const {user} = profile
                const updateLocalStorage = { ...user, image: image }
                localStorage.setItem("currentUser", JSON.stringify(updateLocalStorage))
            }
            setOpenDropdown(false)
        } catch (err) {
            console.log("server error", err);
        }
    };

    const handleLogout = () => {
        if (currentUser) {
            localStorage.removeItem('currentUser');
            navigate("/")
        } else {
            logOut();
        }
        setOpenDropdown(false)
    };

    return (
        <div className="absolute right-0 mt-3 flex flex-col justify-center shadow bg-white z-[100] rounded-[5px] transition-all ease-in duration-300 w-[180px] h-[180px] p-4">
            <div className="flex flex-col items-center justify-center">
                <div className="group relative flex flex-col justify-center items-center">
                    {imagePreview ? (
                        <img className="h-16 w-16 rounded-full" src={imagePreview} alt="Selected" />
                    ) : userImage? (
                        <img className="h-16 w-16 rounded-full" src={userImage} alt="" />
                    ) : (
                        <h1 className="w-16 h-16 rounded-full bg-gray-300 text-xl font-[600] flex justify-center items-center">{profile?.user?.name.slice(0, 1)}</h1>
                    )}
                    <div className="absolute top-0 left-[50%] -translate-x-[50%] hidden group-hover:flex justify-center items-center h-16 w-16 bg-gray-300/[0.30] rounded-full text-white text-xl ">
                        <label htmlFor="image" className="absolute text-center flex justify-center items-center h-16 w-16 rounded-full cursor-pointer text-sm">
                            Upload
                        </label>
                        <input className="h-16 w-16 rounded-full cursor-pointer opacity-0" type="file" valu id="image" onChange={handleChange} />
                    </div>
                    {/* Move the button inside the form element */}
                   {imagePreview && <button type="button" onClick={handleSubmit} className="border text-sm px-2 py-1 mt-3 rounded-full hover:bg-red-600 transition-colors ease-in duration-200 hover:text-white">
                        Update Image
                    </button>}
                </div>
                <h3>{profile?.name || profile?.user?.name}</h3>
            </div>
            <button className="border px-5 py-1 mt-3 rounded-full hover:bg-red-600 transition-colors ease-in duration-200 hover:text-white" onClick={handleLogout}>
                Log out
            </button>
        </div>
    );
};

export default UpdateImage;
