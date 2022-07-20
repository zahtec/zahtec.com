export default function Underline({ children, color }: { children: React.ReactNode; color: string }) {
    return <span className={`relative transition-filte duration-500 after:absolute after:left-0 after:inline-block after:top-90 after:w-full after:border-b-2 after:border-solid after:rounded-sm after:will-change-transform after:transition-transform after:duration-300 after:border-current hover:saturate-200 hover:after:translate-y-underline ${color}`}>{children}</span>;
}
