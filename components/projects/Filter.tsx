import { specialBrands } from '../icons/special';

export default function Tag({ fullName, name, fontaw, clickHandler, selected }: { fullName: string; name: string; fontaw?: string; clickHandler: (name: string) => void; selected?: boolean }) {
    return (
        <div id={name} className={`tag flex-cent no-select filter ${name}${selected ? ' selected' : ''}`} tabIndex={0} role="button" onClick={() => clickHandler(name)} onKeyUp={e => (e.key === 'Enter' ? () => clickHandler(name) : undefined)} style={{ filter: 'none' }}>
            {fontaw && <i className={`fa-brands fa-${fontaw}`}></i>}
            {specialBrands[name] && specialBrands[name]}
            <p>{fullName}</p>
        </div>
    );
}
