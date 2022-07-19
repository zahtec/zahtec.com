export default function Overlay() {
    return (
        <span className="overlays flex-cent">
            <div tabIndex={0}>
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div tabIndex={0}>
                <i className="fa-solid fa-angle-right"></i>
            </div>
        </span>
    );
}
