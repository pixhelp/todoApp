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
            {listShowElements.length >= 2 && (
                <div>
                    <button className="bg-green-dark cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
                    onClick={filterOldElements}>
                        Anciens
                    </button>
                    <button className="bg-green-dark ml-4 cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
                    onClick={filterNewElements}>
                        Récents 
                    </button>
                    <button className="bg-beige-light ml-4 cursor-pointer hover:bg-brown text-white px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl"
                    onClick={filterCrucialElement}>
                        Urgents 
                    </button>
                </div>
            )}
            <div className="flex w-full flex-col lg:flex-row">
                <div className="flex flex-1 flex-col lg:flex-row w-full lg:w-auto">
                    <div className="flex-1 text-left font-playwrite shadow-box-light bg-white w-full lg:w-96 m-h-96">
                        {listShowElements.length === 0 && (
                            <p className="text-center text-xl pb-6 pt-4 text-black">Commencez votre liste</p>
                        )}  
                        {listShowElements.slice(0,10)}
                    </div>
                </div>

                {listShowElements.length > 10 && (
                    <div className="flex flex-1 flex-col lg:ml-4 lg:flex-row w-full lg:w-auto">
                        <div className="flex-1 text-left font-playwrite shadow-box-light bg-white w-full lg:w-96 m-h-96">
                            {listShowElements.slice(10)}
                        </div>
                    </div>
                )}
            </div>
        </div>

        
    )
} 

export default TodoColumn;