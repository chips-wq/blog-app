import { PostFrontmatter } from "./[slug]/page";
import slugify from "slugify";
import Link from "next/link";


export default function BlogClient({ frontmatterPosts }: {
    frontmatterPosts: Array<PostFrontmatter>
}
) {
    return <div>
        {frontmatterPosts.map((frontmatter, id) =>
            <article key={id} className="mt-3 border-2 p-3 rounded-md border-gray-800">
                <Link href={`/blog/${slugify(frontmatter.title.toLocaleLowerCase())}`}>
                    <h1 className="text-2xl font-bold mb-1">{frontmatter.title}</h1>
                    <p className="font-light">{frontmatter.description}</p>
                </Link>
            </article>
        )}
    </div>
}