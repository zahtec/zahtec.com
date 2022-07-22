import { Tween, Easing } from '@tweenjs/tween.js';
import Underline from '../components/Underline';
import { useEffect, MouseEvent, FocusEvent, useRef, useState } from 'react';
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

    const [currentWelcome, setCurrentWelcome] = useState('Hi!');
    const welcome = useRef<HTMLHeadingElement>(null);

    const linkHover = (e: MouseEvent | FocusEvent, move: { perc: number; perc2: number }) => {
        new Tween(move)
            .to({ perc: 50, perc2: 100 }, 800)
            .easing(Easing.Exponential.InOut)
            .onUpdate(() => {
                (e.target as HTMLElement).style.background = `linear-gradient(140deg, var(--tw-gradient-to) ${move.perc}%, var(--tw-gradient-from) ${move.perc2}%, var(--tw-gradient-to))`;
            })
            .start();
    };

    const linkLeave = (e: MouseEvent | FocusEvent, move: { perc: number; perc2: number }) => {
        new Tween(move)
            .to({ perc: -1, perc2: 0 }, 800)
            .easing(Easing.Exponential.InOut)
            .onUpdate(() => {
                (e.target as HTMLElement).style.background = `linear-gradient(140deg, var(--tw-gradient-to) ${move.perc}%, var(--tw-gradient-from) ${move.perc2}%, var(--tw-gradient-to))`;
            })
            .start();
    };

    const msgs = ['Hi!', 'Hello!', 'Hey!', 'Howdy!'];

    useEffect(() => {
        setTimeout(() => {
            if (!welcome.current) return;
            welcome.current.style.opacity = '0';
            setTimeout(() => {
                if (!welcome.current) return;
                const ind = msgs.indexOf(currentWelcome);
                setCurrentWelcome(msgs[ind === 3 ? 0 : ind + 1]);
                welcome.current.style.opacity = '1';
            }, 300);
        }, Math.trunc(Math.random() * 10000) + 3000);
    }, [currentWelcome]);

    useEffect(() => {
        if (!welcome.current) return;
        welcome.current.addEventListener(
            'animationend',
            () => {
                if (!welcome.current) return;
                welcome.current.classList.remove('load-anim');
                welcome.current.style.opacity = '1';
                setCurrentWelcome('Hi!');
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
                <h1 className="load-anim transition-opacity duration-300 text-4xl font-extrabold text-center mb-4" ref={welcome}>
                    {currentWelcome}
                </h1>
                <h1 className="load-anim text-5xl mb-4 font-extrabold text-center">I'm Zahtec</h1>
                <p className="load-anim">
                    I'm a <Underline color="text-purple">{age}</Underline> year old developer from the <Underline color="text-blue">Bay Area</Underline> in <Underline color="text-magenta">California</Underline>. To see my <Underline color="text-green">projects</Underline> or to contact me, follow any of the links below.
                </p>
                <div className="flex flex-col items-center my-8 gap-4 w-full">
                    <Link href="/projects">
                        <a className="load-anim flex justify-center items-center p-2 rounded text-xl w-full h-16 pointer-events-none select-none transition-filter duration-1000 bg-gradient-140 from-accentwo to-accent border-xs border-accentwo drop-shadow-gr hover:drop-shadow-gr-hover focus-visible:drop-shadow-gr-hover" onMouseEnter={e => linkHover(e, projMove)} onMouseLeave={e => linkLeave(e, projMove)} onFocus={e => linkHover(e, projMove)} onBlur={e => linkLeave(e, projMove)}>
                            <i className="fa-solid fa-cube mr-2"></i>
                            <p>All Projects</p>
                        </a>
                    </Link>
                    <Link href="/presence">
                        <a className="load-anim flex justify-center items-center p-2 rounded text-xl w-full h-16 pointer-events-none select-none transition-filter duration-1000 bg-gradient-140 from-green to-green-dark border-xs border-green drop-shadow-gr hover:drop-shadow-gr-hover" onMouseEnter={e => linkHover(e, presMove)} onMouseLeave={e => linkLeave(e, presMove)} onFocus={e => linkHover(e, presMove)} onBlur={e => linkLeave(e, presMove)}>
                            <i className="fa-solid fa-bolt mr-2"></i>
                            <p>Presence</p>
                        </a>
                    </Link>
                    <Link href="/skills">
                        <a className="load-anim flex justify-center items-center p-2 rounded text-xl w-full h-16 pointer-events-none select-none transition-filter duration-1000 bg-gradient-140 from-magenta to-magenta-dark border-xs border-magenta drop-shadow-gr hover:drop-shadow-gr-hover" onMouseEnter={e => linkHover(e, skilMove)} onMouseLeave={e => linkLeave(e, skilMove)} onFocus={e => linkHover(e, skilMove)} onBlur={e => linkLeave(e, skilMove)}>
                            <i className="fa-solid fa-wrench mr-2"></i>
                            <p>Skills</p>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className="load-anim flex justify-center items-center p-2 rounded text-xl w-full h-16 pointer-events-none select-none transition-filter duration-1000 bg-gradient-140 from-orange to-orange-dark border-xs border-orange drop-shadow-gr hover:drop-shadow-gr-hover" onMouseEnter={e => linkHover(e, abouMove)} onMouseLeave={e => linkLeave(e, abouMove)} onFocus={e => linkHover(e, abouMove)} onBlur={e => linkLeave(e, abouMove)}>
                            <i className="fa-solid fa-circle-info mr-2"></i>
                            <p>About</p>
                        </a>
                    </Link>
                </div>
                <p className="load-anim">
                    I built this website trying to show off as much as I know as well as keeping the <Underline color="text-orange">UI</Underline> and <Underline color="text-red">UX</Underline> smooth and <Underline color="text-yellow">feature-rich</Underline>.
                </p>
                <p className="load-anim">
                    To contact me, I recommend <Underline color="text-teal">Discord</Underline>, but email also works as well. Have fun and <Underline color="text-brown">thanks for viewing</Underline>!
                </p>
            </main>
        </>
    );
}
