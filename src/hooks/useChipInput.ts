import { useState, useEffect, useRef, KeyboardEvent, useMemo } from "react";

import { Users } from "../constants";
import type { Chip } from "../types";

export const useChipInput = () => {
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
            if (
                contRef.current &&
                !contRef.current.contains(event.target as Node)
            ) {
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
            console.log(highlighted);
            
            if (highlighted === null) {
                setHighlighted(chips[chips.length - 1]);
                // inputRef.current?.blur();
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

    const handleFocus = () => {
        setShowFilters(true);
        setHighlighted(null);
    } 

    return {
        inputValue,
        chips,
        filteredItems,
        showFilters,
        highlighted,
        inputRef,
        contRef,
        handleInputChange,
        handleInputKeyDown,
        addChip,
        removeChip,
        setShowFilters,
        handleFocus
    };
};
