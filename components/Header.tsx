import "./Header.css";
import Image from "next/image";
import Logo from "../public/logo-horizontal.png"


function Header () {
    return (
        <a href="/">
            <Image
                src={Logo}
                placeholder="empty"
                alt="logo image"
                className="header__logo" 
            />
        </a>
)
}

export default Header;