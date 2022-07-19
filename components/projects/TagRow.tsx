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
            <div id={clickHandler ? 'filters' : undefined} className={`tags flex no-scroll${overlay ? '' : ' no-hover'}`} onScroll={scrollHandler} ref={tagsElement}>
                {tags.map(tag => {
                    if (clickHandler) return <Filter fullName={tag.fullName} name={tag.name} fontaw={tag.fontaw! && tag.fontaw} key={tag.name} clickHandler={clickHandler} selected={filtering!.includes(tag.name)} />;
                    else return <Tag fullName={tag.fullName} name={tag.name} fontaw={tag.fontaw! && tag.fontaw} key={tag.name} />;
                })}
            </div>
            {overlay && (
                <>
                    <span className={`overlays flex-cent${clickHandler ? ' overlays-filter' : ''}`} style={disabledArrows === 3 ? { opacity: 0 } : {}}>
                        <div
                            tabIndex={0}
                            onClick={() => {
                                interactHandler(false);
                            }}
                            onKeyUp={e => {
                                if (e.key !== 'Enter') return;
                                interactHandler(false);
                            }}
                            style={disabledArrows === 1 || disabledArrows === 3 ? { pointerEvents: 'none', cursor: 'default', opacity: 0 } : {}}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <div
                            tabIndex={0}
                            onClick={() => {
                                interactHandler(true);
                            }}
                            onKeyUp={e => {
                                if (e.key !== 'Enter') return;
                                interactHandler(true);
                            }}
                            style={disabledArrows === 2 || disabledArrows === 3 ? { pointerEvents: 'none', cursor: 'default', opacity: 0 } : {}}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </span>
                </>
            )}
        </>
    );
}
