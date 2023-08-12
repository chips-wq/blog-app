import Image from "next/image";
import Link from "next/link";

export interface ProjectCardsProps {
    title: string,
    description: string,
    icon: string,
    date: Date,
    alt: string,
    link: string,
}

export default function ProjectCard({ title, description, icon, date, alt, link }: ProjectCardsProps) {

    return <div className="flex flex-col gap-1 p-6 border-4 border-gray-800 rounded-xl h-full justify-between w-full lg:w-1/3">
        <Link href={link}>
            <div className="flex flex-row justify-between gap-6 items-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Image src={icon} width="36" height="30" alt={alt}></Image>
            </div>
            <p className="text-gray-400 font-light text-sm">First commit: {date.toDateString()}</p>
            <p className="">{description}</p>
        </Link>
        {/* <div className="w-14 h-14 rounded-full bg-secondary self-center flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-200" height="48" viewBox="0 -960 960 960" width="48"><path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z" /></svg>
            </div> */}
    </div>
}