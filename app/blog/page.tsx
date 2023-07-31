
import { promises as fs } from 'fs'

function getPosts() {

    console.log(process.cwd())
    //make this shit async
    return;
    // const files = fs.readdirSync(`${process.cwd()}/content/`);

    // const posts = files.map((filename) => {
    //     const markdownWithMetadata = fs
    //         .readFileSync(`content/${filename}`)
    //         .toString();

    //     const { data } = matter(markdownWithMetadata);

    //     const frontmatter = {
    //         ...data,
    //         date: data.date.toISOString(),
    //         filename: filename.replace(".mdx", ""),
    //     };

    //     frontmatter['author'] = frontmatter['author'] || 'Neo Wang'

    //     return {
    //         slug: filename.replace(".mdx", ""),
    //         frontmatter,
    //     };
    // });
}

export default function Blog() {

    return <div>
        blog homepage
    </div>
}