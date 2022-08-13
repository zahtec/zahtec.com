import { Scene, PerspectiveCamera, WebGLRenderer, MeshLambertMaterial, Mesh, DirectionalLight, AmbientLight, Group, Material } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Tween, update, Easing } from '@tweenjs/tween.js';

export default function intro() {
    const ele: HTMLElement = document.getElementById('intro')!;
    const icon: HTMLElement = document.querySelector('nav > img')!;
    const overlay: HTMLElement = document.getElementById('overlay')!;

    const scene = new Scene();
    const cam = new PerspectiveCamera(80, 3, 1, 57);

    const render = new WebGLRenderer({ canvas: ele, antialias: true, alpha: true });
    render.autoClear = false;
    render.setPixelRatio(window.devicePixelRatio * 2);
    ele.style.height = `${ele.clientWidth / 3}px`;

    const light = new DirectionalLight(0xffffff, 3);
    light.position.set(0, 10, 2);

    scene.add(light);
    scene.add(new AmbientLight(0xffffff, 0.7));

    new FontLoader().load('/font.json', font => {
        const text = new Group();
        const letters = ['Z', 'A', 'H', 'T', 'E', 'C'];

        letters.forEach((letter, i) => {
            const mesh = new Mesh(new TextGeometry(letter, { font: font, size: 20, height: 8 }), new MeshLambertMaterial({ color: 0xb224d6 }));

            mesh.position.set(i * 22 - 56, -10, -50);
            mesh.scale.set(0, 0, 0);
            mesh.traverse((child: Mesh) => {
                (child.material as Material).opacity = 0;
                (child.material as Material).transparent = true;
            });
            text.add(mesh);
        });

        scene.add(text);

        new GLTFLoader().load('/icon.gltf', gltf => {
            const obj = gltf.scene;

            obj.rotateX(Math.PI / 2);
            obj.position.z = -2;
            obj.castShadow = true;

            let iter = 0;

            obj.traverse((child: Mesh) => {
                if (!iter) return iter++;

                child.material = new MeshLambertMaterial({ color: 0xb224d6 });
                child.material.opacity = 0;
                child.material.transparent = true;

                const icon_anim = { z: -2, opacity: 0 };
                const text_anim = { x: -56, z: -50, opacity: 0 };

                const icon_update = () => {
                    obj.position.z = icon_anim.z;
                    (child.material as Material).opacity = icon_anim.opacity;
                };

                window.scrollTo(0, 0);

                const textJump = new Tween(text_anim)
                    .to({ x: -65, z: -50, opacity: 1 }, 550)
                    .easing(Easing.Exponential.InOut)
                    .onUpdate(() => {
                        text.children.forEach((letter, i) => {
                            const now = [text_anim.z, text_anim.x, text_anim.opacity];

                            letter.traverse((child: Mesh) => ((child.material as Material).opacity = now[2]));

                            if (i === 2 || i === 3) {
                                letter.scale.set(text_anim.opacity, text_anim.opacity, text_anim.opacity);
                                letter.position.x = text_anim.x + i * 22;
                                letter.position.z = text_anim.z;
                            } else if (i === 1 || i === 4) {
                                setTimeout(() => {
                                    letter.scale.set(now[2], now[2], now[2]);
                                    letter.position.x = now[1] + i * 22;
                                    letter.position.z = now[0];
                                }, 80);
                            } else if (i === 0 || i === 5) {
                                setTimeout(() => {
                                    letter.scale.set(now[2], now[2], now[2]);
                                    letter.position.x = now[1] + i * 22;
                                    letter.position.z = now[0];
                                }, 160);
                            }
                        });
                    })
                    .onComplete(() => {
                        // Remove icon
                        scene.remove(obj);

                        setTimeout(() => {
                            overlay.classList.add('play');
                            ele.classList.add('play');

                            // Wait for text to reach top of page
                            setTimeout(() => {
                                navigator.userAgent.indexOf('Firefox') > -1 ? (document.body.style.overflowY = 'auto') : (document.body.style.overflowY = 'overlay');

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

                                const text_anim_flat = { height: 8 };

                                // Wait until all load animations are finished
                                setTimeout(() => {
                                    document.querySelector('main')!.style.pointerEvents = 'all';
                                    document.querySelector('nav')!.style.pointerEvents = 'all';
                                    document.getElementById('burger')!.style.pointerEvents = 'all';

                                    // Flatten text
                                    new Tween(text_anim_flat)
                                        .to({ height: 4 }, 600)
                                        .easing(Easing.Exponential.InOut)
                                        .onUpdate(() => {
                                            text.children.forEach((letter: Mesh, i) => {
                                                letter.geometry.dispose();
                                                letter.geometry = new TextGeometry(letters[i], { font: font, size: 20, height: text_anim_flat.height });
                                                letter.position.x = i * 22 - 65;
                                            });
                                        })
                                        .onComplete(() => {
                                            // Loop for changing text based on window size

                                            const text_update = () => {
                                                text.children.forEach((letter, i) => {
                                                    const now = text_anim.opacity;
                                                    setTimeout(() => {
                                                        letter.traverse((child: Mesh) => {
                                                            (child.material as Material).opacity = now;
                                                        });
                                                    }, i * 70);
                                                    icon.style.opacity = `${1 - text_anim.opacity}`;
                                                });
                                            };

                                            const fadeout = new Tween(text_anim).to({ opacity: 0 }, 500).easing(Easing.Quartic.Out).onUpdate(text_update);

                                            const fadein = new Tween(text_anim).to({ opacity: 1 }, 500).easing(Easing.Quartic.Out).onUpdate(text_update);

                                            const checkSize = () => {
                                                if (window.innerWidth >= 600) {
                                                    if (text_anim.opacity === 1) fadeout.start();
                                                } else {
                                                    if (text_anim.opacity < 1) fadein.start();
                                                }
                                            };

                                            checkSize();
                                            window.onresize = checkSize;
                                        })
                                        .start();
                                }, ind * 150);
                            }, 800);
                        }, 300);
                    });

                const iconFall = new Tween(icon_anim)
                    .to({ z: -3, opacity: 0 }, 600)
                    .easing(Easing.Exponential.InOut)
                    .onUpdate(icon_update)
                    .delay(100)
                    .onStart(() => textJump.start());

                // Icon Jump
                new Tween(icon_anim).to({ z: -1.5, opacity: 1 }, 700).easing(Easing.Exponential.InOut).onUpdate(icon_update).delay(100).chain(iconFall).start();
                scene.add(obj);
            });
        });
    });

    const animate = (t: number) => {
        requestAnimationFrame(animate);
        update(t);
        render.render(scene, cam);
    };

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {
        console.log('resize');
        const w = window.innerWidth <= 500 ? window.innerWidth : 500;
        const h = w / 3;
        ele.style.height = `${h}px`;
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
    });

    requestAnimationFrame(animate);
}
