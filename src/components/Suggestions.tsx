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
            className={`absolute top-[calc(100%+6px)] left-0 bg-gray-200  overflow-y-auto [&::-webkit-scrollbar]:hidden z-10 ${
                showFilters ? "max-h-56" : "max-h-0"
            } transition-all duration-200`}
        >
            {filteredItems.map((item) => {
                const startIndex = item.name
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase());
                const endIndex = startIndex + inputValue.length;

                return (
                    <div
                        key={item.id}
                        className="p-2 cursor-pointer hover:bg-[#ccc]/40"
                        onClick={() => addChip(item)}
                    >
                        {item.name.split("").map((letter, index) => (
                            <span
                                key={index}
                                className={`${
                                    index >= startIndex &&
                                    index < endIndex &&
                                    "font-extrabold"
                                }`}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Suggestions;
