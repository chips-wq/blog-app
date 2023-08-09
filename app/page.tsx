import { promises as fs } from 'fs';
import path from 'path';
import ProjectCard from './components/ProjectCard';
import { ProjectCardsProps } from './components/ProjectCard';
import Link from 'next/link';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "chipswq Blog",
    description: "Articles about Computer Science, Software Engineering, Philosophy or any other topics I am interested in.",
}

async function getProjects() {
    const projectsDirectory = path.join(process.cwd(), 'app/projects-data')
    const filenames = await fs.readdir(projectsDirectory)


    const projects = await Promise.all(filenames.map(async (filename) => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')

        const projectData: ProjectCardsProps = JSON.parse(fileContents)
        projectData['date'] = new Date(projectData['date']);

        return projectData
    }))

    return projects
}

export default async function Home() {

    const projects = await getProjects();

    return (
        <div>
            <div className='mt-24 flex flex-col '>
                <div className='self-center'>
                    <h1 className='text-2xl sm:text-4xl font-bold p-1'>Sabou Ioan-Alexandru</h1>
                    <div className="border rounded-sm border-gray-600 w-full mb-3"></div>
                </div>
                <p className='sm:font-medium sm:text-lg'>I am studying <strong className='font-bold'>Computer Science</strong> at <Link href="https://acs.pub.ro/" className='font-bold border-b border-blue-600'>University Politehnica of Bucharest</Link>. I am interested in a wide variety of topics, ranging from algorithms to web development and even operating systems.</p>
                <br />
                <p className='sm:font-medium sm:text-lg'>I created this page in order to have an archive of blog posts of different topics. Below are some of my projects, I worked on in my free time.</p>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-2xl sm:text-4xl font-bold mt-24 mb-4'>Projects</h1>
                {/* do project cards here */}
                <div className='flex flex-row gap-5 flex-wrap lg:flex-nowrap'>
                    {projects.map((project, i) => <ProjectCard key={i} {...project}></ProjectCard>)}
                </div>
            </div>
        </div>
    );
}
