import { Tween, Easing } from '@tweenjs/tween.js';
import { useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export function getStaticProps() {
    return {
        props: {
            age: new Date().getFullYear() - new Date('2007-01-31').getFullYear(),
        },
    };
}

export default function Home({ age }: { age: number }) {
    const projMove = { perc: -1, perc2: 0 };
    const presMove = { perc: -1, perc2: 0 };
    const skilMove = { perc: -1, perc2: 0 };
    const abouMove = { perc: -1, perc2: 0 };

    const linkHover = (e: MouseEvent, move: { perc: number; perc2: number }, c1: string, c2: string) => {
        new Tween(move)
            .to({ perc: 50, perc2: 100 }, 800)
            .easing(Easing.Exponential.InOut)
            .onUpdate(() => {
                (e.target as HTMLElement).style.background = `linear-gradient(140deg, var(--color-${c2}) ${move.perc}%, var(--color-${c1}) ${move.perc2}%, var(--color-${c2}))`;
            })
            .start();
    };

    const linkLeave = (e: MouseEvent, move: { perc: number; perc2: number }, c1: string, c2: string) => {
        new Tween(move)
            .to({ perc: -1, perc2: 0 }, 800)
            .easing(Easing.Exponential.InOut)
            .onUpdate(() => {
                (e.target as HTMLElement).style.background = `linear-gradient(140deg, var(--color-${c2}) ${move.perc}%, var(--color-${c1}) ${move.perc2}%, var(--color-${c2}))`;
            })
            .start();
    };

    useEffect(() => {
        const title = document.getElementById('welcome')!;
        const msgs = ['Hi!', 'Hello!', 'Hey!', 'Howdy!'];

        const textAnim = () => {
            setTimeout(() => {
                title.style.opacity = '0';
                setTimeout(() => {
                    const ind = msgs.indexOf(title.innerText);
                    title.innerText = msgs[ind === 3 ? 1 : ind + 1];
                    title.style.opacity = '1';
                    textAnim();
                }, 300);
            }, Math.trunc(Math.random() * 10000) + 3000);
        };

        title.addEventListener(
            'animationend',
            () => {
                title.classList.remove('load-anim');
                title.style.opacity = '1';
                textAnim();
            },
            { once: true },
        );
    }, []);

    return (
        <>
            <Head>
                <title>Zahtec</title>
                <meta name="description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. Welcome to my portfolio!" />

                <meta name="og:title" content="Zahtec" />
                <meta name="og:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. Welcome to my portfolio!" />

                <meta name="twitter:title" content="Zahtec" />
                <meta name="twitter:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. Welcome to my portfolio!" />
            </Head>
            <main>
                <h1 className="load-anim welcome" id="welcome">
                    Hi!
                </h1>
                <h1 className="load-anim">I'm Zahtec</h1>
                <p className="load-anim">
                    I'm a {age} year old developer from the <span z-color="blue">Bay Area</span> in <span z-color="magenta">California</span>. To see my <span z-color="green">projects</span> or to <span z-color="orange">contact me</span>, tap on any of the links below.
                </p>
                <div className="links">
                    <Link href="/projects">
                        <a className="link all flex-cent load-anim no-select" onMouseEnter={e => linkHover(e, projMove, 'accentwo', 'accent')} onMouseLeave={e => linkLeave(e, projMove, 'accentwo', 'accent')}>
                            <i className="fa-solid fa-cube"></i>
                            <p>All Projects</p>
                        </a>
                    </Link>
                    <Link href="/presence">
                        <a className="link presence flex-cent load-anim no-select" onMouseEnter={e => linkHover(e, presMove, 'green', 'darkgreen')} onMouseLeave={e => linkLeave(e, presMove, 'green', 'darkgreen')}>
                            <i className="fa-solid fa-bolt"></i>
                            <p>Presence</p>
                        </a>
                    </Link>
                    <Link href="/skills">
                        <a className="link skills flex-cent load-anim no-select" onMouseEnter={e => linkHover(e, skilMove, 'magenta', 'darkmagenta')} onMouseLeave={e => linkLeave(e, skilMove, 'magenta', 'darkmagenta')}>
                            <i className="fa-solid fa-wrench"></i>
                            <p>Skills</p>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className="link about flex-cent load-anim no-select" onMouseEnter={e => linkHover(e, abouMove, 'orange', 'darkorange')} onMouseLeave={e => linkLeave(e, abouMove, 'orange', 'darkorange')}>
                            <i className="fa-solid fa-circle-info"></i>
                            <p>About</p>
                        </a>
                    </Link>
                </div>
                <p className="load-anim">
                    Welcome to my portfolio! I built this website trying to show off as much as I know as well as keeping the <span z-color="purple">UI</span> and <span z-color="red">UX</span> smooth and <span z-color="green">feature-rich</span>.
                </p>
                <p className="load-anim">
                    To contact me, I recommend <span z-color="teal">Discord</span>, but email also works as well. Have fun and <span z-color="brown">thanks for viewing</span>!
                </p>
            </main>
        </>
    );
}
