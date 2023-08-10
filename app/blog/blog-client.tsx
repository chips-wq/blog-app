"use client"

import { PostFrontmatter } from "./[slug]/helper";
import slugify from "slugify";
import Link from "next/link";
import PostTag from "./[slug]/PostTag";


export default function BlogClient({ frontmatterPosts }: {
    frontmatterPosts: Array<PostFrontmatter>
}
) {
    return <div>
        {frontmatterPosts.map((frontmatter, id) =>
            <article key={id} className="mt-3 border-2 p-3 rounded-md border-gray-800">
                <Link href={`/blog/${slugify(frontmatter.title.toLocaleLowerCase())}`}>
                    <h1 className="text-3xl font-bold mb-1">{frontmatter.title}</h1>
                    <p className='text-sm font-light mb-1 text-gray-400'>{frontmatter.date.toDateString()} by {frontmatter.author}</p>
                    <div className="flex gap-2 mb-1 flex-wrap">
                        {frontmatter.tags.map((tag, id) => <PostTag key={id} text={tag} />)}
                    </div>
                    <p className="text-lg">{frontmatter.description}</p>
                </Link>
            </article>
        )}
    </div>
}