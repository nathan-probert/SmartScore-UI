"use client";

import {
    HomeIcon,
    CircleUserRound,
    CircleHelp,
    ExternalLink,
} from 'lucide-react'; // Import your desired icons

import { NavButton } from './NavButton';
import { ModeToggle } from './ModeToggle';

export function Header() {
    return (
        <header className="h-20 pt-6 sticky top-0 z-20 bg-background pb-3 border-b border-primary">
            <div className="flex h-full items-center justify-between w-full">
                <div className="flex items-center gap-8">
                    <NavButton href="/" label="Home" icon={HomeIcon} />
                    <NavButton href="https://nathanprobert.ca" label="Personal Site" icon={ExternalLink} />
                </div>

                <div className="flex items-center gap-8">
                    <NavButton href="/account" label="Account" icon={CircleUserRound} />
                    <NavButton href="/help" label="Help" icon={CircleHelp} />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
