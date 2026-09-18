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

    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

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
                setHasNextPage(Boolean(data.next));
                setHasPreviousPage(Boolean(data.previous));
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
        if (!hasNextPage) return;

        setPage((currentPage) => currentPage + 1);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handlePreviousPage = () => {
        if (!hasPreviousPage) return;

        setPage((currentPage) => currentPage - 1);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main className="spells">
            <section className="spells__hero">
                <div className="spells__hero-symbol">
                    ✦
                </div>

                <span className="spells__eyebrow">
                    Volume II · The Arcane Archives
                </span>

                <h1>Spell Library</h1>

                <p>
                    Explore ancient incantations,
                    powerful rituals and magical
                    knowledge preserved within the
                    enchanted archives.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search magical spells..."
                />
            </section>

            <section className="spells__collection">
                <div className="spells__header">
                    <div>
                        <span>
                            The Arcane Archives
                        </span>

                        <h2>
                            {searchTerm
                                ? "Search Results"
                                : "Spell Collection"}
                        </h2>
                    </div>

                    <div className="spells__page">
                        Page {page}
                    </div>
                </div>

                {loading && <Loader />}

                {!loading && error && (
                    <ErrorMessage message={error} />
                )}

                {!loading && !error && (
                    <>
                        <SpellGrid spells={spells} />

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

export default Spells;
