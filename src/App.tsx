import { AnimatePresence, motion } from "framer-motion";

import Heading from "./components/Heading";
import Chip from "./components/Chip";
import Suggestions from "./components/Suggestions";

import { chipAnimation } from "./animations";
import { useChipInput } from "./hooks/useChipInput";

const App = () => {
    const {
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
        setShowFilters,
        removeChip,
    } = useChipInput();

    return (
        <div className="flex flex-col gap-8 font-sans p-5 pt-10 items-center justify-start w-full">
            <Heading />

            <div className="flex flex-wrap gap-2 items-center border-b-2 border-blue-600 pb-1 max-w-6xl w-full ">
                <AnimatePresence>
                    {chips.map((chip) => (
                        <motion.div
                            key={chip.id}
                            {...chipAnimation}
                        >
                            <Chip handleClick={() => removeChip(chip.id)} chip={chip} highlight={highlighted?.id === chip.id} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="relative flex-1 flex min-w-[200px]" ref={contRef}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onFocus={() => setShowFilters(true)}
                        placeholder="Type here..."
                        className="p-2 border-none outline-none flex-1 w-full"
                    />
                    
                    <Suggestions 
                        showFilters={showFilters} 
                        inputValue={inputValue}
                        filteredItems={filteredItems}
                        addChip={addChip}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
