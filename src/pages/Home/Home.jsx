import { useEffect, useState } from "react";

import {
    getCreatures,
    searchCreatures,
} from "../../services/api";

import CreatureGrid from "../../components/CreatureGrid/CreatureGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

import "./Home.css";

const Home = () => {
    const [creatures, setCreatures] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    useEffect(() => {
        const loadCreatures = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getCreatures(page, 20);
                } else {
                    data = await searchCreatures(
                        searchTerm.trim(),
                        page,
                        20
                    );
                }

                setCreatures(data.results || []);

                setHasNextPage(Boolean(data.next));
                setHasPreviousPage(Boolean(data.previous));
            } catch (error) {
                console.error(error);

                setCreatures([]);
                setHasNextPage(false);
                setHasPreviousPage(false);

                setError(
                    "We couldn't find any magical creatures."
                );
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(() => {
            loadCreatures();
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchTerm, page]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage((currentPage) => currentPage + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPage((currentPage) => currentPage - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <main className="home">

            {/* HERO */}

            <section className="home__hero">

                <p className="home__eyebrow">
                    ✦ Welcome to the library
                </p>

                <h1>
                    Enchanted Library
                </h1>

                <p className="home__description">
                    Discover magical creatures, ancient beings
                    and extraordinary inhabitants of enchanted
                    worlds.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </section>


            {/* CREATURE COLLECTION */}

            <section className="home__creatures">

                <div className="home__section-header">

                    <div>

                        <span className="home__section-label">
                            Magical Collection
                        </span>

                        <h2>
                            {searchTerm
                                ? "Search Results"
                                : "Creatures"}
                        </h2>

                    </div>

                </div>


                {/* LOADING */}

                {loading && (
                    <Loader />
                )}


                {/* ERROR */}

                {!loading && error && (
                    <ErrorMessage
                        message={error}
                    />
                )}


                {/* RESULTS */}

                {!loading && !error && (
                    <>
                        <CreatureGrid
                            creatures={creatures}
                        />

                        <Pagination
                            currentPage={page}
                            hasNextPage={hasNextPage}
                            hasPreviousPage={hasPreviousPage}
                            onNext={handleNextPage}
                            onPrevious={handlePreviousPage}
                        />
                    </>
                )}

            </section>

        </main>
    );
};

export default Home;