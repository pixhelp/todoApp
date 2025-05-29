import { useTodo } from "../../../context/todoContext";
import { useState } from "react";
import SearchTodo from "../../Search/SearchTodo";
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from "../../../context/todoContext";

interface TodoColumnProps {
  filterOldElements: () => void;
  filterNewElements: () => void;
  isOldsElementActive: boolean;
  isNewsElementActive: boolean;
  isAllCheckedElements: () => void;

  todos: Todo[];
  check: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCrucialElements: (indexElement: number) => void;
  sortCrucialElementFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoColumn = ({
  todos,
  check,
  changeCrucialElements,
  sortCrucialElementFilter,
  isOldsElementActive,
  isNewsElementActive,
  filterOldElements,
  filterNewElements,
  isAllCheckedElements
}: TodoColumnProps) => {
  const {
    filterCrucialOnly,
    filterDoneOnly,
    toggleDoneOnly,
    toogleCrucialOnly
  } = useTodo();

  const [searchInput, setSearch] = useState("");

  const hasDone = todos.some((todo) => todo.done);
  const hasCrucial = todos.some((todo) => todo.crucial);

  const filteredTodos = todos
    .filter((todo) => todo.title.toLowerCase().includes(searchInput.toLowerCase()))
    .filter((todo) => {
      if (filterDoneOnly) return todo.done;
      if (filterCrucialOnly) return todo.crucial;
      return true;
    });

  const sortedTodos = [...filteredTodos].sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full flex">
                {todos.length >= 2 && (
                    <div>
                        <button
                        className={
                            "cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 " +
                            (!isOldsElementActive ? "bg-green-dark" : "bg-dark-blue-light")
                        }
                        onClick={filterOldElements}
                        >
                        Anciens
                        </button>
                        <button
                        className={
                            "ml-2 cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 " +
                            (!isNewsElementActive ? "bg-green-dark" : "bg-dark-blue-light")
                        }
                        onClick={filterNewElements}
                        >
                        Récents
                        </button>
                    </div>
                )}

                <div className="flex">
                    {hasCrucial && (
                        <button
                        className={
                            "ml-2 cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 " +
                            (filterCrucialOnly ? "bg-dark-blue-light" : "bg-beige-light")
                        }
                        onClick={toogleCrucialOnly}
                        >
                        Urgents
                        </button>
                    )}
                
                    {hasDone && (
                        <button
                        className={
                            "ml-2 cursor-pointer text-sm lg:text-lg text-white px-1.5 lg:px-4 py-2 h-12 sm:h-auto mb-2 " +
                            (filterDoneOnly ? "bg-dark-blue-light" : "bg-green-light")
                        }
                        onClick={toggleDoneOnly}
                        >
                        Terminées
                        </button>
                    )}
                </div>
            </div>

            <div className="ml-auto w-full lg:w-1/3 my-4 lg:my-0">
                <SearchTodo searchTodos={searchInput} setSearch={setSearch} />
            </div>
        </div>

        <div className="flex flex-row items-center mb-1.5">
            <div className="relative">
            <input
                type="checkbox"
                value="check-all"
                onClick={isAllCheckedElements}
                className="border peer cursor-pointer relative appearance-none shrink-0 w-3.5 h-3.5 border-dark-blue rounded-sm mt-1 bg-white
                focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus:ring-1 focus:ring-blue-100
                checked:bg-green-dark
                disabled:border-steel-400 disabled:bg-steel-400"
            />
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
                <polyline points="20 6 9 17 4 12" />
            </svg>
            </div>
            <p className="text-sm text-gray-800 ml-1.5">Sélectionner toutes les tâches</p>
        </div>

        <div className="flex w-full flex-col lg:flex-row">
            <div className="flex flex-1 flex-col lg:flex-row w-full">
                <div className="flex-1 text-left shadow-box-light bg-white w-full lg:w-96 m-h-96">
                    {sortedTodos.length === 0 && (
                        <p className="text-center text-xl pb-6 pt-4 text-black">Commencez votre liste</p>
                    )}

                    {sortedTodos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            showElement={todo}
                            check={check}
                            totalElements={todos.length}
                            changeCrucialElements={changeCrucialElements}
                            sortCrucialElementFilter={sortCrucialElementFilter}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default TodoColumn;
