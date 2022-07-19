import { StoredProject } from '../../pages/projects';
import Overlay from './Overlay';
import Tag from './Tag';

export default function Project({ fullName, name, desc, tags, imageAlt, link, overlay = true }: StoredProject) {
    return (
        <div id={name} className="load-anim flex project" z-tags={tags.map(tag => tag.name)}>
            <div className="wrapper" aria-label={imageAlt}>
                <div className="flex-cent">
                    <h1>{fullName}</h1>
                    {link && (
                        <a href={link} target="_blank">
                            <i className="fa-solid fa-square-arrow-up-right"></i>
                        </a>
                    )}
                </div>
                <p>{desc}</p>
                <div className={`tags flex no-scroll${overlay ? '' : ' no-hover'}`}>
                    {tags.map(tag => {
                        return <Tag fullName={tag.fullName} name={tag.name} fontaw={tag.fontaw! && tag.fontaw} key={tag.name} />;
                    })}
                </div>
                {overlay && <Overlay />}
            </div>
        </div>
    );
}
