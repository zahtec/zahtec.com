import { StoredSkill } from '../../pages/skills';
import { specialBrands } from '../icons/special';
import { useState } from 'react';
import Link from 'next/link.js';
import Arrow from './Arrow';

export default function Skill({ fullName, name, desc, fontaw, fontawPrefix = 'brands', hasProjects = true }: StoredSkill) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div id={name} className="load-anim flex card">
            <h1>{fullName}</h1>
            <p>{desc}</p>
            {hasProjects && (
                <Link href={`/projects?f=${name}`}>
                    <a className="flex-cent no-select" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                        <p>See my projects using it</p>
                        <Arrow hovering={isHovering} />
                    </a>
                </Link>
            )}
            {!hasProjects && <p>No projects yet using {fullName}</p>}
            {fontaw && <i className={`fa-${fontawPrefix} fa-${fontaw}`}></i>}
            {specialBrands[name] && specialBrands[name]}
        </div>
    );
}
