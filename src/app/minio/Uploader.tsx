"use client";
import React from "react";
import { createSignedURL } from "../actions";
export default function Uploader() {
    const [preview, setPreview] = React.useState("");
    const inpRef = React.useRef<HTMLInputElement>(null);

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const uploadit = async () => {
        if (!inpRef.current?.files?.length) return;
        const { url } = await createSignedURL();
        // const fd = new FormData();
        // const u = new URL(url);

        // fd.append("file", inpRef.current.files[0]);
        // u.searchParams.forEach((v, k) => {
        //     fd.append(k, v);
        // });
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        // xhr.setRequestHeader("Content-Type", inpRef.current.files[0].type);
        console.log(`Uploading to ${url}`);
        xhr.onload = () => {
            if (xhr.status == 200) {
                alert("Done");
            } else {
                alert("Oops");
                console.log({ xhr });
            }
        };
        xhr.upload.onprogress = (e) => {
            console.log(Math.round((e.loaded * 100) / e.total));
        };
        xhr.onerror = (e) => {
            console.log(e);
        };
        xhr.send(inpRef.current.files[0]);
    };
    return (
        <div>
            <h1>Choose a file</h1>
            <input type="file" ref={inpRef} onChange={handle} />
            <button
                className="px-4 py-1 bg-green-400 rounded-md"
                type="button"
                onClick={uploadit}
            >
                Upload
            </button>
            {preview && (
                <img
                    alt="preview"
                    src={preview}
                    width="150px"
                    className="object-cover"
                />
            )}
        </div>
    );
}
