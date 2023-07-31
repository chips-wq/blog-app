import { promises as fs } from 'fs';
import path from 'path';
import ProjectCard from './components/ProjectCard';
import { ProjectCardsProps } from './components/ProjectCard';


async function getProjects() {
    const projectsDirectory = path.join(process.cwd(), 'app/projects-data')
    const filenames = await fs.readdir(projectsDirectory)

    console.log(filenames)

    const projects = await Promise.all(filenames.map(async (filename) => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')

        const projectData: ProjectCardsProps = JSON.parse(fileContents)
        projectData['date'] = new Date(projectData['date']);

        // Generally you would parse/transform the contents
        // For example you can transform markdown to HTML here

        return projectData
    }))

    console.log(projects)

    //console.log(projects)
    // // By returning { props: { posts } }, the Blog component
    // // will receive `posts` as a prop at build time
    // return {
    //     props: {
    //         posts: await Promise.all(posts),
    //     },
    // }
    return projects
}

export default async function Home() {

    const projects = await getProjects();

    return (
        <div>
            <div className='px-2 mt-24 flex flex-col items-center'>
                <div>
                    <h1 className='text-2xl sm:text-4xl font-bold p-1'>Sabou Ioan-Alexandru</h1>
                    <div className="border rounded-sm border-gray-600 w-full mb-3"></div>
                </div>
                <p className='sm:font-medium sm:text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor odio et eros suscipit blandit. Lorem ipsum dolor sit amet, consectetur adip  iscing elit. Fusce sed arcu fringilla, pulvinar lorem eu, mollis dui. Aenean sagittis egestas arcu. </p>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-2xl sm:text-4xl font-bold mt-24 mb-4'>Projects</h1>
                {/* do project cards here */}
                <div className='flex flex-row'>
                    {projects.map((project, i) => <ProjectCard key={i} {...project}></ProjectCard>)}
                </div>
            </div>
        </div>
    );
}
