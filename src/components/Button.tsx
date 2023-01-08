import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, SyntheticEvent } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    href?: string;
    color: "primary" | "secondary";
    onClick?: (e?:SyntheticEvent) => void;
    target?: string
    rel?: string
}

const Button = ({children, target, color, className, href, onClick, style, ...props}: ButtonProps) => {
    
    const defaultClassName = "block transition-all duration-300 w-full px-5 py-2.5 text-lg rounded-full text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

    if (!href) return (
        <button onClick={onClick} style={style} className={`${defaultClassName} ${color === "primary" ? "bg-primary hover:bg-primary-100" : "border-2 border-white text-white hover:scale-105"} ${className ? className : ""}`} {...props}>
            {children}
        </button>
    );
    else if (target) return (
        <a onClick={onClick} style={style} className={`${defaultClassName} ${color === "primary" ? "bg-primary hover:bg-primary-100" : "border-2 border-white text-white hover:scale-105"} ${className ? className : ""}`} href={href} target={target} rel='noreferrer'>
            {children}
        </a>
    )
    return (
        <Link href={href} onClick={onClick} style={style} className={`${defaultClassName} ${color === "primary" ? "bg-primary hover:bg-primary-100" : "border-2 border-white text-white hover:scale-105"} ${className ? className : ""}`}>
            {children}
        </Link>
    );
}

export default Button;