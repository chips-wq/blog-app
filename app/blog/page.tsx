import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostFrontmatter } from "./[slug]/page"
import BlogClient from './blog-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "chipswq Blog",
    description: "Articles about Computer Science, Software Engineering or any topics I am interested in",
}

async function getPosts() {
    const postsPath = path.join(process.cwd(), 'content');

    const postsPathsArr = (await fs.readdir(postsPath)).map(postname => path.join(postsPath, postname))

    const postsString = await Promise.all(postsPathsArr.map(async (post) => await fs.readFile(post, 'utf-8')))

    const frontmatterPosts = postsString.map(post => matter(post).data) as Array<PostFrontmatter>


    return frontmatterPosts
}

export default async function Blog() {

    const frontmatterPosts = await getPosts();


    return <BlogClient frontmatterPosts={frontmatterPosts}></BlogClient>
}