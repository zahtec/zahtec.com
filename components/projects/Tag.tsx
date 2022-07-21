import { specialBrands } from '../icons/special';

export default function Tag({ fullName, name, fontaw, color, noMargin }: { fullName: string; name: string; fontaw?: string; color: string[]; noMargin: boolean }) {
    return (
        <div id={name} className={`flex justify-center items-center select-none w-40 min-w-40 h-16 p4 snap-center rounded-lg transition-tag duration-300 bg-gradient-140 border-solid border-xs ${color[0]} ${color[1]} hover:drop-shadow-tag ${color[2]}${noMargin ? ' first-of-type:ml-6 last-of-type:mr-6' : ' first-of-type:ml-12 last-of-type:mr-12'}`}>
            {fontaw && <i className={`fa-brands fa-${fontaw} mr-2 text-2xl`}></i>}
            {specialBrands[name] && <span className="w-6 mr-2 fill-white">{specialBrands[name]}</span>}
            <p>{fullName}</p>
        </div>
    );
}
