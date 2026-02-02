import { Player } from "./Types";

interface PlayerTableProps {
  players: Player[];
  title?: string;
}

export function PlayerTable({ players, title }: PlayerTableProps) {
  if (!players || players.length === 0) {
    return <div>No players found</div>;
  }

  const lastCharacterId = title ? title.slice(-1) : "default-id";

  return (
    <div className="pt-10 pb-10" id={lastCharacterId}>
      <h1 className="text-center text-3xl md:text-4xl p-3">{title}</h1>
      <div className="md:overflow-visible overflow-x-auto">
        <table className="min-w-full table-auto border-spacing-0 border-separate">
          <thead>
            <tr>
              <th className="cursor-default sticky left-0 z-10 bg-grey3 text-md md:text-2xl text-grey2 w-1/5 md:px-4 md:py-2 border border-grey2 group">
                Name
                <span className="z-20 invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Player Name
                </span>
              </th>
              <th className="cursor-default sticky left-[20%] z-10 bg-grey3 text-md md:text-2xl text-grey2 px-0 py-2 border border-grey2 group">
                %
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Probability of scoring today
                </span>
              </th>
              <th className="group cursor-default text-md md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                Team
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Player&apos;s Team
                </span>
              </th>
              <th className="group cursor-default text-md md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                5GPG
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Goals Per Game in Last 5 Games
                </span>
              </th>
              <th className="group cursor-default text-lg md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                GPG
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Goals Per Game
                </span>
              </th>
              <th className="group cursor-default text-lg md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                HGPG
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Historic GPG (last 3 seasons)
                </span>
              </th>
              <th className="group cursor-default text-lg md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                TGPG
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Team&apos;s Goals Per Game
                </span>
              </th>
              <th className="group cursor-default text-md md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center relative">
                OTGA
                <span className="invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Other Team&apos;s Goals Against Average
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id} className={`${index % 2 === 1 ? 'bg-grey3' : 'bg-background'}`}>
                <td
                  className={`sticky left-0 z-10 py-2 md:text-xl text-xs border border-grey2 text-center whitespace-nowrap ${index % 2 === 1 ? 'bg-grey3' : 'bg-background'}`}
                >
                  <a href={`https://www.nhl.com/player/${player.player_id}`} target="_blank" className="text-link hover:underline">
                    <span className="hidden md:inline">{player.name}</span>
                    <span className="md:hidden">
                      {`${player.name.split(' ')[0][0]}. ${player.name.split(' ').slice(-1)}`}
                    </span>
                  </a>
                  {player.injury_status === 'INJURED' && (
                    <span className="relative inline-block ml-2 mr-1 group">
                      <span className={`font-bold text-xl ${player.injury_desc === 'Day-To-Day' ? 'text-yellow-500' : 'text-red-500'}`}>⚠</span>
                      <span className={`invisible group-hover:visible absolute text-white text-s py-1 px-2 rounded -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50 ${player.injury_desc === 'Day-To-Day' ? 'bg-yellow-600' : 'bg-red-500'}`}>
                        {player.injury_desc}
                      </span>
                    </span>
                  )}
                </td>
                <td
                  className={`sticky left-[20%] z-10 px-2 py-2 md:text-xl text-sm border border-grey2 text-center ${index % 2 === 1 ? 'bg-grey3' : 'bg-background'}`}
                >
                  {player.stat.toFixed(2)}
                </td>
                <td className="px-2 py-2 md:text-lg text-xs border border-grey2 text-center">{player.team_name}</td>
                <td className="px-2 py-2 md:text-xl text-sm border border-grey2 text-center">{player.five_gpg.toFixed(2)}</td>
                <td className="px-2 py-2 md:text-xl text-sm border border-grey2 text-center">{player.gpg.toFixed(2)}</td>
                <td className="px-2 py-2 md:text-xl text-sm border border-grey2 text-center">{player.hgpg.toFixed(2)}</td>
                <td className="px-2 py-2 md:text-xl text-sm border border-grey2 text-center">{player.tgpg.toFixed(2)}</td>
                <td className="px-2 py-2 md:text-xl text-sm border border-grey2 text-center">{player.otga.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
