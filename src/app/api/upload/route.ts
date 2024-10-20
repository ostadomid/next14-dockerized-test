import { promises as fs } from "fs";
import { join } from "path";

export async function POST(req: Request) {
    const fd = await req.formData();
    const file = fd.get("image") as File;
    if (file && file.size > 0 && file.type.toLowerCase().startsWith("image/")) {
        const where = join(process.cwd(), "./public/");
        console.log("Where=", where);
        try {
            await fs.writeFile(
                `${where}BOB-${file.name}`,
                Buffer.from(await file.arrayBuffer())
            );
            return Response.json({ ok: true, message: "Saved successfully" });
        } catch (error) {
            console.log(error);
            return Response.json({
                ok: false,
                message: "Something went wrong on server",
            });
        }
    } else {
        return Response.json({ ok: false, message: "No image selected" });
    }
}
