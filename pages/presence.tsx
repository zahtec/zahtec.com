import { SpotifyResponse } from './api/spotify.js';
import { useEffect, useState } from 'react';
import Image from 'next/future/image';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const getTime = (t: number) => {
    const sec = Math.trunc((t % 60000) / 1000);
    const min = Math.floor(t / (1000 * 60));

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};

interface LanyardResponse extends JSON {
    op: number;
    d?: {
        discord_status: string;
        activities: {
            name: string;
            state: string;
        }[];
    };
    heartbeat_interval?: number;
}

export default function Presence() {
    const out = useSWR<SpotifyResponse>('/api/spotify', fetcher, { refreshInterval: 5000, revalidateOnMount: true });

    const data = out.data && 'album' in out.data ? out.data : null;

    const [status, setStatus] = useState<{ online: boolean; status: string } | null>(null);
    const [time, setTime] = useState<number | null>(data ? data.progress : null);
    const [socketClosed, setSocketClosed] = useState(false);

    useEffect(() => {
        if (!data) return;

        const now = Date.now();

        const interval = setInterval(() => {
            setTime(data.playing ? data.progress + Date.now() - now : data.progress);
        }, 100);

        return () => clearInterval(interval);
    }, [data]);

    useEffect(() => {
        const socket = new WebSocket('wss://api.lanyard.rest/socket');

        let interval: NodeJS.Timer;
        socket.addEventListener('message', data => {
            const res: LanyardResponse = JSON.parse(data.data);

            if (res.op === 1) {
                socket.send(
                    JSON.stringify({
                        op: 2,
                        d: {
                            subscribe_to_id: '340324858405847042',
                        },
                    }),
                );
                interval = setInterval(() => {
                    socket.send(
                        JSON.stringify({
                            op: 3,
                        }),
                    );
                }, res.heartbeat_interval);
            } else if (res.op === 0) {
                setStatus({
                    online: res.d!.discord_status !== 'offline',
                    status: res.d!.activities.length ? res.d!.activities.filter(act => act.name === 'Custom Status')[0].state : 'No Status',
                });
            }
        });

        socket.onclose = () => {
            setSocketClosed(socketClosed ? false : true);
            clearInterval(interval);
        };
    }, [socketClosed]);

    return (
        <>
            <Head>
                <title>Presence</title>
                <meta name="description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is my current online presence!" />

                <meta name="og:title" content="Presence" />
                <meta name="og:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is my current online presence!" />

                <meta name="twitter:title" content="Presence" />
                <meta name="twitter:description" content="I'm Zahtec, an aspiring software engineer and looking for a job in the industry. This is my current online presence!" />
            </Head>
            <main className="sm:pt-32 md:pt-16">
                <div className="load-anim flex w-full rounded-lg items-center flex-col mb-8 pt-20 px-4 pb-8 bg-accent">
                    <i className="fa-brands fa-discord text-8xl absolute top-4 -z-1 pres-mask"></i>
                    <h1 className="text-4.5xl text-transparent text-strok pres-title">DISCORD</h1>
                    <div className="flex text-base my-6">
                        <div className="relative h-min w-min mr-4">
                            <Image src="/images/discord-icon.webp" alt="Zahtec logo" width="300" height="300" loading="eager" className="w-20 h-20 rounded-lg" />
                            <div className={`absolute w-6 h-6 rounded-xl top-3/4 left-80 border-solid border-4 border-accent${status && status.online ? ' bg-green-discord' : ' bg-accentwo '}`}></div>
                        </div>
                        <div id="status-wrapper">
                            <h1 className="text-xl sm:text-3xl">
                                Zahtec<span className="text-accentwo">#8510</span>
                            </h1>
                            <em>{status && status.online ? status.status : 'Offline'}</em>
                        </div>
                    </div>
                    <a className="flex justify-center items-center p-2 rounded text-xl w-3/4 bg-green-discord" target="_blank" href="https://www.discord.com/users/340324858405847042">
                        Add as friend
                    </a>
                </div>
                <div className="load-anim flex w-full rounded-lg items-center flex-col mb-8 pt-20 px-4 pb-8 bg-accent">
                    <i className="fa-brands fa-spotify text-8xl absolute top-4 -z-1 pres-mask"></i>
                    <h1 className="text-4.5xl text-transparent text-strok pres-title">SPOTIFY</h1>
                    <div className="flex text-base my-6">
                        <div className="w-24 h-24 mr-4 shrink-0 relative">
                            <Image src={data ? data.image : '/images/empty.webp'} alt={data ? `${data.album} album cover` : 'Album placeholder'} width="640" height="640" loading="eager" className="w-full h-full grayscale rounded-lg relative" />
                            <Image src={data ? data.image : '/images/empty.webp'} style={data ? { clip: `rect(0, ${(Math.floor((data.progress / data.duration) * 100) / 100) * 6}rem, 6rem, 0)` } : { clip: 'rect(0, 0rem, 6rem, 0)' }} width="640" height="640" loading="eager" className="absolute w-full left-0 h-full top-0 rounded-lg" />
                        </div>
                        <div className={`sm:text-xl${data ? '' : ' flex justify-center items-center'}`}>
                            <h1 className="text-xl sm:text-2xl">{data ? data.title : 'Nothing playing'}</h1>
                            {data && <em className="inline-block mb-1 max-w-xs">{data ? `${data.album} - ${data.artist}` : ''}</em>}
                            <div className="flex">
                                {data && <p className="absolute font-normal text-accentwo">{data ? getTime(time!) : ''}</p>}
                                {data && <p className="relative font-normal text-accentwo ml-album sm:ml-11">{data ? ` / ${getTime(data.duration)}` : ''}</p>}
                            </div>
                        </div>
                    </div>
                    <a className="flex justify-center items-center p-2 rounded text-xl w-3/4 bg-green-discord" target="_blank" href="https://open.spotify.com/user/31fvhyqyygvcf7zmnjfwfspg7sue">
                        View profile
                    </a>
                </div>
            </main>
        </>
    );
}
