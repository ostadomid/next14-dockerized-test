import Image from "next/image";

const IMAGES = Array.from({ length: 28 }, (_, k) => `sample (${k + 1}).jpg`);
export default function Home() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen w-full mx-auto max-w-5xl bg-green-300 p-4">
            {IMAGES.map((e) => (
                <div key={e} className="relative w-full h-[200px]">
                    <Image
                        src={`/${e}`}
                        alt={`Sample #${e}`}
                        fill={true}
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}
