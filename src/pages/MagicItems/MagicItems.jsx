import { useEffect, useState } from "react";

import {
    getMagicItems,
    searchMagicItems,
} from "../../services/api";

import MagicItemGrid from "../../components/MagicItemGrid/MagicItemGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

import "./MagicItems.css";

const MagicItems = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] =
        useState(false);

    const [hasPreviousPage, setHasPreviousPage] =
        useState(false);

    useEffect(() => {
        const loadMagicItems = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getMagicItems(
                        page,
                        20
                    );
                } else {
                    data = await searchMagicItems(
                        searchTerm.trim(),
                        page,
                        20
                    );
                }

                setItems(
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

                setItems([]);

                setHasNextPage(false);
                setHasPreviousPage(false);

                setError(
                    "We couldn't find any enchanted artifacts."
                );
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(() => {
            loadMagicItems();
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
        <main className="magic-items">

            {/* =========================
                HERO
            ========================= */}

            <section className="magic-items__hero">

                <div className="magic-items__hero-symbol">
                    ◇
                </div>

                <span className="magic-items__eyebrow">
                    Volume III · The Reliquary
                </span>

                <h1>
                    Magic Items
                </h1>

                <p>
                    Discover enchanted artifacts,
                    legendary objects and mysterious
                    relics preserved within the
                    library's vaults.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search magical items..."
                />

            </section>


            {/* =========================
                COLLECTION
            ========================= */}

            <section className="magic-items__collection">

                <div className="magic-items__header">

                    <div>

                        <span>
                            The Reliquary
                        </span>

                        <h2>
                            {searchTerm
                                ? "Search Results"
                                : "Artifact Collection"}
                        </h2>

                    </div>

                    <div className="magic-items__page">
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
                        <MagicItemGrid
                            items={items}
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

export default MagicItems;