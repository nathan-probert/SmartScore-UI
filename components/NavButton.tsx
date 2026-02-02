import { LucideIcon } from 'lucide-react';
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
    icon: LucideIcon,
    label: string,
    href?: string,
    onClick?: () => void,
}

export function NavButton({
    icon: Icon,
    label,
    href,
    onClick,
}: Props) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            title={label}
            className="rounded-full group"
            asChild
            onClick={onClick}
        >
            {href ? (
                <Link href={href}>
                    <Icon
                        className="nav-icon w-6 h-6 group-hover:scale-125 group-hover:text-primary ease-out transition-[transform,color] group-hover:duration-0 duration-0"
                    />
                </Link>
            ) : (
                <Icon
                    className="nav-icon w-6 h-6 group-hover:scale-125 group-hover:text-primary ease-out transition-[transform,color] group-hover:duration-0 duration-0"
                />
            )}
        </Button>
    )
}
