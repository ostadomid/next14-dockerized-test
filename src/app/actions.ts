"use server";

import { promises as fs } from "fs";
import { join } from "path";
import { client } from "./minio-client";
import { PostPolicyResult } from "minio";
export async function uploadAvatar(data: FormData) {
    const image = data.get("image") as File;
    if (
        image &&
        image.size > 0 &&
        image.type.toLowerCase().startsWith("image/")
    ) {
        const where = join(process.cwd(), "./public/");
        console.log("Where=", where);
        try {
            await fs.writeFile(
                `${where}BOB-${image.name}`,
                Buffer.from(await image.arrayBuffer())
            );
            return { ok: true, message: "Saved successfully" };
        } catch (error) {
            console.log(error);
            return { ok: false, message: "Something went wrong on server" };
        }
    }
    return { ok: false, message: "No image selected" };
}

export async function createSignedURL() {
    const url = await client.presignedPutObject("dev", "my-avatar.jpg", 3600);
    console.log(`[Server] signedURL = ${url}`);
    return { url };
}

export async function createPost() {
    const p = client.newPostPolicy();
    p.setBucket("dev");
    p.setKey("avatar.jpg");
    p.setContentType("image/*");
    const exp = new Date();
    exp.setDate(exp.getDate() + 10);
    p.setExpires(exp);
    const { formData, postURL }: PostPolicyResult =
        await client.presignedPostPolicy(p);

    return { postURL, formData };
}
