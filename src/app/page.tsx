"use client";
import Image from "next/image";
import React from "react";
import { SingleImageDropzone } from "@/components/SingleFile";
import { uploadAvatar } from "./actions";
export default function HomePage() {
    const [preview, setPreview] = React.useState("");
    const [percentage, setPercentage] = React.useState(0);
    const [file, setFile] = React.useState<File>();

    const handle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
            console.log("UpLoaded=", e.loaded);
            if (e.lengthComputable) {
                setPercentage(Math.round((e.loaded / e.total) * 100));
            }
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
                alert("Done!");
                setPercentage(0);
            } else {
                alert("Oops!");
                setPercentage(0);
            }
        };
        xhr.open("POST", "/api/upload");
        xhr.send(formData);
        // const res = await uploadAvatar(formData);
        // if (!res || !res.ok) {
        //     return alert("Something went wrong on server");
        // }
        // console.log(res.message);
    };
    const fileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview("");
            return;
        }
        setPreview(URL.createObjectURL(file));
    };
    const handle2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        if (!file) return;
        fd.append("image", file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");
        xhr.upload.onprogress = (e) => {
            setPercentage(Math.round((e.loaded * 100) / e.total));
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
                alert("Done");
            } else {
                alert("Oops");
            }
            setPercentage(0);
            setFile(undefined);
        };
        xhr.send(fd);
    };
    return (
        <div>
            <h1>Welcome</h1>
            <form
                className="flex flex-col gap-4 p-8 bg-slate-50 shadow-md rounded-md w-full max-w-4xl mx-auto"
                onSubmit={handle2}
                encType="multipart/form-data"
            >
                {/* {preview && (
                    <div className="relative h-[150px] w-[150px]">
                        <Image
                            src={preview}
                            fill={true}
                            alt="preview"
                            className="object-cover rounded-md"
                        />
                    </div>
                )}
                <input
                    onChange={fileChanged}
                    type="file"
                    name="image"
                    id="image"
                /> */}
                <SingleImageDropzone
                    height={200}
                    width={200}
                    value={file}
                    onChange={setFile}
                />
                {percentage > 0 && (
                    <div className="relative w-full h-2 bg-white border rounded-md overflow-hidden">
                        <div
                            className="bg-green-500 h-full transition-all duration-150 ease-in-out"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                )}
                <button
                    type="submit"
                    className="px-4 py-1 bg-violet-400 hover:bg-violet-600 rounded-md text-white"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}
