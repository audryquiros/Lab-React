import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";

import Creatures from "../pages/Creatures/Creatures";
import CreatureDetail from "../pages/CreatureDetail/CreatureDetail";

import Spells from "../pages/Spells/Spells";
import SpellDetail from "../pages/SpellDetail/SpellDetail";

import MagicItems from "../pages/MagicItems/MagicItems";
import MagicItemDetail from "../pages/MagicItemDetail/MagicItemDetail";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            {/* =========================
                CREATURES
            ========================= */}

            <Route
                path="/creatures"
                element={<Creatures />}
            />

            <Route
                path="/creature/:id"
                element={<CreatureDetail />}
            />

            {/* =========================
                SPELLS
            ========================= */}

            <Route
                path="/spells"
                element={<Spells />}
            />

            <Route
                path="/spell/:id"
                element={<SpellDetail />}
            />

            {/* =========================
                MAGIC ITEMS
            ========================= */}

            <Route
                path="/items"
                element={<MagicItems />}
            />

            <Route
                path="/magic-item/:id"
                element={<MagicItemDetail />}
            />

        </Routes>
    );
};

export default AppRoutes;