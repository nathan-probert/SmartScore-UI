import Link from "next/link";
import { Player } from "./Types";

interface PlayerTableProps {
  player1: Player;
  player2: Player;
  player3: Player;
  title?: string;
}

export function TopPicks({ player1, player2, player3, title }: PlayerTableProps) {
  const players = [player1, player2, player3];

  if (!players || players.length === 0) {
    return <div>No players found</div>;
  }

  return (
    <div className="my-2 pb-3 max-w-xl mx-auto">
      <h1 className="text-center text-3xl md:text-4xl p-2">{title}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-foreground text-sm sm:text-base">
          <thead>
            <tr className="bg-grey3">
              <th className="px-0 py-1 border border-foreground text-xs sm:text-sm">Group</th>
              <th className="px-0 py-1 border border-foreground text-xs sm:text-sm">Name</th>
              <th className="px-0 py-1 border border-foreground text-xs sm:text-sm">%</th>
              <th className="px-0 py-1 border border-foreground text-xs sm:text-sm">Team</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id} className="border border-foreground">
                <td className="px-0 py-1 border border-foreground text-center text-sm sm:text-lg">
                  <Link href={`#${index+1}`} className="text-link hover:underline">
                    {index + 1}
                  </Link>
                </td>
                <td className="px-0 py-1 border border-foreground text-center text-sm sm:text-lg truncate max-w-xs">
                    <span className="hidden md:inline">{player.name}</span>
                    <span className="md:hidden">
                      {`${player.name.split(' ')[0][0]}. ${player.name.split(' ').slice(-1)}`}
                    </span>
                    {player.injury_status === 'INJURED' && (
                      <span className="relative inline-block ml-3 group">
                        <span className={`font-bold text-xl ${player.injury_desc === 'Day-To-Day' ? 'text-yellow-500' : 'text-red-600'}`}>⚠</span>
                        <span className={`invisible group-hover:visible absolute text-white text-xs py-1 px-2 rounded -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50 ${player.injury_desc === 'Day-To-Day' ? 'bg-yellow-500' : 'bg-red-600'}`}>
                          {player.injury_desc}
                        </span>
                      </span>
                    )}
                </td>
                <td className="px-0 py-1 border border-foreground text-center text-sm sm:text-lg">{player.stat.toFixed(2)}</td>
                <td className="px-0 py-1 border border-foreground text-center text-sm sm:text-lg">{player.team_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
