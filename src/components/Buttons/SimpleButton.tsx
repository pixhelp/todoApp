import { Link } from "react-router-dom";

interface SimpleButtonProps {
    text:string;
}

const SimpleButton = ({text}: SimpleButtonProps) => {
    return (
        <Link className="rounded-full text-white py-2 p-4 text-center bg-dark-blue-light hover:bg-dark-blue" to={"/my-todo-list"}>
            {text}
        </Link>
    )
}

export default SimpleButton;