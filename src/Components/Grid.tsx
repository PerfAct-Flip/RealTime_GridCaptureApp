import type { CellOwner } from "../types";
import Cell from "./Cell";

type Props = {
    grid: CellOwner[];
    onCapture: (id: number) => void;
};

export default function Grid({ grid, onCapture }: Props) {
    return (
        <div className="glass-panel p-2 sm:p-4 rounded-xl">
            <div className="grid grid-cols-60 gap-px h-[80vh] max-w-full aspect-square self-center">
                {grid.map((owner, i) => (
                    <Cell key={i} owner={owner} onClick={() => onCapture(i)} />
                ))}
            </div>
        </div>
    );
}

