import { specialBrands } from '../icons/special';

export default function Tag({ fullName, name, fontaw, filter = false }: { fullName: string; name: string; fontaw?: string; filter?: boolean }) {
    return (
        <div id={name} className={`tag flex-cent no-select ${name}`} tabIndex={filter ? 0 : undefined} role={filter ? 'button' : undefined} style={filter ? { cursor: 'pointer' } : undefined}>
            {fontaw && <i className={`fa-brands fa-${fontaw}`}></i>}
            {specialBrands[name] && specialBrands[name]}
            <p>{fullName}</p>
        </div>
    );
}
