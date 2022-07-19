import { useEffect, useState, MouseEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { AppProps } from 'next/app';
import loadIn from '../ts/load';
import intro from '../ts/intro';
import Link from 'next/link';
import Head from 'next/head';

export default function Portfolio({ Component, pageProps }: AppProps) {
    const { asPath } = useRouter();

    const path = asPath.split('?')[0];

    const isRoot = path === '/';
    const isProjects = path === '/projects';
    const isPresence = path === '/presence';
    const isSkills = path === '/skills';
    const isAbout = path === '/about';

    const [animPlayed, setAnimPlayed] = useState<string>(path);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);

    const openMenu = (e: MouseEvent | KeyboardEvent) => {
        if ('key' in e && e.key !== 'Enter') return;

        if (isMenuOpen) setIsMenuOpen(false);
        else setIsMenuOpen(true);
    };

    useEffect(() => {
        if (!['/', '/projects', '/presence', '/skills', '/about'].includes(animPlayed) || animPlayed === path) return;

        if (isMenuOpen) setIsMenuOpen(false);

        loadIn();
        setAnimPlayed(path);
    }, [path]);

    useEffect(() => {
        if (isMenuOpen === null) return;

        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'overlay';
    }, [isMenuOpen]);

    useEffect(intro, []);

    return (
        <div id="wrap" className="flex">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="css/global.css" />
                <link rel="stylesheet" href={`css${path === '/' ? '/index' : path}.css`} />
            </Head>
            <div id="overlay">
                <canvas id="intro"></canvas>
            </div>

            <nav className="load-anim">
                <Image src="/images/icon.webp" alt="Zahtec logo" width="300" height="300" priority={true} />
                <div className="flex-cent">
                    <Link href="/">
                        <a className={`sidebar-item${isRoot ? ' this' : ''}`} tabIndex={0} aria-label="home">
                            <i className="fa-solid fa-house"></i>
                        </a>
                    </Link>
                    <Link href="/projects">
                        <a className={`sidebar-item${isProjects ? ' this' : ''}`} aria-label="projects">
                            <i className="fa-solid fa-cube"></i>
                        </a>
                    </Link>
                    <Link href="/presence">
                        <a className={`sidebar-item${isPresence ? ' this' : ''}`} aria-label="presence">
                            <i className="fa-solid fa-bolt"></i>
                        </a>
                    </Link>
                    <Link href="/skills">
                        <a className={`sidebar-item${isSkills ? ' this' : ''}`} aria-label="skills">
                            <i className="fa-solid fa-wrench"></i>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className={`sidebar-item ${isAbout ? 'this' : ''}`} aria-label="about">
                            <i className="fa-solid fa-circle-info"></i>
                        </a>
                    </Link>
                </div>
                <div className="sidebar-item flex-cent">
                    <a target="_blank" href="https://www.github.com/zahtec" aria-label="github">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a target="_blank" href="https://www.twitter.com/Zahtec" aria-label="twitter">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a target="_blank" href="mailto:32808999+zahtec@users.noreply.github.com" aria-label="email">
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a target="_blank" href="https://www.discord.com/users/340324858405847042" aria-label="discord">
                        <i className="fa-brands fa-discord"></i>
                    </a>
                </div>
            </nav>

            <Component {...pageProps} />

            <section id="nav-bottom" className={isMenuOpen ? 'show' : undefined}>
                <Link href="/">
                    <a className={`nav-bottom-item flex-cent ${isRoot ? ' this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </a>
                </Link>
                <Link href="/projects">
                    <a className={`nav-bottom-item flex-cent ${isProjects ? ' this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-cube"></i>
                        <p>Projects</p>
                    </a>
                </Link>
                <Link href="/presence">
                    <a className={`nav-bottom-item flex-cent ${isPresence ? ' this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-bolt"></i>
                        <p>Presence</p>
                    </a>
                </Link>
                <Link href="/skills">
                    <a className={`nav-bottom-item flex-cent ${isSkills ? ' this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-wrench"></i>
                        <p>Skills</p>
                    </a>
                </Link>
                <Link href="/about">
                    <a className={`nav-bottom-item flex-cent ${isAbout ? ' this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-circle-info"></i>
                        <p>About</p>
                    </a>
                </Link>
                <div className="socials flex-cent load-anim">
                    <a target="_blank" href="https://www.github.com/zahtec" aria-label="github" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a target="_blank" href="https://www.twitter.com/Zahtec" aria-label="twitter" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a target="_blank" href="mailto:32808999+zahtec@users.noreply.github.com" aria-label="email" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a target="_blank" href="https://www.discord.com/users/340324858405847042" aria-label="discord" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-discord"></i>
                    </a>
                </div>
            </section>
            <div id="burger" className="flex-cent load-anim" tabIndex={0} aria-label="menu" role="button" onClick={openMenu} onKeyUp={openMenu}>
                <div className={`line${isMenuOpen ? ' open' : ''}`}></div>
                <div className={`line${isMenuOpen ? ' open' : ''}`}></div>
            </div>
        </div>
    );
}
