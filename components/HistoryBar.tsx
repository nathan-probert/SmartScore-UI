"use client";

import { HistoryEntry } from "./Types";

const formatName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
    }
    return name;
};

export function HistoryBar({ history }: { history: HistoryEntry[] }) {
    return (
        <div className="flex flex-col items-center mt-6">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg flex justify-center mb-6 px-2">
                {/* Background line */}
                <div className={`absolute top-1/2 w-11/12 h-1 bg-grey5`}></div>

                {/* History icons with space-between */}
                <div className="flex justify-between items-center w-full relative">
                    {history.map((entry, index) => (
                        <div key={index} className="relative group">
                            <div className={`p-1 rounded-full bg-grey5`}>
                                {entry.scoredCount === 0 && <span className="text-2xl sm:text-3xl">💔</span>}
                                {entry.scoredCount === 1 && <span className="text-2xl sm:text-3xl">🔥</span>}
                                {entry.scoredCount === 2 && <span className="text-2xl sm:text-3xl">🚀</span>}
                                {entry.scoredCount === 3 && <span className="text-2xl sm:text-3xl">🏆</span>}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50 w-max max-w-[200px] sm:max-w-[250px]">
                                <div className="bg-grey5 text-fg text-xs sm:text-sm p-2 rounded shadow-lg">
                                    <div className="mb-1 font-bold text-center">{entry.date}</div>
                                    {entry.players.map((player) => (
                                        <div key={player.id || player.name} className="grid grid-cols-[auto_auto] items-center gap-2 sm:gap-4">
                                            <span className="w-22 sm:w-30">{formatName(player.name)}:</span>
                                            <span className="text-right">{player.Scored ? '✅' : '❌'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
