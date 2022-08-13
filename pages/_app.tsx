import { useEffect, useState, MouseEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { AppProps } from 'next/app';
import loadIn from '../ts/load';
import '../styles/globals.css';
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
        <div className="flex flex-col scroll-smooth h-max min-h-screen">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div id="overlay" className="flex justify-center transition-margin-left duration-800 will-change-margin">
                <canvas id="intro" className="w-full absolute max-w-500 h-min transition-intro duration-800 top-intro md:top-intro-scaled"></canvas>
            </div>

            <nav className="load-anim flex-col justify-between fixed no-scroll h-screen w-20 pt-6 pb-16 -translate-x-20 bg-accent pointer-events-none hidden md:flex sh:overflow-y-auto">
                <Image src="/images/icon.webp" alt="Zahtec logo" width="300" height="300" priority={true} className="opacity-0 transition-opacity duration-800 w-full h-20" />
                <div className="flex flex-col justify-center items-center">
                    <Link href="/">
                        <a className={`mt-6 text-4xl transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isRoot ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} tabIndex={0} aria-label="home">
                            <i className="fa-solid fa-house"></i>
                        </a>
                    </Link>
                    <Link href="/projects">
                        <a className={`mt-6 text-4xl transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isProjects ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} aria-label="projects">
                            <i className="fa-solid fa-cube"></i>
                        </a>
                    </Link>
                    <Link href="/presence">
                        <a className={`mt-6 text-4xl transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isPresence ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} aria-label="presence">
                            <i className="fa-solid fa-bolt"></i>
                        </a>
                    </Link>
                    <Link href="/skills">
                        <a className={`mt-6 text-4xl transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isSkills ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} aria-label="skills">
                            <i className="fa-solid fa-wrench"></i>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className={`mt-6 text-4xl transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isAbout ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} aria-label="about">
                            <i className="fa-solid fa-circle-info"></i>
                        </a>
                    </Link>
                </div>
                <div className="mt-6 text-2xl flex flex-col items-center">
                    <a className="mt-3 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav" target="_blank" href="https://www.github.com/zahtec" aria-label="github">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a className="mt-3 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav" target="_blank" href="https://www.twitter.com/Zahtec" aria-label="twitter">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a className="mt-3 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav" target="_blank" href="mailto:contact@zahtec.com" aria-label="email">
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a className="mt-3 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav" target="_blank" href="https://www.discord.com/users/340324858405847042" aria-label="discord">
                        <i className="fa-brands fa-discord"></i>
                    </a>
                </div>
            </nav>

            <Component {...pageProps} />

            <section className={`nav-bottom flex fixed flex-col items-center justify-center top-full text-4xl h-full w-full transition-top duration-400 bg-accent md:hidden${isMenuOpen ? ' top-0' : ''}`}>
                <Link href="/">
                    <a className={`flex justify-center items-center transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isRoot ? ' text-purple hover:drop-shadow-this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-house mr-2"></i>
                        <p>Home</p>
                    </a>
                </Link>
                <Link href="/projects">
                    <a className={`flex justify-center items-center mt-8 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isProjects ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-cube mr-2"></i>
                        <p>Projects</p>
                    </a>
                </Link>
                <Link href="/presence">
                    <a className={`flex justify-center items-center mt-8 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isPresence ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-bolt mr-2"></i>
                        <p>Presence</p>
                    </a>
                </Link>
                <Link href="/skills">
                    <a className={`flex justify-center items-center mt-8 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isSkills ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-wrench mr-2"></i>
                        <p>Skills</p>
                    </a>
                </Link>
                <Link href="/about">
                    <a className={`flex justify-center items-center mt-8 transition-filter duration-300 hover:drop-shadow-nav focus-visible:drop-shadow-nav ${isAbout ? ' text-purple hover:drop-shadow-this focus-visible:drop-shadow-this' : ''}`} tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-circle-info mr-2"></i>
                        <p>About</p>
                    </a>
                </Link>
                <div className="load-anim flex justify-center items-center mt-16 gap-4 text-4xl w-full pointer-events-none">
                    <a className="transition-colors duration-300 hover:text-hover focus-visible:text-hover" target="_blank" href="https://www.github.com/zahtec" aria-label="github" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a className="transition-colors duration-300 hover:text-hover focus-visible:text-hover" target="_blank" href="https://www.twitter.com/Zahtec" aria-label="twitter" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a className="transition-colors duration-300 hover:text-hover focus-visible:text-hover" target="_blank" href="mailto:contact@zahtec.com" aria-label="email" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a className="transition-colors duration-300 hover:text-hover focus-visible:text-hover" target="_blank" href="https://www.discord.com/users/340324858405847042" aria-label="discord" tabIndex={isMenuOpen ? 0 : -1}>
                        <i className="fa-brands fa-discord"></i>
                    </a>
                </div>
            </section>

            <div id="burger" className="load-anim flex flex-col justify-center items-center cursor-pointer pointer-events-none my-8 md:hidden" tabIndex={0} aria-label="menu" role="button" onClick={openMenu} onKeyUp={openMenu}>
                <div className={`h-burger w-12 rounded-sm bg-white transition-transform duration-400 drop-shadow-burger mt-auto${isMenuOpen ? ' open' : ''}`}></div>
                <div className={`h-burger w-12 rounded-sm bg-white transition-transform duration-400 drop-shadow-burger mt-4${isMenuOpen ? ' open' : ''}`}></div>
            </div>
        </div>
    );
}
