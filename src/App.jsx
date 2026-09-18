import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />

                <AppRoutes />
            </div>
        </BrowserRouter>
    );
};

export default App;