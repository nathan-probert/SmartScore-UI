import type { ReactNode } from "react";
import { Player } from "./Types";

interface PlayerTableProps {
  players: Player[];
  title?: string;
  /** true = show every stat column, false = show a simple summary */
  advanced?: boolean;
}

// Shared classes so every header/cell stays consistent
const TH_BASE =
  "group cursor-default relative text-md md:text-2xl text-grey2 px-4 py-2 bg-grey3 border border-grey2 text-center";
const TH_TOOLTIP =
  "invisible group-hover:visible absolute bg-black text-white text-sm p-2 rounded-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20";

type StatColumn = {
  label: string;
  /** Shown only in advanced mode when true */
  advancedOnly?: boolean;
  tooltip: string;
  render: (player: Player) => ReactNode;
};

// The name/percent columns are rendered separately because they are sticky,
// so this config only covers the scrollable stat columns.
const STAT_COLUMNS: StatColumn[] = [
  {
    label: "Team",
    tooltip: "The NHL team the player is on",
    render: (player) => player.team_name,
  },
  {
    label: "5GPG",
    advancedOnly: true,
    tooltip: "Goals per game over the player's last 5 games (recent form)",
    render: (player) => player.five_gpg.toFixed(2),
  },
  {
    label: "GPG",
    advancedOnly: true,
    tooltip: "Season goals per game",
    render: (player) => player.gpg.toFixed(2),
  },
  {
    label: "HGPG",
    advancedOnly: true,
    tooltip: "Historic goals per game, averaged over the player's last 3 seasons",
    render: (player) => player.hgpg.toFixed(2),
  },
  {
    label: "TGPG",
    advancedOnly: true,
    tooltip: "Goals per game scored by the player's team",
    render: (player) => player.tgpg.toFixed(2),
  },
  {
    label: "OTGA",
    advancedOnly: true,
    tooltip: "Goals against average of the opposing team's defence",
    render: (player) => player.otga.toFixed(2),
  },
];

export function PlayerTable({ players, title, advanced = false }: PlayerTableProps) {
  if (!players || players.length === 0) {
    return <div>No players found</div>;
  }

  const visibleColumns = advanced ? STAT_COLUMNS : STAT_COLUMNS.filter((c) => !c.advancedOnly);
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
                <span className={TH_TOOLTIP}>Player Name</span>
              </th>
              <th className="cursor-default sticky left-[20%] z-10 bg-grey3 text-md md:text-2xl text-grey2 px-0 py-2 border border-grey2 group">
                %
                <span className={TH_TOOLTIP}>
                  SmartScore: the player&apos;s probability of scoring a goal in today&apos;s game
                  {advanced ? ", based on all the factors to the right" : ", based on the player's underlying performance factors"}
                </span>
              </th>
              {visibleColumns.map((column) => (
                <th key={column.label} className={TH_BASE}>
                  {column.label}
                  <span className={TH_TOOLTIP}>{column.tooltip}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => {
              const rowBg = index % 2 === 1 ? "bg-grey3" : "bg-background";
              return (
                <tr key={player.id} className={rowBg}>
                  <td
                    className={`sticky left-0 z-10 py-2 md:text-xl text-xs border border-grey2 text-center whitespace-nowrap ${rowBg}`}
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
                    className={`sticky left-[20%] z-10 px-2 py-2 md:text-xl text-sm border border-grey2 text-center ${rowBg}`}
                  >
                    {player.stat.toFixed(2)}
                  </td>
                  {visibleColumns.map((column) => (
                    <td
                      key={column.label}
                      className="px-2 py-2 md:text-lg text-xs border border-grey2 text-center"
                    >
                      {column.render(player)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
