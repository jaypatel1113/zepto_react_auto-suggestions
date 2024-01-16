import { Chip } from "../types";

type SuggestionProps = {
    showFilters: boolean, 
    filteredItems: Chip[], 
    inputValue: string, 
    addChip: (i: Chip) => void
}

const Suggestions = ({showFilters, filteredItems, inputValue, addChip}: SuggestionProps) => {
    return (
        <div
            className={`absolute top-[calc(100%+6px)] min-w-max left-0 bg-gray-200  overflow-y-auto [&::-webkit-scrollbar]:hidden z-10 ${showFilters ? "max-h-80" : "max-h-0"} transition-all duration-200`}
        >
            {filteredItems.map((item) => {
                const startIndex = item.name.toLowerCase().indexOf(inputValue.toLowerCase());
                const endIndex = startIndex + inputValue.length;

                return (
                    <div
                        key={item.id}
                        className="cursor-pointer hover:bg-[#ccc]/40 p-3 flex gap-3 items-center justify-between "
                        onClick={() => addChip(item)}
                    >

                        <div className="flex items-center gap-2">
                            <img
                                src={item.avatar}
                                alt={item.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                                {item.name.split("").map((letter, index) => (
                                    <span
                                        key={index}
                                        className={`${(index >= startIndex && index < endIndex) ? "font-extrabold text-black" : "font-medium text-black/80"}`}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-black/40 text-sm font-medium">
                            {item.email}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Suggestions;
