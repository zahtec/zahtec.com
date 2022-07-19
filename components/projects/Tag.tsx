import { StoredTag } from '../../pages/projects';
import { specialBrands } from '../icons/special';

export default function Tag({ fullName, name, fontaw, filter = false }: StoredTag) {
    return (
        <div id={name} className={`tag flex-cent no-select ${name}`} tabIndex={filter ? 0 : undefined} role={filter ? 'button' : undefined}>
            {fontaw && <i className={`fa-brands fa-${fontaw}`}></i>}
            {specialBrands[name] && specialBrands[name]}
            <p>{fullName}</p>
        </div>
    );
}
