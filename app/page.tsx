"use client";
import { useState, useEffect } from 'react';
import { PlayerTable } from "@/components/PlayerTable";
import { SmartScoreModeToggle } from "@/components/SmartScoreModeToggle";
import { Player, HistoryEntry } from "@/components/Types";
import { CircleHelp } from "lucide-react";
import { TopPicks } from "@/components/TopPicks";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";
import { HistoryBar } from "@/components/HistoryBar";
import { createClient, SupabaseClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://ftbnnnytottxvgmjwlip.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Ym5ubnl0b3R0eHZnbWp3bGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODE0OTAsImV4cCI6MjA1ODY1NzQ5MH0.bPs4H8KEJ4Akf81Uu5kD9xA0kZIMG1ZsVSlDDQDAmYs";

// Initialize the Supabase client
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);


ChartJS.register(ArcElement, Tooltip, Legend);

function groupHistoryByDay(history: Player[]): HistoryEntry[] {
  const groups: { [date: string]: Player[] } = {};
  const sortedHistory = history
    .filter((player) => player.date && player.Scored !== undefined)
    .sort((a, b) => {
      const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison !== 0) return dateComparison;

      return (a.tims || 0) - (b.tims || 0);
    });

  let mostRecentDate = "";
  sortedHistory.forEach((player) => {
    const dateStr = new Date(player.date).toISOString().split("T")[0];
    if (!mostRecentDate) {
      mostRecentDate = dateStr;
      return;
    }
    if (dateStr === mostRecentDate) return;

    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(player);
  });

  const today = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
  const excludeLatest = mostRecentDate === today;

  // If not excluding, add the latest date to groups
  if (!excludeLatest && mostRecentDate) {
    groups[mostRecentDate] = sortedHistory
      .filter(player => new Date(player.date).toISOString().split("T")[0] === mostRecentDate)
      .slice(0, 3); // Take top 3 for consistency
  }

  // Sort dates ascending (oldest first) and take at most 7 days
  const uniqueDates = Object.keys(groups).sort();
  return uniqueDates.slice(-7).map((dateStr) => {
    const players = groups[dateStr].slice(0, 3);
    const scoredCount = players.filter((p) => p.Scored).length;
    return { date: dateStr, players, scoredCount };
  });
}


async function newFetchPlayers(table_name: string): Promise<Player[]> {
  const { data, error } = await supabase.from(table_name).select('*');
  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }
  if (!data) {
    console.error('No players found');
    return [];
  }

  const players: Player[] = data as Player[];

  return players;
}

export default function PlayerTables() {
  const [sortedPlayers, setSortedPlayers] = useState<{ all: Player[], tims1: Player[], tims2: Player[], tims3: Player[] }>({
    all: [],
    tims1: [],
    tims2: [],
    tims3: []
  });
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pickAccuracy, setPickAccuracy] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const data = await newFetchPlayers(process.env.NODE_ENV === 'production' ? 'Picks-prod' : 'Picks-dev');
        const history = await newFetchPlayers(process.env.NODE_ENV === 'production' ? 'Historic-Picks-prod' : 'Historic-Picks-dev');
        setHistory(groupHistoryByDay(history));

        // Multiply each player's stat by 100%
        const updatedData = data.map(player => ({
          ...player,
          stat: player.stat * 100
        }));

        // Sort the entire array once by stat
        const sortedAllPlayers = updatedData.sort((a, b) => b.stat - a.stat);

        // Create the tims groups from the sorted array
        const tims1: Player[] = sortedAllPlayers.filter(player => Number(player.tims) === 1);
        const tims2: Player[] = sortedAllPlayers.filter(player => Number(player.tims) === 2);
        const tims3: Player[] = sortedAllPlayers.filter(player => Number(player.tims) === 3);

        // Set the sorted players and tims groups in the state
        setSortedPlayers({ all: sortedAllPlayers, tims1, tims2, tims3 });

        // Fetch current pick accuracy metric
        const metricsTable = process.env.NODE_ENV === 'production' ? 'Metrics-prod' : 'Metrics-dev';


        const { data: metricData, error: metricError, status, statusText } = await supabase
          .from(metricsTable)
          .select('*')
          .eq('id', 'current_pick_accuracy')
          .single();
        if (metricError) {
          console.error('[SmartScore] Error fetching pick accuracy metric:', {
            table: metricsTable,
            error: metricError,
            status,
            statusText,
            metricData
          });
        } else if (metricData && typeof metricData.value === 'number') {
          setPickAccuracy(metricData.value);
        } else if (metricData && metricData.value) {
          setPickAccuracy(Number(metricData.value));
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPlayers();
  }, []);

  const handleToggleChange = () => {
    setShowAllPlayers(!showAllPlayers);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/images/loading.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  // Calculate the overall percentage for the pie chart
  const totalPercentage = sortedPlayers.tims1[0]?.stat + sortedPlayers.tims2[0]?.stat + sortedPlayers.tims3[0]?.stat
    - (sortedPlayers.tims1[0]?.stat * sortedPlayers.tims2[0]?.stat / 100)
    - (sortedPlayers.tims1[0]?.stat * sortedPlayers.tims3[0]?.stat / 100)
    - (sortedPlayers.tims2[0]?.stat * sortedPlayers.tims3[0]?.stat / 100)
    + (sortedPlayers.tims1[0]?.stat * sortedPlayers.tims2[0]?.stat * sortedPlayers.tims3[0]?.stat / 10000);

  const chartData = {
    labels: [
      `Percentage Someone Scores (${totalPercentage.toFixed(2)}%)`,
      `Percentage No One Scores (${(100 - totalPercentage).toFixed(2)}%)`
    ],
    datasets: [{
      data: [totalPercentage, 100 - totalPercentage],
      backgroundColor: ['#fa265b', '#666666'],
      borderColor: '#404040',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#dbe1e8' : '#000000',
          font: {
            size: 16,
            weight: 700,
          },
        },
      },
      tooltip: {
        bodyColor: isDarkMode ? '#dbe1e8' : '#000000',
        titleFont: {
          size: 18,
          weight: 700,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    cutout: '60%',
    rotation: 180,
  };

  return (
    <div>

      {/* Desktop: flex row with centered pick percentage; Mobile: stacked layout */}
      {/* Pick percentage centered at the very top (help button removed) */}
      <div className="w-full relative mt-6 md:mt-4 px-4 md:px-10" style={{ minHeight: '70px' }}>
        {pickAccuracy !== null && (
          <div className="flex flex-col items-center justify-center absolute left-1/2 top-0 transform -translate-x-1/2" style={{ width: 'max-content' }}>
            <span className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight">{pickAccuracy.toFixed(2)}%</span>
            <div className="text-lg md:text-2xl text-gray-500 font-medium leading-tight text-center">SmartScore's Current Pick Percentage</div>
          </div>
        )}
      </div>
      {showAllPlayers ? (
        <>
          <PlayerTable players={sortedPlayers.all} title="All Players" />
        </>
      ) : (
        <>
          <HistoryBar history={history} />
          <div className="w-full flex justify-center my-6">
            <div className="w-full max-w-3xl h-1 bg-gray-700 rounded" />
          </div>

          {sortedPlayers.all.length === 0 ? (
            <div className="flex justify-center items-center px-4 text-center">
              <p className="text-2xl md:text-5xl font-bold mt-10 mb-10">No games today, check back tomorrow!</p>
            </div>
          ) : sortedPlayers.tims1.length === 0 && sortedPlayers.tims2.length === 0 && sortedPlayers.tims3.length === 0 ? (
            <div className="flex justify-center items-center px-4 text-center">
              <p className="text-2xl md:text-5xl font-bold mt-10 mb-10">All games have started today, check back tomorrow!</p>
            </div>
          ) : (
            <>
              <TopPicks
                player1={sortedPlayers.tims1.find(p => p.injury_status !== 'INJURED') || sortedPlayers.tims1[0]}
                player2={sortedPlayers.tims2.find(p => p.injury_status !== 'INJURED') || sortedPlayers.tims2[0]}
                player3={sortedPlayers.tims3.find(p => p.injury_status !== 'INJURED') || sortedPlayers.tims3[0]}
                title="Top Picks"
              />
              <div className="flex flex-col items-center mb-8">
                <div className="w-full md:w-1/3" style={{ height: '300px', position: 'relative' }}>
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="w-full flex justify-center my-6">
                <div className="w-full max-w-3xl h-1 bg-gray-700 rounded" />
              </div>
              <PlayerTable players={sortedPlayers.tims1} title="Tims Group 1" />
              <PlayerTable players={sortedPlayers.tims2} title="Tims Group 2" />
              <PlayerTable players={sortedPlayers.tims3} title="Tims Group 3" />
            </>
          )}
        </>
      )}
      {/* Always show the toggle button at the bottom */}
      <div className="flex justify-center mb-24">
        <SmartScoreModeToggle onClick={handleToggleChange} />
      </div>
    </div>
  );
}  
