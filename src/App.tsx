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
import { AnimatePresence, motion } from "framer-motion";

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
    
    const users = useMemo(() => [...Users], []);    

    useEffect(() => {
        setFilteredItems(
            users.filter((item) => !chips.find((chip) => chip.name.toLowerCase() === item.name.toLowerCase()))
        );
    }, [chips, users]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contRef.current && !contRef.current.contains(event.target as Node)) {
                setShowFilters(false);
                setHighlighted(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setHighlighted(null);
        
        setFilteredItems(
            users.filter((item) => !chips.find((chip) => chip.name.toLowerCase() === item.name.toLowerCase()) && item.name.toLowerCase().includes(value.toLowerCase()))
        );
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
        <div className="flex flex-col gap-8 font-sans p-5">
            <div className="flex flex-wrap gap-2 items-center border-b-2 border-blue-600 pb-1 ">
                <AnimatePresence>
                {chips.map(chip => (
                        <motion.div
                            key={chip.id}
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            exit={{ width: 0 }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                            className={`rounded-full flex gap-1 items-center h-8 ${highlighted?.id === chip.id ? "bg-[#bbb]" : "bg-[#dfdfdf]"}`}
                            
                        >
                            <img src={chip.avatar} alt={chip.name} className="w-8 h-8 rounded-full object-cover" />
                            <div className="text-black/70 truncate">
                                {chip.name}
                            </div>

                            <span 
                                className="cursor-pointer text-black scale-150 mr-3 ml-1 -translate-y-0.5 hover:text-black/50 hover:scale-125 transition-all duration-200"
                                onClick={() => removeChip(chip.id)}
                                >
                                ×
                            </span>
                        </motion.div>
                ))}
                </AnimatePresence>
                <div className="relative" ref={contRef}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={() => setShowFilters(true)}
                        placeholder="Type here..."
                        className="p-2 border-none outline-none"
                    />

                
                    <div className={`absolute top-[calc(100%+6px)] left-0 bg-gray-200  overflow-y-auto  [&::-webkit-scrollbar]:hidden z-10 ${showFilters ? "max-h-56" : "max-h-0"} transition-all duration-200`}>
                        {filteredItems.map((item) => {
                            const startIndex = item.name.toLowerCase().indexOf(inputValue.toLowerCase());
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
                                                className={`${index >= startIndex && index < endIndex && "font-extrabold"}`}
                                            >
                                                {letter}
                                            </span>
                                        ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
