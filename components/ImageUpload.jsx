// image upload
"use client";
// Import necessary dependencies, including useState
import { useState } from 'react';

// Your ImageUpload component definition
export default function ImageUpload() {
    // State for managing the image file and image URL
    const [file, setFile] = useState(null);
    const [path, setPath] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('file', file);
        data.set('path', path);

        let result = await fetch("api/upload", {
            method: "POST",
            body: data,
        });
        result = await result.json();

        if (result.success) {
            alert("File uploaded");
            // Update the image URL state with the received URL
            setImageUrl(result.imageUrl);
        } else {
            alert("Error uploading file");
        }
        console.log(result);
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center relative bg-slate-400">
                <div className="image_upload bg-white p-5 w-full max-w-[400px] min-h-[300px] rounded-md flex flex-col justify-center items-center gap-5">
                    <h1 className="text-center font-medium text-2xl">Upload Image</h1>

                    <form action="" onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-5">

                        <input
                            className="input"
                            type="file"
                            name="file"
                            id=""
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                        <input className='input'
                            type="text"
                            name="path"
                            placeholder="image path"
                            value={imageUrl}  
                            onChange={(e) => setPath(e.target.value)}
                        />

                        <button className="btn w-full">Upload</button>
                    </form>
                </div>
            </div>
        </>
    );
}