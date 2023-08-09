import "./github.dark.min.css"
import "katex/dist/katex.min.css";
import type { Metadata, ResolvingMetadata } from 'next'
import path from "path";
import { promises as fs } from 'fs';
import { fileExists, getPost } from "./helper";
import matter from "gray-matter";
import slugify from "slugify";
import Tag from "./PostTag";
import PostTag from "./PostTag";

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug


    const filePath = path.join(process.cwd(), 'content', slug + ".mdx")
    if (await fileExists(filePath) === false) {
        return {
            title: "this file doesn't exist",
            description: "report this somewhere"
        }
    }

    const fileStr = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileStr)


    return {
        title: data.title,
        description: data.description,
        category: data.tags,
    }
}

export async function generateStaticParams() {
    const projectsDirectory = path.join(process.cwd(), 'content')
    const filenames = await fs.readdir(projectsDirectory)

    return filenames.map(filename => ({ slug: filename.replace(".mdx", "") }))
}


export default async function BlogPost({ params, searchParams }: Props) {

    const [compiledMdx, frontmatter] = await getPost(params.slug);

    return (
        <div>
            <h1 className='text-3xl lg:text-5xl border-b-4 inline-block border-blue-500 my-4 font-bold'>{frontmatter.title}</h1>
            <div className="flex mb-1 gap-2">
                {frontmatter.tags.map((tag, id) => <PostTag key={id} text={tag} />)}
            </div>
            <p className='text-base font-light mb-4 text-gray-400'>{frontmatter.date.toDateString()} \ {frontmatter.author}</p>
            <div className='prose prose-invert max-w-4xl mx-auto md:text-lg prose-pre:bg-gray-800 prose-code:!bg-gray-800 prose-p:text-gray-100'>
                {compiledMdx}
            </div>
        </div>
    )
}
