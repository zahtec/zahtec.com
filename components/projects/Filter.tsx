import { specialBrands } from '../icons/special';

export default function Filter({ fullName, name, fontaw, clickHandler, selected, color }: { fullName: string; name: string; fontaw?: string; clickHandler: (name: string) => void; selected?: boolean; color: string[] }) {
    return (
        <div id={name} className={`flex items-center justify-center w-40 min-w-40 p-4 h-16 snap-center rounded-lg transition-tag select-none cursor-pointer filter-none first-of-type:ml-12 last-of-type:mr-12 bg-gradient-140 border-solid border-xs ${color[0]} ${color[1]} ${color[2]}${selected ? ' opacity-100' : ' opacity-60 '}`} tabIndex={0} role="button" onClick={() => clickHandler(name)} onKeyUp={e => (e.key === 'Enter' ? () => clickHandler(name) : undefined)}>
            {fontaw && <i className={`fa-brands fa-${fontaw} mr-2 text-2xl`}></i>}
            {specialBrands[name] && <span className="w-6 mr-2 fill-white">{specialBrands[name]}</span>}
            <p>{fullName}</p>
        </div>
    );
}
