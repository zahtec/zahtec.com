export default function Underline({ children, color }: { children: React.ReactNode; color: string }) {
    return <span className={`relative transition-filte duration-500 hover:saturate-200 ${color}`}>{children}</span>;
}
