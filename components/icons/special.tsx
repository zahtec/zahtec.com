import Nextjs from './Nextjs';
import Deno from './Deno';
import Tailwind from './Tailwind';

export const specialBrands: {
    [key: string]: JSX.Element;
} = {
    nextjs: <Nextjs />,
    deno: <Deno />,
    tailwind: <Tailwind />,
};
