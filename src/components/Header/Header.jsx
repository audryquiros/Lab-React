import { Link, useLocation } from "react-router-dom";

import "./Header.css";

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <header className="header">
            <div className="header__container">

                <Link
                    to="/"
                    className="header__logo"
                >
                    <span className="header__logo-symbol">
                        ✦
                    </span>

                    <span className="header__logo-text">
                        Enchanted
                        <span>
                            Library
                        </span>
                    </span>
                </Link>


                <nav className="header__nav">

                    <Link
                        to="/"
                        className={`header__link ${
                            isActive("/")
                                ? "header__link--active"
                                : ""
                        }`}
                    >
                        Home
                    </Link>


                    <Link
                        to="/creatures"
                        className={`header__link ${
                            isActive("/creatures")
                                ? "header__link--active"
                                : ""
                        }`}
                    >
                        Creatures
                    </Link>


                    <Link
                        to="/spells"
                        className={`header__link ${
                            isActive("/spells")
                                ? "header__link--active"
                                : ""
                        }`}
                    >
                        Spells
                    </Link>


                    <Link
                        to="/items"
                        className={`header__link ${
                            isActive("/items")
                                ? "header__link--active"
                                : ""
                        }`}
                    >
                        Magic Items
                    </Link>

                </nav>

            </div>
        </header>
    );
};

export default Header;