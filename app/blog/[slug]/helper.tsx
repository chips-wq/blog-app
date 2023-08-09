import { promises as fs } from 'fs';
import remarkMath from 'remark-math';
import path from 'path';
import rehypeKatex from 'rehype-katex';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from "next/navigation"
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import remarkGfm from 'remark-gfm';

export type PostFrontmatter = {
    title: string,
    author: string,
    description: string,
    tags: Array<string>,
    date: Date
}

export function convertFrontmatterPrimitiveToObj(frontmatter: { [key: string]: any }): PostFrontmatter {
    const splitTags = frontmatter.tags.split(",")
    const jsDate = new Date(frontmatter.date);
    return { ...frontmatter, tags: splitTags, date: jsDate } as PostFrontmatter;
}

export const fileExists = async (path: string) => !!(await fs.stat(path).catch(e => false));

export async function getPost(slug: string) {


    const filePath = path.join(process.cwd(), 'content', slug + ".mdx")
    if (await fileExists(filePath) === false) {
        notFound();
    }
    const markdown = await fs.readFile(filePath, 'utf-8')


    const { content, frontmatter } = await compileMDX<{ [key: string]: any }>({
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

    return [content, convertFrontmatterPrimitiveToObj(frontmatter)] as const;
}