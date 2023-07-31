import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="">
            <div className="py-3 flex flex-row justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl sm:text-4xl">chipswq</h1>
                </Link>
                <div className="flex gap-4 items-center text-lg">
                    <Link href="https://github.com/chips-wq" target="_blank"><Image src="/github-white.svg" width="30" height="30" alt="github-svg"></Image></Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="">Projects</Link>
                </div>
            </div>
        </div>);
}