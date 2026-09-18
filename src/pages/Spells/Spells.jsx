import { useEffect, useState } from "react";

import {
    getSpells,
    searchSpells,
} from "../../services/api";

import SpellGrid from "../../components/SpellGrid/SpellGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

import "./Spells.css";

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] =
        useState(false);

    const [hasPreviousPage, setHasPreviousPage] =
        useState(false);

    useEffect(() => {
        const loadSpells = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getSpells(page, 20);
                } else {
                    data = await searchSpells(
                        searchTerm.trim(),
                        page,
                        20
                    );
                }

                setSpells(data.results || []);

                setHasNextPage(
                    Boolean(data.next)
                );

                setHasPreviousPage(
                    Boolean(data.previous)
                );
            } catch (error) {
                console.error(error);

                setSpells([]);

                setHasNextPage(false);
                setHasPreviousPage(false);

                setError(
                    "We couldn't find any magical spells."
                );
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(() => {
            loadSpells();
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchTerm, page]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage(
                (currentPage) =>
                    currentPage + 1
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPage(
                (currentPage) =>
                    currentPage - 1
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <main className="spells">

            <section className="spells__hero">

                <p className="spells__eyebrow">
                    ✦ Arcane Archives
                </p>

                <h1>
                    Spell Library
                </h1>

                <p className="spells__description">
                    Explore ancient incantations,
                    powerful rituals and magical
                    knowledge preserved in the
                    enchanted archives.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </section>


            <section className="spells__collection">

                <div className="spells__section-header">

                    <div>

                        <span className="spells__section-label">
                            Arcane Collection
                        </span>

                        <h2>
                            {searchTerm
                                ? "Search Results"
                                : "Spells"}
                        </h2>

                    </div>

                </div>


                {loading && (
                    <Loader />
                )}


                {!loading && error && (
                    <ErrorMessage
                        message={error}
                    />
                )}


                {!loading && !error && (
                    <>
                        <SpellGrid
                            spells={spells}
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

export default Spells;