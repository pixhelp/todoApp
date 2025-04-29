import { Copyright } from "lucide-react";

const Footer = () => {
    return (
        <div className="bg-green-light flex flex-row items-center justify-center text-white p-4 text-2xl">
            <Copyright className="mr-2" size={25} strokeWidth={2} /> 
            <p className="text-sm sm:text-xl">
                Ibert François
            </p>
        </div>
    )
}

export default Footer;