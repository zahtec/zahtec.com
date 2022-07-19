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
                setInterval(() => {
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
    }, []);

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
            <main>
                <div id="discord" className="load-anim flex rich-pres">
                    <i className="fa-brands fa-discord"></i>
                    <h1>DISCORD</h1>
                    <div className="flex">
                        <div id="icon-wrapper">
                            <Image src="/images/discord-icon.webp" alt="Zahtec logo" width="300" height="300" loading="eager" />
                            <div id="status-ring" style={status && status.online ? { backgroundColor: 'var(--color-disgreen)' } : undefined}></div>
                        </div>
                        <div id="status-wrapper">
                            <h1>
                                Zahtec<span z-color="teal">#8510</span>
                            </h1>
                            <em id="status">{status && status.online ? status.status : 'Offline'}</em>
                        </div>
                    </div>
                    <a className="flex-cent rich-button" target="_blank" href="https://www.discord.com/users/340324858405847042">
                        Add as friend
                    </a>
                </div>
                <div id="spotify" className="load-anim flex rich-pres">
                    <i className="fa-brands fa-spotify"></i>
                    <h1>SPOTIFY</h1>
                    <div className="flex">
                        <div id="art-wrapper">
                            <Image src={data ? data.image : '/images/empty.webp'} alt={data ? `${data.album} album cover` : 'No song'} width="640" height="640" loading="eager" />
                            <Image src={data ? data.image : '/images/empty.webp'} style={data ? { clip: `rect(0, ${Math.floor(data.progress / data.duration / 100) * 6}rem, 6rem, 0)` } : {}} width="640" height="640" loading="eager" />
                        </div>
                        <div id="album-wrapper" className={data ? undefined : 'flex-cent'}>
                            <h1>{data ? data.title : 'Nothing playing'}</h1>
                            {data && <em>{data ? `${data.album} - ${data.artist}` : ''}</em>}
                            <div id="progress-wrapper" className="flex">
                                {data && <p>{data ? getTime(time!) : ''}</p>}
                                {data && <p>{data ? ` / ${getTime(data.duration)}` : ''}</p>}
                            </div>
                        </div>
                    </div>
                    <a className="flex-cent rich-button" target="_blank" href="https://open.spotify.com/user/31fvhyqyygvcf7zmnjfwfspg7sue">
                        View profile
                    </a>
                </div>
            </main>
        </>
    );
}
