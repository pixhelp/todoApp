import { ListFilterPlus } from "lucide-react";

const Header = () => {
    return (
        <div className="bg-green-light flex flex-row items-center justify-center font-playwrite text-white p-4 text-2xl">
            My todo
            <ListFilterPlus className="rotate-180" size={40} />
        </div>
    )
}

export default Header;