import { Tween, Easing } from '@tweenjs/tween.js';
import { useEffect } from 'react';
import Head from 'next/head';

export default function About() {
    useEffect(() => {
        const title: HTMLElement = document.querySelector('main > h1')!;
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

        let style: { color: number[][]; deg: number };

        const textAnim = () => {
            new Tween(style)
                .to({ color: colors[Math.trunc(Math.random() * 8)], deg: style.deg + 180 }, 3000)
                .easing(Easing.Linear.None)
                .onUpdate(() => {
                    title.style.backgroundImage = `linear-gradient(${style.deg}deg, rgb(${style.color[0][0]}, ${style.color[0][1]}, ${style.color[0][2]}), rgb(${style.color[1][0]}, ${style.color[1][1]}, ${style.color[1][2]}))`;
                })
                .onComplete(() => {
                    textAnim();
                })
                .start();
        };

        let interval: NodeJS.Timer;

        title.addEventListener('mouseover', () => {
            interval = setInterval(() => {
                title.style.filter = `drop-shadow(0 0 0.5rem rgb(${style.color[0][0]}, ${style.color[0][1]}, ${style.color[0][2]}))`;
            }, 100);
        });

        title.addEventListener('mouseout', () => {
            clearInterval(interval);
            title.style.filter = '';
        });

        const indx = Math.trunc(Math.random() * 8);
        title.style.backgroundImage = `linear-gradient(0deg, rgb(${colors[indx][0][0]}, ${colors[indx][0][1]}, ${colors[indx][0][2]}), rgb(${colors[indx][1][0]}, ${colors[indx][1][1]}, ${colors[indx][1][2]})`;
        style = { color: colors[indx], deg: 0 };

        textAnim();
    });

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
                <h1 className="load-anim">The one and only...</h1>
                <p className="load-anim">
                    Hi there! I'm Toryn, but you probably know me as <span z-color="purple">Zahtec</span>. I'm an aspiring 15 year old developer who is trying to get a <span z-color="green">job</span> in the industry whenever possible. I conjure up <span z-color="magenta">frontends</span> and <span z-color="teal">backends</span> like they're nothing and can easily style a website to a certain theme.
                </p>
                <p className="load-anim">
                    I <span color="red">love</span> building products that take every aspect into account, when I build a website I make sure to make <span z-color="brown">every possible case handled</span>, burger menu still open when browser is resized? Animation that needs to be reversed when on mobile? Every <span z-color="blue">aspect</span> comes to account when I build a product giving it a <span z-color="orange">polish</span> where finding bugs feels like a <span z-color="yellow">challenge</span> rather than easily being able to spam an input and find one.
                </p>
                <p className="load-anim">
                    This website was built using static <span z-color="orange">HTML</span>, <span z-color="blue">CSS</span>, and <span z-color="yellow">JS</span>. With <span z-color="green">Next.js</span> in the back to power it all. I plan on greatly expanding my skillset and eventually implementing <span z-color="teal">React</span>, <span z-color="blue">Tailwind</span>, and any other library I find useful and fast enough to meet my standards.
                </p>
                <p className="load-anim">
                    I <span z-color="purple">thank you again</span> for coming to view my profile, don't forget to check out my <span z-color="red">projects</span> and <span z-color="magenta">presence</span> if you would like to contact me, I suggest adding me on <span z-color="yellow">Discord</span>.
                </p>
            </main>
        </>
    );
}
