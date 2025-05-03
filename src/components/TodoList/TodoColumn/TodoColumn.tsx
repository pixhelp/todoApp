import { useEffect, useRef, useState } from "react";

interface TodoColumnProps {
    listShowElements: React.ReactNode[];
    filterOldElements: () => void;
    filterNewElements: () => void;
    filterCrucialElement: () => void;
}


const TodoColumn = ({listShowElements, filterOldElements, filterNewElements, filterCrucialElement}: TodoColumnProps) => {
    return (
        <div className="w-full">
           <button className="bg-green-dark cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
           onClick={filterOldElements}>
                Anciens
            </button>
            <button className="bg-green-dark ml-4 cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
            onClick={filterNewElements}>
                Récents 
            </button>
            <button className="bg-green-dark ml-4 cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
            onClick={filterCrucialElement}>
                Urgents 
            </button>
            <div className="flex flex-col xl:flex-row w-full xl:w-auto">
                <div className="px-2 pt-2 text-left font-playwrite shadow-box-light bg-beige-light w-full xl:w-96 m-h-96">
                    {listShowElements.length === 0 && (
                        <p className="text-center text-xl pb-6 pt-4 text-white">Commencez votre liste</p>
                    )}  
                    {listShowElements}
                </div>
            </div>
        </div>

        
    )
} 

export default TodoColumn;