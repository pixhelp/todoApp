import { Link } from "react-router-dom";

interface MenuLinkProps {
    LinkMenu: string;
    Text: string;
    closeMenuMobile: () => void;
}

const MenuLInk = ({LinkMenu, Text, closeMenuMobile}: MenuLinkProps) => {
    return (
        <Link className="w-full text-center hover:bg-beige-light p-4 cursor-pointer" onClick={closeMenuMobile} to={LinkMenu}>{Text}</Link>
    )
}

export default MenuLInk;