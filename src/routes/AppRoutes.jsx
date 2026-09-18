import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import CreatureDetail from "../pages/CreatureDetail/CreatureDetail";
import Spells from "../pages/Spells/Spells";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/creature/:id"
                element={<CreatureDetail />}
            />

            <Route
                path="/spells"
                element={<Spells />}
            />
        </Routes>
    );
};

export default AppRoutes;