import Project from '../components/projects/Project';
import TagRow from '../components/projects/TagRow';
import { useRouter } from 'next/router.js';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head.js';

export type StoredTag = {
    name: string;
    fullName: string;
    fontaw?: string;
    color: string[];
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

const tags: { [key: string]: StoredTag } = {
    python: {
        name: 'python',
        fullName: 'Python',
        fontaw: 'python',
        color: ['from-teal', 'to-teal-dark', 'border-teal'],
    },
    node: {
        name: 'node',
        fullName: 'Node.js',
        fontaw: 'node-js',
        color: ['from-green', 'to-green-dark', 'border-green'],
    },
    nextjs: {
        name: 'nextjs',
        fullName: 'Next.js',
        color: ['from-magenta', 'to-magenta-dark', 'border-magenta'],
    },
    react: {
        name: 'react',
        fullName: 'React',
        fontaw: 'react',
        color: ['from-purple', 'to-purple-dark', 'border-purple'],
    },
    tailwind: {
        name: 'tailwind',
        fullName: 'Tailwind',
        color: ['from-red', 'to-red-dark', 'border-red'],
    },
    html: {
        name: 'html',
        fullName: 'HTML',
        fontaw: 'html5',
        color: ['from-orange', 'to-orange-dark', 'border-orange'],
    },
    css: {
        name: 'css',
        fullName: 'CSS',
        fontaw: 'css3',
        color: ['from-blue', 'to-blue-dark', 'border-blue'],
    },
    js: {
        name: 'js',
        fullName: 'JS/TS',
        fontaw: 'js',
        color: ['from-yellow', 'to-yellow-dark', 'border-yellow'],
    },
};

export function getStaticProps(): { props: { projects: StoredProject[] } } {
    return {
        props: {
            projects: [
                {
                    name: 'bg-tellodji',
                    fullName: 'TelloDji',
                    desc: 'TelloDji is a Python library that wraps the DJI Tello SDK v1.3 and v2.0 for easy control of any Tello drone.',
                    tags: [tags.python, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of a drone flying',
                    link: 'https://github.com/zahtec/tellodji',
                },
                {
                    name: 'bg-browser',
                    fullName: 'Browser Upgrade',
                    desc: 'Browser upgrade is a simple Express.js middleware program that redirects users still using Internet Explorer to a page where they can choose from a variety of modern browsers.',
                    tags: [tags.node, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of internet explorer log',
                    link: 'https://github.com/zahtec/browser-upgrade',
                },
                {
                    name: 'bg-portfolio',
                    fullName: 'This Portfolio',
                    desc: 'This portfolio shows off some of my best frontend skills, the animations and backend are superior and I hope you like it!',
                    tags: [tags.node, tags.nextjs, tags.react, tags.tailwind, tags.html, tags.css, tags.js],
                    imageAlt: 'Image of the homepage of this portfolio',
                },
                {
                    name: 'bg-trollpy',
                    fullName: 'Trollpy',
                    desc: 'Trollpy is a Python lbrary that contains a collection of functions that are meant to override built-in functions or ones on commonly used libraries. It is used to mess with developers sometimes, not in a malicious way.',
                    tags: [tags.python],
                    imageAlt: 'Image of the homepage of this portfolio',
                    link: 'https://github.com/zahtec/trollpy',
                    overlay: false,
                },
            ],
        },
    };
}

export default function Projects({ projects }: { projects: StoredProject[] }) {
    const LANGS = ['python', 'node', 'nextjs', 'react', 'tailwind', 'html', 'css', 'js'];
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
        if (filtering.length) router.push(`projects?f=${filtering.join('+')}`, undefined, { shallow: true });
        else router.push('projects');

        setTimeout(() => {
            Array.from(wrap.current!.children).forEach((project: HTMLElement) => {
                let tags: string | string[] | null = project.getAttribute('z-tags');
                if (!tags) return;
                tags = tags.split(',');

                let hide = false;
                filtering.forEach(tag => {
                    if (!tags!.includes(tag)) hide = true;
                });

                if (hide) project.style.display = 'none';
                else project.style.display = '';
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
            <main className="pt-28 max-w-1200 my-0 mx-auto">
                <div className="load-anim mb-12">
                    <div className="flex select-none text-2xl items-center">
                        <i className="fa-solid fa-filter mr-2"></i>
                        <p>Filter</p>
                    </div>
                    <TagRow tags={Object.values(tags)} clickHandler={clickHandler} filtering={filtering ? filtering : []} />
                </div>
                <div className="transition-tropacity duration-200" ref={wrap} style={switching ? { opacity: 0, transform: 'translateY(2rem)' } : {}}>
                    {projects.map(project => {
                        return <Project {...project} key={project.name} />;
                    })}
                    <div className="load-anim flex w-full rounded-xl justify-center flex-col mb-20 relative overflow-hidden leading-7 bg-unknown bg-no-repeat bg-center bg-cover">
                        <div className="h-full w-full bg-project from-accent pt-60 px-4 pb-4 transition-padding duration-300 xl:hover:pt-64">
                            <div className="flex items-center">
                                <h1 className="text-3xl sm:text-4xl">???</h1>
                            </div>
                            <p className="max-w-720 my-8">I'm always working on new projects, currently I have one involving Next.js, React, Python, and NLP with a big market scope in mind. Check back to see once its done!</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
