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

import "./Creatures.css";

const Creatures = () => {
    const [creatures, setCreatures] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] =
        useState(false);

    const [hasPreviousPage, setHasPreviousPage] =
        useState(false);

    useEffect(() => {
        const loadCreatures = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getCreatures(
                        page,
                        20
                    );
                } else {
                    data = await searchCreatures(
                        searchTerm.trim(),
                        page,
                        20
                    );
                }

                setCreatures(
                    data.results || []
                );

                setHasNextPage(
                    Boolean(data.next)
                );

                setHasPreviousPage(
                    Boolean(data.previous)
                );
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
        if (!hasNextPage) {
            return;
        }

        setPage(
            (currentPage) =>
                currentPage + 1
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handlePreviousPage = () => {
        if (!hasPreviousPage) {
            return;
        }

        setPage(
            (currentPage) =>
                currentPage - 1
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main className="creatures">

            {/* =========================
                HERO
            ========================= */}

            <section className="creatures__hero">

                <div className="creatures__hero-symbol">
                    ✦
                </div>

                <span className="creatures__eyebrow">
                    Volume I · The Bestiary
                </span>

                <h1>
                    Magical Creatures
                </h1>

                <p>
                    Explore the creatures preserved
                    within the enchanted archives,
                    from ancient beings to mysterious
                    inhabitants of magical worlds.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </section>


            {/* =========================
                COLLECTION
            ========================= */}

            <section className="creatures__collection">

                <div className="creatures__header">

                    <div>
                        <span>
                            The Bestiary
                        </span>

                        <h2>
                            {searchTerm
                                ? "Search Results"
                                : "Creature Collection"}
                        </h2>
                    </div>

                    <div className="creatures__page">
                        Page {page}
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
                            hasNextPage={
                                hasNextPage
                            }
                            hasPreviousPage={
                                hasPreviousPage
                            }
                            onNext={
                                handleNextPage
                            }
                            onPrevious={
                                handlePreviousPage
                            }
                        />
                    </>
                )}

            </section>

        </main>
    );
};

export default Creatures;