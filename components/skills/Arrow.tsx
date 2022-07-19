export default function Arrow({ hovering }: { hovering: boolean }) {
    return (
        <svg viewBox="0 0 60 48">
            <rect x="15" y="20" width="15" height="6" rx="3" fill="white" opacity={hovering ? 1 : 0} style={hovering ? { width: '2.5rem' } : undefined} />
            <path d="M5.37409 0.657394C4.0803 -0.377635 2.19242 -0.167871 1.15739 1.12591C0.122365 2.4197 0.332129 4.30758 1.62591 5.34261L5.37409 0.657394ZM1.0403 42.7285C-0.214198 43.8108 -0.353782 45.7052 0.72853 46.9597C1.81084 48.2142 3.7052 48.3538 4.9597 47.2715L1.0403 42.7285ZM27.5602 22.2482L25.6861 24.5908L27.5602 22.2482ZM27.5887 23.7862L29.5484 26.0577L27.5887 23.7862ZM29.4343 19.9056L5.37409 0.657394L1.62591 5.34261L25.6861 24.5908L29.4343 19.9056ZM25.629 21.5147L1.0403 42.7285L4.9597 47.2715L29.5484 26.0577L25.629 21.5147ZM25.6861 24.5908C24.709 23.8091 24.6816 22.3321 25.629 21.5147L29.5484 26.0577C31.4434 24.4228 31.3886 21.469 29.4343 19.9056L25.6861 24.5908Z" fill="white" style={hovering ? { transform: 'translateX(1.8rem)' } : undefined} />
        </svg>
    );
}
