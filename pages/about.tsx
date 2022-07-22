import { Tween, Easing } from '@tweenjs/tween.js';
import { useEffect, useRef, useState } from 'react';
import Underline from '../components/Underline';
import Head from 'next/head';

export default function About() {
    const [isHovering, setIsHovering] = useState(false);
    const title = useRef<HTMLHeadingElement>(null);

    const colors = [
        [
            [255, 73, 73],
            [181, 41, 41],
        ],
        [
            [248, 174, 105],
            [207, 134, 66],
        ],
        [
            [255, 156, 64],
            [201, 119, 42],
        ],
        [
            [255, 238, 84],
            [190, 175, 42],
        ],
        [
            [103, 255, 90],
            [47, 172, 36],
        ],
        [
            [99, 143, 255],
            [37, 78, 183],
        ],
        [
            [106, 245, 254],
            [67, 203, 211],
        ],
        [
            [178, 36, 215],
            [134, 15, 155],
        ],
        [
            [255, 55, 112],
            [171, 11, 110],
        ],
    ];

    const [storedStyle, setStyle] = useState({ color: colors[Math.trunc(Math.random() * 8)], deg: 0 });

    useEffect(() => {
        if (!title.current) return;

        let tween: Tween<{
            color: number[][];
            deg: number;
        }>;

        const style = storedStyle;

        const textAnim = () => {
            tween = new Tween(style)
                .to({ color: colors[Math.trunc(Math.random() * 8)], deg: style.deg + 180 }, 3000)
                .easing(Easing.Linear.None)
                .onUpdate(() => {
                    if (!title.current) return;
                    title.current.style.backgroundImage = `linear-gradient(${style.deg}deg, rgb(${style.color[0][0]}, ${style.color[0][1]}, ${style.color[0][2]}), rgb(${style.color[1][0]}, ${style.color[1][1]}, ${style.color[1][2]}))`;
                    setStyle(style);
                    if (isHovering) title.current.style.filter = `drop-shadow(0 0 0.7rem rgb(${style.color[0][0]}, ${style.color[0][1]}, ${style.color[0][2]}))`;
                    else title.current.style.filter = '';
                })
                .onComplete(textAnim)
                .start();
        };

        textAnim();

        return () => {
            tween.stop();
        };
    }, [isHovering]);

    return (
        <>
            <Head>
                <title>About</title>
                <meta name="description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is all you need to know about me!" />

                <meta name="og:title" content="About" />
                <meta name="og:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is all you need to know about me!" />

                <meta name="twitter:title" content="About" />
                <meta name="twitter:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is all you need to know about me!" />
            </Head>
            <main>
                <h1 className="load-anim text-4xl leading-normal text-center transition-filter duration-300 bg-clip-text text-transparent font-extrabold md:text-5xl md:leading-normal" ref={title} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                    The one and only...
                </h1>
                <p className="load-anim mt-4">
                    Hi there! I'm <span className="text-blue from-blue transition-transform duration-700 absolute left-toryn after:w-full after:transition-transform after:scale-x-0 after:h-0.5 after:duration-700 after:absolute after:left-0 after:inline-block after:-bottom-0.5 after:bg-gradient-to-tl after:from-teal after:to-blue hover:after:scale-x-100 hover:scale-150 hover:translate-x-4">Toryn,</span>
                </p>
                <p className="load-anim mt-4">
                    but you probably know me as <Underline color="text-purple">Zahtec</Underline>. I'm an aspiring 15 year old developer who is trying to get a <Underline color="text-green">job</Underline> in the industry whenever possible. I like to design and create <Underline color="text-magenta">frontends</Underline> and <Underline color="text-orange">backends</Underline> in certain styles or themes along with performance and an enjoyable <Underline color="text-teal">experience</Underline>.
                </p>
                <p className="load-anim mt-4">
                    I love building products that take <Underline color="text-red">every aspect</Underline> into account, when I build a website I make sure to have a <Underline color="text-brown">polish</Underline>, burger menu still open when browser is resized? Element being overflowed when at an obscure height? Every <Underline color="text-blue">aspect</Underline> comes to account when I build a product giving it a certain <Underline color="text-green">polish</Underline>.
                </p>
                <p className="load-anim mt-4">
                    This website was built using <Underline color="text-teal">React</Underline>, <Underline color="text-red">Tailwind</Underline>, and is <Underline color="text-yellow">written in TypeScript</Underline>. With <Underline color="text-green">Next.js</Underline> in the backend to power it all. I plan on greatly expanding my skillset and eventually creating a subdomain that includes a <Underline color="text-magenta">Rust boids simulation</Underline> along with a bunch of other projects I have in mind, including ones to do with <Underline color="text-brown">AI</Underline>.
                </p>
                <p className="load-anim mt-4">
                    I <Underline color="text-purple">thank you again</Underline> for coming to view my portfolio, don't forget to check out my <Underline color="text-orange">projects</Underline> and <Underline color="text-teal">presence</Underline>. If you would like to contact me, I suggest adding me on <Underline color="text-yellow">Discord</Underline>.
                </p>
            </main>
        </>
    );
}
