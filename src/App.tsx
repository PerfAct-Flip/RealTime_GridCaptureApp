import { useEffect, useState } from "react";
import Grid from "./Components/Grid";
import { socket } from "./socket";
import type { CellOwner } from "./types";

const TOTAL_CELLS = 60 * 60;

function getColorFromUsername(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 55%)`;
}

export default function App() {
  const [grid, setGrid] = useState<CellOwner[]>(
    Array(TOTAL_CELLS).fill(null)
  );
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [onlineCount, setOnlineCount] = useState(0);
  /* ---------------- SOCKET EVENTS ---------------- */

  useEffect(() => {
    if (!joined) return;

    socket.connect();

    socket.on("grid:init", (serverGrid: CellOwner[]) => {
      setGrid(serverGrid);
    });

    socket.on("players:count", (count: number) => {
      setOnlineCount(count);
    });

    socket.on(
      "grid:update",
      ({ cellId, owner }: { cellId: number; owner: CellOwner }) => {
        setGrid((prev) => {
          const next = [...prev];
          next[cellId] = owner;
          return next;
        });
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [joined]);
  const handleJoin = () => {
    if (!username.trim()) return;

    const color = getColorFromUsername(username);
    localStorage.setItem("username", username);
    socket.emit("join", { username, color });
    setJoined(true);
  };

  const handleCapture = (cellId: number) => {
    socket.emit("capture", { cellId });
  };

  if (!joined) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl shadow-2xl space-y-6 w-full max-w-sm border-white/10">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Pixels<span className="text-brand-blue">.io</span>
            </h1>
            <p className="text-white/50 text-sm">Join the global conquest</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-white/40 ml-1">Username</label>
              <div className="relative group">
                <input
                  className="w-full p-4 pl-12 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 transition-all text-white placeholder-white/20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your handle..."
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                />
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/10 transition-colors duration-300"
                  style={{ backgroundColor: username ? getColorFromUsername(username) : 'rgba(255,255,255,0.1)' }}
                />
              </div>
            </div>

            <button
              onClick={handleJoin}
              className="w-full bg-brand-blue hover:bg-blue-500 text-white p-4 rounded-xl font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Enter Grid
            </button>
          </div>
        </div>
      </div>
    );
  }

  const capturedCount = grid.filter(cell => cell?.username === username).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 pt-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-white/40">
          Capture Grid
        </h1>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/70">{onlineCount || 1} ONLINE</span>
          </div>
          <div className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-brand-blue">
            {capturedCount} PIXELS OWNED
          </div>
        </div>
      </header>

      <Grid grid={grid} onCapture={handleCapture} />

      <footer className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium mt-4">
        Click squares to claim your territory
      </footer>
    </div>
  );
}

