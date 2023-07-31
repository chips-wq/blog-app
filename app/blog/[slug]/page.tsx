import { promises as fs } from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { bundleMDX } from 'mdx-bundler';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { compileMDX } from 'next-mdx-remote/rsc';
import "katex/dist/katex.min.css";
import path from 'path';
import Head from 'next/head';

const components = {
    h1: (props: any) => (
        <h1 className="text-3xl">
            {...props.children}
        </h1>
    ),
}

async function getPost(slug: string) {
    const filePath = path.join(process.cwd(), 'content', slug + ".mdx")
    const markdown = await fs.readFile(filePath, 'utf-8')


    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: `---
      title: RSC Frontmatter Example
      ---
      # Hello World
      $x$
      This is from Server Components!
    `,
        components: components,
        options: {
            parseFrontmatter: true, mdxOptions: {
                remarkPlugins: [
                    //...(remarkPlugins ?? []),
                    // [remarkTocHeadings, { exportRef: toc }],
                    // remarkGfm,
                    // remarkCodeTitles,
                    remarkMath,
                ],
                rehypePlugins: [
                    // ...(options.rehypePlugins ?? []),
                    // @ts-ignore
                    // rehypeSlug,
                    // // @ts-ignore
                    // rehypeAutolinkHeadings,
                    // // @ts-ignore
                    rehypeKatex,
                    // // @ts-ignore
                    // [rehypePrismPlus, { ignoreMissing: true }],
                ],
            }
        },
    })

    // let { frontmatter, code } = await bundleMDX({
    //     source: markdown,
    //     // mdx imports can be automatically source from the components directory
    //     cwd: path.join(process.cwd(), "components"),
    //     mdxOptions(options) {
    //         // this is the recommended way to add custom remark/rehype plugins:
    //         // The syntax might look weird, but it protects you in case we add/remove
    //         // plugins in the future.
    //         return options;
    //     },
    //     // esbuildOptions: (options: any) => {
    //     //     options.loader = {
    //     //         ...options.loader,
    //     //         ".js": "jsx"
    //     //     };
    //     //     return options;
    //     // },
    // });

    //fs.readFile(process)
    //console.log(process.cwd())
    return content;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const mdxSource = await getPost(params.slug);

    return <div>
        <h1>My Post: {params.slug}</h1>
        {mdxSource}
    </div>
}
