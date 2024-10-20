"use client";
import React from "react";
import { createPost } from "../actions";

export default function Dummy() {
    const ref = React.useRef<HTMLInputElement>(null);
    const handle = async () => {
        if (!ref.current || !ref.current.files) return;

        const { formData, postURL } = await createPost();
        const fd = new FormData();
        Object.keys(formData).forEach((k) => {
            fd.append(k, formData[k]);
        });
        fd.append("file", ref.current?.files?.[0]);
        console.log({ postURL, fd });
        const xhr = new XMLHttpRequest();
        xhr.open("POST", postURL, true);
        xhr.upload.onprogress = (e) => {
            console.log(Math.round((e.loaded * 100) / e.total));
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert("Done");
            } else {
                alert("Ooops");
                console.log({ xhr });
            }
        };
        xhr.send(fd);
    };
    return (
        <div>
            <input type="file" ref={ref} />
            <button onClick={handle}>Upload</button>
        </div>
    );
}
