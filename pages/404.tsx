import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Wrong(): null {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    });

    return null;
}
