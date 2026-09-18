import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
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
                        className="header__link"
                    >
                        Creatures
                    </Link>


                    <Link
                        to="/spells"
                        className="header__link"
                    >
                        Spells
                    </Link>


                    <a
                        href="#items"
                        className="header__link"
                    >
                        Magic Items
                    </a>

                </nav>

            </div>
        </header>
    );
};

export default Header;