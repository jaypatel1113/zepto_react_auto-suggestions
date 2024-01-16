// App.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useChipInput } from "./hooks/useChipInput";
import Chip from "./components/Chip";
import { chipAnimation } from "./animations";
import Suggestions from "./components/Suggestions";

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
        <div className="flex flex-col gap-8 font-sans p-5">
            <div className="flex flex-wrap gap-2 items-center border-b-2 border-blue-600 pb-1 ">

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
