import Nextjs from './Nextjs';
import Deno from './Deno';

export const specialBrands: {
    [key: string]: JSX.Element;
} = {
    nextjs: <Nextjs />,
    deno: <Deno />,
};
