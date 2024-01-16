
import { Chip as ChipType } from "../types";

type ChipProps = {
    chip: ChipType;
    highlight: boolean;
    handleClick: () => void
};

const Chip = ({ chip, highlight, handleClick }: ChipProps) => {
    return (
        <div className={`rounded-full flex gap-1 items-center h-8 ${highlight ? "bg-[#bbb]" : "bg-[#dfdfdf]"}`}>
            <img
                src={chip.avatar}
                alt={chip.name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-black/70 truncate">
                {chip.name}
            </div>
            <span
                className="cursor-pointer text-black scale-150 mr-3 ml-1 -translate-y-0.5 hover:text-black/50 hover:scale-125 transition-all duration-200"
                onClick={handleClick}
            >
                ×
            </span>
        </div>
    );
};

export default Chip;