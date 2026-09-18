import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Creatures from "../pages/Creatures/Creatures";
import CreatureDetail from "../pages/CreatureDetail/CreatureDetail";
import Spells from "../pages/Spells/Spells";
import SpellDetail from "../pages/SpellDetail/SpellDetail";
import MagicItems from "../pages/MagicItems/MagicItems";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/creatures"
                element={<Creatures />}
            />

            <Route
                path="/creature/:id"
                element={<CreatureDetail />}
            />

            <Route
                path="/spells"
                element={<Spells />}
            />

            <Route
                path="/spell/:id"
                element={<SpellDetail />}
            />

            <Route
                path="/items"
                element={<MagicItems />}
            />

        </Routes>
    );
};

export default AppRoutes;