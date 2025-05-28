import { MousePointerClick } from "lucide-react";
import { Link } from "react-router-dom";

const TodoStatsCard = ({statsCard, text, img, link}: {statsCard: number, text: string, img?: string, link?: string}) => {
    return (
        <Link to={link!} className="p-4 w-full group">
            <div className="cursor-pointer flex relative h-96 items-center justify-center flex-col p-4 bg-[var(--color-bg-light-blue)] rounded-md shadow-md"
            style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="h-full w-full absolute bg-black brightness-50 group-hover:opacity-80 duration-800 transition-opacity rounded-md opacity-50"></div>
            <MousePointerClick  size={30} className="absolute ease-in opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white duration-800 transition-all" />
                <h3 className="transition-all duration-300 ease-in transform group-hover:-translate-y-20 text-2xl text-white font-bold absolute inset-0 flex flex-col justify-center items-center">
                    {text}
                    <p>
                        {statsCard}
                    </p>
                </h3>
            </div>
        </Link>
    )
}

export default TodoStatsCard;