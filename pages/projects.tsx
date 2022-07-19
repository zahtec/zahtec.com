import Project from '../components/projects/Project';
import TagRow from '../components/projects/TagRow';
import { useRouter } from 'next/router.js';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head.js';

export type StoredTag = {
    name: string;
    fullName: string;
    fontaw?: string;
};

export type StoredProject = {
    name: string;
    fullName: string;
    desc: string;
    tags: StoredTag[];
    imageAlt: string;
    link?: string;
    overlay?: boolean;
};

const tags = {
    python: {
        name: 'python',
        fullName: 'Python',
        fontaw: 'python',
    },
    node: {
        name: 'node',
        fullName: 'Node.js',
        fontaw: 'node-js',
    },
    nextjs: {
        name: 'nextjs',
        fullName: 'Next.js',
    },
    react: {
        name: 'react',
        fullName: 'React',
        fontaw: 'react',
    },
    html: {
        name: 'html',
        fullName: 'HTML',
        fontaw: 'html5',
    },
    css: {
        name: 'css',
        fullName: 'CSS',
        fontaw: 'css3',
    },
    js: {
        name: 'js',
        fullName: 'JS/TS',
        fontaw: 'js',
    },
};

export function getStaticProps() {
    return {
        props: {
            projects: [
                {
                    name: 'tellodji',
                    fullName: 'TelloDji',
                    desc: 'TelloDji is a Python library that wraps the DJI Tello SDK v1.3 and v2.0 for easy control of any Tello drone.',
                    tags: [tags.python, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of a drone flying',
                    link: 'https://github.com/zahtec/tellodji',
                },
                {
                    name: 'browser',
                    fullName: 'Browser Upgrade',
                    desc: 'Browser upgrade is a simple Express.js middleware program that redirects users still using Internet Explorer to a page where they can choose from a variety of modern browsers.',
                    tags: [tags.node, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of internet explorer log',
                    link: 'https://github.com/zahtec/browser-upgrade',
                },
                {
                    name: 'portfolio',
                    fullName: 'This Portfolio',
                    desc: 'This portfolio shows off some of my best frontend skills, the animations and backend are superior and I hope you like it!',
                    tags: [tags.node, tags.nextjs, tags.react, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of the homepage of this portfolio',
                },
                {
                    name: 'trollpy',
                    fullName: 'Trollpy',
                    desc: 'Trollpy is a Python lbrary that contains a collection of functions that are meant to override built-in functions or ones on commonly used libraries. It is used to mess with developers sometimes, not in a malicious way.',
                    tags: [tags.python],
                    imageAlt: 'Image of the homepage of this portfolio',
                    link: 'https://github.com/zahtec/trollpy',
                    overlay: false,
                },
            ] as StoredProject[],
        },
    };
}

export default function Projects({ projects }: { projects: StoredProject[] }) {
    const LANGS = ['python', 'node', 'nextjs', 'react', 'html', 'css', 'js'];
    const [switching, setSwitching] = useState(false);
    const [filtering, setFiltering] = useState<string[] | null>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const clickHandler = (name: string) => {
        if (filtering!.includes(name)) {
            setFiltering(filtering!.filter(tag => tag !== name));
        } else {
            setFiltering([...filtering!, name]);
        }
    };

    useEffect(() => {
        if (!filtering || !wrap.current) return;
        setSwitching(true);
        if (filtering.length) router.push(`projects?f=${filtering.join('+')}`);
        else router.push('projects');

        setTimeout(() => {
            Array.from(wrap.current!.children).forEach(project => {
                let tags: string | string[] | null = project.getAttribute('z-tags');
                if (!tags) return;
                tags = tags.split(',');

                let hide = false;
                filtering.forEach(tag => {
                    if (!tags!.includes(tag)) hide = true;
                });

                if (hide) project.classList.add('hide');
                else project.classList.remove('hide');
            });

            setSwitching(false);
        }, 200);
    }, [filtering]);

    useEffect(() => {
        let params: string | string[] | null = new URLSearchParams(window.location.search).get('f');
        if (params && typeof params === 'string') {
            params = params.split(' ').filter(e => LANGS.includes(e));
            setFiltering(params);
        } else {
            setFiltering([]);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my projects!" />

                <meta name="og:title" content="Projects" />
                <meta name="og:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my projects!" />

                <meta name="twitter:title" content="Projects" />
                <meta name="twitter:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. These are my projects!" />
            </Head>
            <main>
                <div className="load-anim">
                    <div id="filter" className="flex no-select">
                        <i className="fa-solid fa-filter"></i>
                        <p>Filter</p>
                    </div>
                    <TagRow tags={Object.values(tags)} clickHandler={clickHandler} filtering={filtering ? filtering : []} />
                </div>
                <div id="projects" ref={wrap} style={switching ? { opacity: 0, transform: 'translateY(2rem)' } : {}}>
                    {projects.map(project => {
                        return <Project {...project} key={project.name} />;
                    })}
                    <div id="unknown" className="load-anim flex project">
                        <div className="wrapper">
                            <div className="flex-cent">
                                <h1>???</h1>
                            </div>
                            <p>I'm always working on new projects, currently I have one involving Next.js, React, Python, and NLP with a big market scope in mind. Check back to see once its done!</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
