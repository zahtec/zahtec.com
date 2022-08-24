import Skill from '../components/skills/Skill';
import Head from 'next/head';

export type StoredSkill = {
    name: string;
    fullName: string;
    desc: string;
    fontaw?: string;
    color: string[];
    fontawPrefix?: string;
    hasProjects?: boolean;
};

export function getStaticProps(): { props: { skills: StoredSkill[] } } {
    return {
        props: {
            skills: [
                {
                    name: 'python',
                    fullName: 'Python',
                    desc: 'Python is a systems high-level programming language primarily used for data science and machine learning. I have used it myself for these tasks and its plethora of libraries make it exceedingly intuitive.',
                    fontaw: 'python',
                    color: ['from-teal', 'to-teal-dark', 'border-teal']
                },
                {
                    name: 'node',
                    fullName: 'Node.js',
                    desc: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is intended to be used as a platform for building fast, scalable network applications.",
                    fontaw: 'node-js',
                    color: ['from-green', 'to-green-dark', 'border-green']
                },
                {
                    name: 'docker',
                    fullName: 'Docker',
                    desc: 'Docker is a containerization platform that provides a secure, portable, and efficient way to run applications on any server without having to install anything but itself.',
                    fontaw: 'docker',
                    color: ['from-blue', 'to-blue-dark', 'border-blue']
                },
                {
                    name: 'nextjs',
                    fullName: 'Next.js',
                    desc: 'Next.js is a server-side webserver library built ontop of Node.js used in conjunction with React. It is used to generate server-side rendered pages or serve static pre-rendered files. This portfolio uses Next.js!',
                    color: ['from-magenta', 'to-magenta-dark', 'border-magenta']
                },
                {
                    name: 'react',
                    fullName: 'React',
                    desc: 'React is a JavaScript library for building user interfaces easily and quickly. It also helps by using something called components to reduce repeated code. I used it for this portfolio.',
                    fontaw: 'react',
                    color: ['from-purple', 'to-purple-dark', 'border-purple']
                },
                {
                    name: 'tailwind',
                    fullName: 'Tailwind',
                    desc: 'Tailwind is a CSS framework that helps you build websites without having to manage css. It is a collection of CSS utility classes and components that help you build a beautiful and responsive websites.',
                    color: ['from-red', 'to-red-dark', 'border-red']
                },
                {
                    name: 'html',
                    fullName: 'HTML',
                    desc: 'HTMl is the structure for frontend website, its a basic structurual language that outlines your website.',
                    fontaw: 'html5',
                    color: ['from-orange', 'to-orange-dark', 'border-orange']
                },
                {
                    name: 'css',
                    fullName: 'CSS',
                    desc: 'CSS is a cascading language for styling frontend web pages, it combined with HTML can make basic static web pages that give the use a pleasent UI experience (if used correctly).',
                    fontaw: 'css3',
                    color: ['from-blue', 'to-blue-dark', 'border-blue']
                },
                {
                    name: 'js',
                    fullName: 'JavaScript/TypeScript',
                    desc: 'JavaScript is an object-oriented high-level programming language primarily used for the frontend resposiveness and interactive UX of websites. Typescript is a superset of JavaScript adding typing functionality.',
                    fontaw: 'js-square',
                    color: ['from-yellow', 'to-yellow-dark', 'border-yellow']
                },
                {
                    name: 'deno',
                    fullName: 'Deno',
                    desc: 'Deno is a counterpart to Node.js and was even made by the same person. It focuses on being runtime secure by default and lightweight while provided libraries without using a big folder such as node_modules.',
                    hasProjects: false,
                    color: ['from-brown', 'to-brown-dark', 'border-brown']
                }
            ]
        }
    };
}

export default function Projects({ skills }: { skills: StoredSkill[] }) {
    return (
        <>
            <Head>
                <title>Skills</title>
                <meta name="description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my skills!" />

                <meta name="og:title" content="Skills" />
                <meta name="og:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my skills!" />

                <meta name="twitter:title" content="Skills" />
                <meta name="twitter:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my skills!" />
            </Head>
            <main className="pt-32">
                {skills.map(skill => {
                    return <Skill {...skill} key={skill.name} />;
                })}
            </main>
        </>
    );
}
