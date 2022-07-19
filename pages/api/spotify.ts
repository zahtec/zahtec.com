import { NextApiRequest, NextApiResponse } from 'next';

let expiration = new Date().getTime();
let token: string;

interface SpotifyAuthResponse {
    access_token: string;
    expires_in: number;
}

interface SpotifyPlayerResponse {
    item: {
        name: string;
        album: {
            name: string;
            images: { url: string }[];
        };
        artists: { name: string }[];
        duration_ms: number;
    };
    progress_ms: number;
    is_playing: boolean;
}

export interface SpotifyResponse {
    title: string;
    album: string;
    artist: string;
    image: string;
    progress: number;
    duration: number;
    playing: boolean;
    none?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyResponse>) {
    if (!token || new Date().getTime() > expiration) {
        const res: SpotifyAuthResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`f6578bc9c9c64137b2689f9025a7b2ad:${process.env.SPOTIFY_TOKEN}`, 'ascii').toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH}`,
        }).then(res => res.json());

        token = res.access_token;
        expiration = new Date().getTime() + res.expires_in * 1000;
    }

    const response: SpotifyPlayerResponse | null = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => (res.status === 204 ? null : res.json()));

    if (response?.item) {
        res.status(200).json({
            title: response?.item?.name,
            album: response?.item?.album.name,
            artist: response?.item?.artists.map(artist => artist.name).join(', '),
            image: response?.item?.album.images[0].url,
            progress: response?.progress_ms,
            duration: response?.item.duration_ms,
            playing: response?.is_playing,
        } as SpotifyResponse);
    } else {
        res.status(200).json({ none: true } as SpotifyResponse);
    }
}
