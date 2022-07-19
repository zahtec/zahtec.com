import Skill from '../components/skills/Skill';
import { useEffect } from 'react';
import Head from 'next/head';

export type StoredSkill = {
    name: string;
    fullName: string;
    desc: string;
    fontaw?: string;
    fontawPrefix?: string;
    hasProjects?: boolean;
};

export function getStaticProps() {
    return {
        props: {
            skills: [
                {
                    name: 'python',
                    fullName: 'Python',
                    desc: 'Python is a systems high-level programming language primarily used for data science and machine learning. I have used it myself for these tasks and its plethora of libraries make it exceedingly intuitive.',
                    fontaw: 'python',
                },
                {
                    name: 'node',
                    fullName: 'Node.js',
                    desc: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is intended to be used as a platform for building fast, scalable network applications.",
                    fontaw: 'node-js',
                },
                {
                    name: 'nextjs',
                    fullName: 'Next.js',
                    desc: 'Next.js is a server-side webserver library built ontop of Node.js used in conjunction with React. It is used to generate server-side rendered pages or serve static pre-rendered files. This portfolio uses Next.js!',
                },
                {
                    name: 'react',
                    fullName: 'React',
                    desc: 'React is a JavaScript library for building user interfaces easily and quickly. It also helps by using something called components to reduce repeated code. I used it for this portfolio.',
                    fontaw: 'react',
                },
                {
                    name: 'html',
                    fullName: 'HTML',
                    desc: 'HTMl is the structure for frontend website, its a basic structurual language that outlines your website.',
                    fontaw: 'html5',
                },
                {
                    name: 'css',
                    fullName: 'CSS',
                    desc: 'CSS is a cascading language for styling frontend web pages, it combined with HTML can make basic static web pages that give the use a pleasent UI experience (if used correctly).',
                    fontaw: 'css3',
                },
                {
                    name: 'js',
                    fullName: 'JavaScript/TypeScript',
                    desc: 'avaScript is an object-oriented high-level programming language primarily used for the frontend resposiveness and interactive UX of websites. Typescript is a superset of javascript adding typing functionality.',
                    fontaw: 'js-square',
                },
                {
                    name: 'deno',
                    fullName: 'Deno',
                    desc: 'Deno is a counterpart to Node.js and was even made by the same person. It focuses on being runtime secure by default and lightweight while provided libraries without using a big folder such as node_modules.',
                    hasProjects: false,
                },
                {
                    name: 'bash',
                    fullName: 'Bash',
                    desc: 'Bash is a shell seen on macOS, Linux, and Windows using WSL. It is the worlds most popular shell language and can be used to write advanced automation scripts or simply carry out tasks without a GUI.',
                    fontawPrefix: 'solid',
                    fontaw: 'terminal',
                    hasProjects: false,
                },
            ] as StoredSkill[],
        },
    };
}

export default function Projects({ skills }: { skills: StoredSkill[] }) {
    useEffect(() => {
        document.querySelectorAll('.card > a').forEach((e: HTMLElement) => {
            e.addEventListener('mouseover', () => {
                if (e.children[1]) e.children[1].classList.add('hover');
            });

            e.addEventListener('mouseout', () => {
                if (e.children[1]) e.children[1].classList.remove('hover');
            });
        });
    }, []);

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
            <main>
                {skills.map(skill => {
                    return <Skill {...skill} key={skill.name} />;
                })}
            </main>
        </>
    );
}
