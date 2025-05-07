import { useEffect, useRef, useState } from "react";
import { useTodo } from "../../../context/todoContext";

interface TodoColumnProps {
    listShowElements: React.ReactNode[];
    filterOldElements: () => void;
    filterNewElements: () => void;
    isOldsElementActive: boolean;
    isNewsElementActive: boolean;
    isAllCheckedElements: () => void;
}


const TodoColumn = ({listShowElements, isOldsElementActive, isNewsElementActive, filterOldElements, filterNewElements, isAllCheckedElements}: TodoColumnProps) => {
    const { todos, filterCrucialOnly, filterDoneOnly, toggleDoneOnly, toogleCrucialOnly, } = useTodo();
    const hasDone = todos.some((todo => todo.done));
    const hasCrucial = todos.some((todo => todo.crucial));

    return (
        <div className={"w-full " + (listShowElements.length === 0 ? "lg:w-1/2 " : "lg:w-auto")}>
            {(listShowElements.length >= 2) && (
                <div>
                    <button className={"cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl " +
                        (!isOldsElementActive ? ' bg-green-dark ' : ' bg-dark-blue-light')}
                        onClick={filterOldElements}>
                        Anciens
                    </button>

                    <button className={"ml-2 cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl " +
                        (!isNewsElementActive ? ' bg-green-dark ' : ' bg-dark-blue-light')}
                        onClick={filterNewElements}>
                        Récents 
                    </button>

                    {(hasCrucial) && (
                        <button className={"ml-2 cursor-pointer text-sm lg:text-lg text-white px-1.5 disabled:bg-gray-300 lg:px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl " +
                            (filterCrucialOnly ? "bg-dark-blue-light " : " bg-beige-light")}
                            onClick={toogleCrucialOnly}>
                            Urgents 
                        </button>
                    )}

                    {hasDone && (
                        <button className={"ml-2 cursor-pointer text-sm lg:text-lg text-white disabled:bg-gray-300 px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 rounded-t-xl sm:rounded-b-none sm:rounded-t-xl " +
                        (filterDoneOnly ? "bg-dark-blue-light " : " bg-green-light ")}
                            onClick={toggleDoneOnly}>
                            Terminées
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-row items-center mb-1.5">
                <div className='relative'>
                    <input type="checkbox" value="check-all" onClick={isAllCheckedElements} className="border
                        peer cursor-pointer relative appearance-none shrink-0 w-3.5 h-3.5 border-dark-blue rounded-sm mt-1 bg-white
                        focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus:ring-1 focus:ring-blue-100
                        checked:bg-green-dark
                        disabled:border-steel-400 disabled:bg-steel-400"/>
                    <svg
                        className="absolute top-0.5 left-[1px] w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white mt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <p className="text-sm text-gray-800 ml-1.5">
                    Sélectionner toutes les tâches
                </p>
            </div>

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