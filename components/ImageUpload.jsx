// image upload
"use client";
import { useState } from "react";

export default function ImageUpload(){

    const [file, setFIle] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(file);

        const data = new FormData();
        data.set('file', file);
        let result = await fetch("api/upload", {
            method: "POST",
            body: data,
        });
        result = await result.json();
        if(result.success){
            alert("file uploaded");
        }
        console.log(result);

    }

    return(
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center relative bg-slate-400">
                <div className="image_upload bg-white p-5 w-full max-w-[400px] min-h-[300px] rounded-md flex flex-col justify-center items-center gap-5">
                <h1 className="text-center font-medium text-2xl">Upload Image</h1>

                <form action="" onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-5">

                    <input className="input" type="file" name="fle" id="" 
                    onChange={(e) => setFIle(e.target.files?.[0])}
                    />
                    
                    <button className="btn w-full">Upload</button>
                </form>
                </div>
            </div>
        </>
    )
}