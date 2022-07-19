import Overlay from '../components/projects/Overlay';
import Project from '../components/projects/Project';
import { useEffect } from 'react';
import Tag from '../components/projects/Tag';
import { useRouter } from 'next/router.js';
import Head from 'next/head.js';

export type StoredTag = {
    name: string;
    fullName: string;
    fontaw?: string;
    filter?: boolean;
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

export function getStaticProps() {
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
                    tags: [tags.nextjs, tags.react, tags.html, tags.css, tags.js],
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
    const router = useRouter();

    useEffect(() => {
        const LANGS = ['python', 'node', 'nextjs', 'react', 'html', 'css', 'js'];

        document.querySelectorAll('.overlays').forEach((overlay: HTMLElement) => {
            const isFilter = overlay.classList.contains('overlays-filter');
            let realParent: HTMLElement;

            if (isFilter) realParent = overlay.parentElement!.querySelector('#filters')!;
            else realParent = overlay.parentElement!.querySelector('.tags')!;

            Array.from(overlay.children).forEach((e: HTMLElement, i) => {
                e.addEventListener('click', () => {
                    realParent.scrollBy({ left: i % 2 === 1 ? 130 : -130, behavior: 'smooth' });
                });
                e.addEventListener('keyup', (ev: KeyboardEvent) => {
                    if (ev.key !== 'Enter') return;
                    realParent.scrollBy({ left: i % 2 === 1 ? 130 : -130, behavior: 'smooth' });
                });
                e.addEventListener('mouseover', () => {
                    if (!(window.innerWidth >= 800)) return;
                    overlay.parentElement!.classList.add('hover');
                });
                e.addEventListener('mouseout', () => {
                    if (!(window.innerWidth >= 800)) return;
                    overlay.parentElement!.classList.remove('hover');
                });
                if (isFilter) e.style.transform = `translateX(${i % 2 === 1 ? '1rem' : '-1rem'})`;
            });

            if (isFilter) return;

            realParent.addEventListener('mouseover', () => {
                if (!(window.innerWidth >= 800)) return;
                overlay.parentElement!.classList.add('hover');
            });

            realParent.addEventListener('mouseout', () => {
                if (!(window.innerWidth >= 800)) return;
                overlay.parentElement!.classList.remove('hover');
            });
        });

        let selected: string[] = [];
        const wrap = document.getElementById('projects');
        const projects: NodeListOf<HTMLElement> = document.querySelectorAll('.project');

        const refresh = () => {
            wrap!.classList.add('switching');
            if (selected.length) router.push(`projects?f=${selected.join('+')}`);
            else router.push('projects');

            setTimeout(() => {
                projects.forEach(project => {
                    let tags: string | string[] | null = project.getAttribute('z-tags');
                    if (!tags) return;
                    tags = tags.split(',');

                    let hide = false;
                    selected.forEach(tag => {
                        if (!tags!.includes(tag)) hide = true;
                    });

                    if (hide) project.classList.add('hide');
                    else project.classList.remove('hide');
                });

                wrap!.classList.remove('switching');
            }, 200);
        };

        let params: string | string[] | null = new URLSearchParams(window.location.search).get('f');
        if (params) params = params.split(' ').filter(e => LANGS.includes(e));
        const filters: NodeListOf<HTMLElement> = document.querySelectorAll('#filters > .tag');

        if (params) {
            selected = params as string[];
            filters.forEach(filter => {
                if (params!.includes(filter.id)) filter.classList.add('selected');
            });
            refresh();
        }

        document.querySelectorAll('#filters > .tag').forEach(filter => {
            filter.addEventListener('click', () => {
                if (filter.classList.contains('selected')) {
                    selected = selected.filter(e => e !== filter.id);
                } else {
                    selected.push(filter.id);
                }
                filter.classList.toggle('selected');
                refresh();
            });

            filter.addEventListener('keyup', (ev: KeyboardEvent) => {
                if (ev.key !== 'Enter') return;
                if (filter.classList.contains('selected')) {
                    selected = selected.filter(e => e !== filter.id);
                } else {
                    selected.push(filter.id);
                }
                filter.classList.toggle('selected');
                refresh();
            });
        });
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
                    <div id="filters" className="flex no-scroll tags">
                        <Tag fullName="Python" name="python" fontaw="python" filter={true} />
                        <Tag fullName="Node.js" name="node" fontaw="node-js" filter={true} />
                        <Tag fullName="Next.js" name="nextjs" filter={true} />
                        <Tag fullName="React" name="react" fontaw="react" filter={true} />
                        <Tag fullName="HTML" name="html" fontaw="html5" filter={true} />
                        <Tag fullName="CSS" name="css" fontaw="css3" filter={true} />
                        <Tag fullName="JS/TS" name="js" fontaw="js" filter={true} />
                    </div>
                    <Overlay filter={true} />
                </div>
                <div id="projects">
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
