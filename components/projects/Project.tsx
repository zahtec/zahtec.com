import { StoredProject } from '../../pages/projects';
import TagRow from './TagRow';

export default function Project({ fullName, name, desc, tags, imageAlt, link, overlay = true }: StoredProject) {
    return (
        <div className={`load-anim flex w-full rounded-xl justify-center flex-col mb-20 relative overflow-hidden leading-7 ${name} bg-no-repeat bg-center bg-cover`} z-tags={tags.map(tag => tag.name)}>
            <div className="h-full w-full bg-project from-accent pt-60 px-4 pb-4 transition-padding duration-300 xl:hover:pt-64" aria-label={imageAlt}>
                <div className="flex items-center w-100 justify-between">
                    <h1 className="text-3xl">{fullName}</h1>
                    {link && (
                        <a href={link} target="_blank" className="text-2xl transition-colors duration-300 hover:text-hover">
                            <i className="fa-solid fa-square-arrow-up-right"></i>
                        </a>
                    )}
                </div>
                <p className="max-w-720 my-8">{desc}</p>
                <TagRow tags={tags} overlay={overlay} />
            </div>
        </div>
    );
}
