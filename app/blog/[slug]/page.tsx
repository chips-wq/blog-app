import { promises as fs } from 'fs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from "next/navigation"
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import remarkGfm from 'remark-gfm';
import "./github.dark.min.css"
import "katex/dist/katex.min.css";
import path from 'path';

type PostFrontmatter = {
    title: string,
    author: string,
    description: string,
    tags: string,
    date: Date
}

async function getPost(slug: string) {
    const fileExists = async (path: string) => !!(await fs.stat(path).catch(e => false));


    const filePath = path.join(process.cwd(), 'content', slug + ".mdx")
    if (await fileExists(filePath) === false) {
        notFound();
    }
    const markdown = await fs.readFile(filePath, 'utf-8')


    const { content, frontmatter } = await compileMDX<PostFrontmatter>({
        source: markdown,
        options: {
            parseFrontmatter: true, mdxOptions: {
                remarkPlugins: [
                    // [remarkTocHeadings, { exportRef: toc }],
                    remarkGfm,
                    // remarkCodeTitles,
                    remarkMath,
                ],
                rehypePlugins: [
                    rehypeSlug,
                    rehypeAutolinkHeadings,
                    rehypeKatex,
                    rehypeHighlight,
                ],
            }
        },
    })

    return [content, frontmatter] as const;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const [compiledMdx, frontmatter] = await getPost(params.slug);

    return (
        <div>
            <h1 className='text-3xl lg:text-5xl border-b-4 inline-block border-blue-500 my-4 font-bold'>{frontmatter.title}</h1>
            <p className='text-base font-light mb-4'>Authors: {frontmatter.author}</p>
            <div className='prose prose-invert max-w-none prose-pre:bg-gray-800 prose-code:!bg-gray-800'>
                {compiledMdx}
            </div>
        </div>
    )
}
