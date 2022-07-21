import { useState, useRef, useEffect } from 'react';
import Filter from './Filter';
import { StoredTag } from '../../pages/projects';
import Tag from './Tag';

export default function TagRow({ overlay = true, tags, clickHandler, filtering }: { overlay?: boolean; tags: StoredTag[]; clickHandler?: (name: string) => void; filtering?: string[] }) {
    const [disabledArrows, setDisabledArrows] = useState(1);
    const tagsElement = useRef<HTMLDivElement>(null);

    const scrollHandler = () => {
        if (!tagsElement.current) return;
        if (tagsElement.current.clientWidth >= tagsElement.current.scrollWidth) setDisabledArrows(3);
        else if (tagsElement.current.scrollWidth! - tagsElement.current.scrollLeft - 3 <= tagsElement.current.clientWidth) setDisabledArrows(2);
        else if (tagsElement.current.scrollLeft <= 0) setDisabledArrows(1);
        else setDisabledArrows(0);
    };

    const interactHandler = (side: boolean) => {
        tagsElement.current!.scrollBy({ left: side ? 130 : -130, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollHandler();

        // react has no onResize attribute]
        new ResizeObserver(scrollHandler).observe(tagsElement.current!);
    }, []);

    return (
        <>
            <div className="gap-4 overflow-auto snap-x snap-proximity py-6 relative mx-auto flex no-scroll" onScroll={scrollHandler} ref={tagsElement}>
                {tags.map(tag => {
                    if (clickHandler) return <Filter fullName={tag.fullName} name={tag.name} fontaw={tag.fontaw! && tag.fontaw} key={tag.name} clickHandler={clickHandler} selected={filtering!.includes(tag.name)} color={tag.color} />;
                    else return <Tag fullName={tag.fullName} name={tag.name} fontaw={tag.fontaw! && tag.fontaw} key={tag.name} color={tag.color} noMargin={tags.length === 1 || disabledArrows == 3} />;
                })}
            </div>
            {overlay && (
                <>
                    <span className={`absolute flex items-center justify-between bg-overlay lg:bg-overlay-lg from-accent left-0 w-full h-28 pointer-events-none transition-opacity duration-300 ${clickHandler ? ' bottom-0 from-black' : ' bottom-4'}${disabledArrows === 3 ? ' opacity-0' : ''}`}>
                        <div
                            className={`h-full flex items-center cursor-pointer pointer-events-auto transition-overlay duration-300 text-white/50 w-12 hover:text-white/80 focus-visible:text-white/80 justify-start ${clickHandler ? ' w-8' : ' w-12'}${disabledArrows === 1 || disabledArrows === 3 ? ' pointer-events-none cursor-default opacity-0' : ''}`}
                            tabIndex={0}
                            onClick={() => {
                                interactHandler(false);
                            }}
                            onKeyUp={e => {
                                if (e.key !== 'Enter') return;
                                interactHandler(false);
                            }}
                        >
                            <i className={`fa-solid fa-angle-left ${clickHandler ? 'xl:transform-none' : 'ml-6'}`}></i>
                        </div>
                        <div
                            className={`h-full flex items-center cursor-pointer pointer-events-auto transition-overlay duration-300 text-white/50 w-12 hover:text-white/80 focus-visible:text-white/80 justify-end ${clickHandler ? ' w-8' : ' w-12'}${disabledArrows === 2 || disabledArrows === 3 ? ' pointer-events-none cursor-default opacity-0' : ''}`}
                            tabIndex={0}
                            onClick={() => {
                                interactHandler(true);
                            }}
                            onKeyUp={e => {
                                if (e.key !== 'Enter') return;
                                interactHandler(true);
                            }}
                        >
                            <i className={`fa-solid fa-angle-right ${clickHandler ? 'xl:transform-none' : 'mr-6'}`}></i>
                        </div>
                    </span>
                </>
            )}
        </>
    );
}
