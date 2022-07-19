export default function loadIn() {
    document.body.style.overflowY = 'overlay';

    let ind = 0;
    document.querySelectorAll('.load-anim').forEach((el: HTMLElement) => {
        const style = window.getComputedStyle(el);
        if (style.display !== 'none') {
            setTimeout(() => {
                el.style.animationPlayState = 'running';
                if (style.pointerEvents === 'none') el.style.pointerEvents = 'all';
            }, ind * 150);
            ind++;
        } else {
            el.style.animationPlayState = 'running';
        }
    });

    document.querySelector('main')!.style.pointerEvents = 'all';
    document.querySelector('nav')!.style.pointerEvents = 'all';
    document.getElementById('burger')!.style.pointerEvents = 'all';
}
