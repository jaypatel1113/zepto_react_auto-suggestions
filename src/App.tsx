// App.tsx
import React, {
    useState,
    useEffect,
    useRef,
    KeyboardEvent,
    useMemo,
} from "react";
import "./App.css";
import { Users } from "./constants";

export interface Chip {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [chips, setChips] = useState<Chip[]>([]);
    const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [highlighted, setHighlighted] = useState<Chip | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const contRef = useRef<HTMLDivElement>(null);
    
    const users = useMemo(() => [...Users], [Users]);    

    useEffect(() => {
        setFilteredItems(
            users.filter((item) => !chips.find((chip) => chip.name.toLowerCase() === item.name.toLowerCase()))
        );
    }, [chips, users]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contRef.current && !contRef.current.contains(event.target as Node)) {
                setShowFilters(false);
            }
        };
        setHighlighted(null);

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setHighlighted(null);

        if (value === "" && chips.length > 0) {
            highlightLastChip();
        } else {
            setFilteredItems(
                users.filter((item) => !chips.find((chip) => chip.name.toLowerCase() === item.name.toLowerCase()) && item.name.toLowerCase().includes(value.toLowerCase()))
            );
        }
    };

    const highlightLastChip = () => {
        const lastChip = document.querySelector(".chip:last-child");
        if (lastChip) {
            lastChip.classList.add("bg-red-200");
        }
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (
            event.key === "Backspace" &&
            inputValue === "" &&
            chips.length > 0
        ) {
            if(highlighted === null) {
                setHighlighted(chips[chips.length-1])
            } else {
                removeLastChip();
            }
            event.preventDefault();
        }
    };

    const addChip = (item: Chip) => {
        setChips((prevChips) => [...prevChips, item]);
        setInputValue("");
        setShowFilters(false); 
        setHighlighted(null);
    };

    const removeChip = (id: number) => {
        setChips((prevChips) => prevChips.filter((chip) => chip.id !== id));
        setHighlighted(null);
    };

    const removeLastChip = () => {
        const lastChip = chips[chips.length - 1];
        if (lastChip) {
            removeChip(lastChip.id);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-8">
                {chips.map(chip => (
                    <div
                        key={chip.id}
                        className={`text-white rounded px-2 py-1 flex items-center cursor-pointer ${highlighted?.id === chip.id ? "bg-red-500" : "bg-green-500"}`}
                        onClick={() => removeChip(chip.id)}
                    >
                        {chip.name}
                        <span className="ml-2 cursor-pointer">×</span>
                    </div>
                ))}
                <div className="relative" ref={contRef}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={() => setShowFilters(true)}
                        placeholder="Type here..."
                        className="p-2"
                    />

                    {showFilters && (
                        <div className="absolute top-full left-0 bg-gray-200 border border-gray-300 max-h-32 overflow-y-auto z-10">
                            {filteredItems.map((item) => {
                                const startIndex = item.name.toLowerCase().indexOf(inputValue.toLowerCase());
                                const endIndex = startIndex + inputValue.length;

                                return (
                                    <div
                                        key={item.id}
                                        className="p-2 cursor-pointer"
                                        onClick={() => addChip(item)}
                                    >
                                        {item.name.split("").map((letter, index) => (
                                                <span
                                                    key={index}
                                                    className={`${index >= startIndex && index < endIndex && "font-extrabold"}`}
                                                >
                                                    {letter}
                                                </span>
                                            ))}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
