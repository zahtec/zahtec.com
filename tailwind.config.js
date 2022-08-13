/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '400px',
            md: '600px',
            lg: '700px',
            xl: '800px',

            sh: { raw: '(min-width: 600px) and (max-height: 645px)' },
            mh: { raw: '(min-width: 600px) and (max-height: 850px)' }
        },
        extend: {
            colors: {
                accent: '#121212',
                accentwo: '#4b4b4b',
                hover: '#646464',
                highlight: '#4670db',
                red: {
                    DEFAULT: '#ff4949',
                    dark: '#b52929'
                },
                brown: {
                    DEFAULT: '#f8ae69',
                    dark: '#cf8642'
                },
                orange: {
                    DEFAULT: '#ff9c40',
                    dark: '#c9772a'
                },
                yellow: {
                    DEFAULT: '#e3d44c',
                    dark: '#beaf2a'
                },
                green: {
                    DEFAULT: '#68ff5a',
                    dark: '#2fac24',
                    discord: '#5aa364'
                },
                blue: {
                    DEFAULT: '#638fff',
                    dark: '#254eb7'
                },
                teal: {
                    DEFAULT: '#6af5fe',
                    dark: '#43ccd3'
                },
                purple: {
                    DEFAULT: '#b224d7',
                    dark: '#860f9b'
                },
                magenta: {
                    DEFAULT: '#ff3770',
                    dark: '#ab0b6e'
                }
            },
            spacing: {
                icon: '0.5rem',
                album: '2.4rem',
                toryn: '7rem'
            },
            aspectRatio: {
                intro: '3/1'
            },
            fontFamily: {
                main: ['Roboto', 'helvetica', 'arial', 'sans-serif']
            },
            fontSize: {
                '2.7xl': '1.7rem',
                '4xl': '2rem',
                '4.5xl': '2.5rem',
                '11xl': '12rem'
            },
            transitionDuration: {
                400: '400ms',
                800: '800ms'
            },
            transitionProperty: {
                'margin-left': 'margin-left',
                intro: 'top, width, opacity',
                top: 'top',
                filter: 'filter',
                width: 'width',
                tropacity: 'opacity, transform',
                overlay: 'color, opacity, transform',
                tag: 'filter, opacity, margin',
                filform: 'filter, transform'
            },
            dropShadow: {
                nav: '0 0 0.5rem rgba(255, 255, 255, 0.7)',
                this: `0 0 0.5rem currentColor`,
                burger: '0 0 0.4rem black',
                gr: '0 0 0.5rem var(--tw-gradient-from)',
                'gr-hover': '0 0 1.5rem var(--tw-gradient-from)',
                skill: '0 0 1rem var(--tw-gradient-from)',
                tag: '0 0 0.7rem var(--tw-gradient-from)',
                'skill-button': '0 0.5rem 1rem rgba(0, 0, 0, 0.7)',
                'skill-button-hover': '0 0.8rem 1.3rem rgba(0, 0, 0, 0.9)'
            },
            willChange: {
                margin: 'margin',
                filter: 'filter'
            },
            maxWidth: {
                500: '500px',
                720: '720px',
                1200: '1200px'
            },
            minWidth: {
                40: '10rem'
            },
            inset: {
                90: '90%',
                intro: 'calc(50vh - (100vw / 3) / 2)',
                'intro-scaled': 'calc(50vh - 166.66px / 2)',
                80: '80%'
            },
            width: {
                'intro-scaled': 'calc(100% - 5rem);'
            },
            height: {
                burger: '0.3rem'
            },
            translate: {
                load: '1vh',
                burger: '0.65rem',
                underline: '0.15rem'
            },
            keyframes: {
                load: {
                    '100%': {
                        transform: 'none',
                        opacity: 1
                    }
                }
            },
            animation: {
                load: 'load 0.3s ease-out 0s forwards paused'
            },
            backgroundImage: {
                'gradient-140': 'linear-gradient(140deg, var(--tw-gradient-from), var(--tw-gradient-to))',
                project: 'linear-gradient(0deg, var(--tw-gradient-from) 50%, transparent)',
                overlay: 'linear-gradient(90deg, var(--tw-gradient-from) 4.5%, transparent 20%, transparent 80%, var(--tw-gradient-from) 94.5%);',
                'overlay-lg': 'linear-gradient(90deg, var(--tw-gradient-from) 3%, transparent 10%, transparent 90%, var(--tw-gradient-from) 97%);'
            },
            borderWidth: {
                xs: '0.1rem'
            },
            zIndex: {
                '-1': '-1'
            }
        }
    },
    plugins: []
};
