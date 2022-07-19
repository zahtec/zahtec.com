export default function Overlay({ filter }: { filter?: boolean }) {
    return (
        <span className={`overlays flex-cent${filter ? ' overlays-filter' : ''}`}>
            <div tabIndex={0}>
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div tabIndex={0}>
                <i className="fa-solid fa-angle-right"></i>
            </div>
        </span>
    );
}
