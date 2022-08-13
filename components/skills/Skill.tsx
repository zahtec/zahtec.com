import { StoredSkill } from '../../pages/skills';
import { specialBrands } from '../icons/special';
import { useState } from 'react';
import Link from 'next/link.js';
import Arrow from './Arrow';

export default function Skill({ fullName, name, desc, fontaw, color, fontawPrefix = 'brands', hasProjects = true }: StoredSkill) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={`load-anim flex w-full min-h-[20rem] items-center rounded-xl justify-center flex-col mb-8 py-8 px-4 relative text-center transition-filter duration-300 overflow-hidden drop-shadow-gr bg-gradient-140 border-solid border-xs ${color[0]} ${color[1]} ${color[2]} hover:drop-shadow-skill`}>
            <h1 className="text-4.5xl">{fullName}</h1>
            <p className="my-5 text-xl leading-6">{desc}</p>
            {hasProjects && (
                <Link href={`/projects?f=${name}`}>
                    <a className="flex justify-center items-center select-none bg-white/30 p-4 rounded-xl will-change-filter transition-filform duration-300 drop-shadow-skill-button hover:drop-shadow-skill-button-hover hover:-translate-y-1 focus-visible:drop-shadow-skill-button focus-visible:-translate-y-1" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                        <p className="text-base">See my projects using it</p>
                        <Arrow hovering={isHovering} />
                    </a>
                </Link>
            )}
            {!hasProjects && <p className="my-5">No projects yet using {fullName}</p>}
            {fontaw && <i className={`fa-${fontawPrefix} fa-${fontaw} text-11xl absolute -bottom-16 -right-8 -z-1 text-white/40`}></i>}
            {specialBrands[name] && <span className="w-48 absolute -bottom-16 -right-8 -z-1 fill-white/40 ">{specialBrands[name]}</span>}
        </div>
    );
}
