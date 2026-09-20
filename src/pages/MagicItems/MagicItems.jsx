import { useEffect, useMemo, useState } from "react";

import {
    getMagicItems,
    searchMagicItems,
} from "../../services/api";

import MagicItemGrid from "../../components/MagicItemGrid/MagicItemGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";

import "./MagicItems.css";

const FILTER_OPTIONS = [
    {
        field: "rarity",
        label: "Rarity",
        values: [
            "common",
            "uncommon",
            "rare",
            "very rare",
            "legendary",
            "artifact",
        ],
    },
    {
        field: "type",
        label: "Type",
        values: [
            "armor",
            "weapon",
            "wondrous",
            "potion",
            "scroll",
            "ring",
            "rod",
            "staff",
            "wand",
        ],
    },
];

const MagicItems = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilters] = useState({
        rarity: "",
        category: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const activeFilters = useMemo(
        () => Object.values(filters).some(Boolean),
        [filters]
    );

    useEffect(() => {
        const loadMagicItems = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getMagicItems(page, 20, filters);
                } else {
                    data = await searchMagicItems(
                        searchTerm.trim(),
                        page,
                        20,
                        filters
                    );
                }

                setItems(data.results || []);
                setHasNextPage(Boolean(data.next));
                setHasPreviousPage(Boolean(data.previous));
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
    }, [searchTerm, page, filters]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleFilterChange = (field, value) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [field]: value,
        }));
        setPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            rarity: "",
            category: "",
        });
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
        <main className="magic-items">
            <section className="magic-items__hero">
                <div className="magic-items__hero-symbol">✦</div>

                <span className="magic-items__eyebrow">
                    Volume III · The Reliquary
                </span>

                <h1>Magic Items</h1>

                <p>
                    Discover enchanted artifacts, legendary objects and
                    mysterious relics preserved within the library's vaults.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search magical items..."
                />

                <FilterBar
                    filters={filters}
                    options={FILTER_OPTIONS}
                    onChange={handleFilterChange}
                    onClear={handleClearFilters}
                />
            </section>

            <section className="magic-items__collection">
                <div className="magic-items__header">
                    <div>
                        <span>The Reliquary</span>

                        <h2>
                            {searchTerm || activeFilters
                                ? "Filtered Results"
                                : "Artifact Collection"}
                        </h2>
                    </div>

                    <div className="magic-items__page">
                        Page {page}
                    </div>
                </div>

                {loading && <Loader />}

                {!loading && error && (
                    <ErrorMessage message={error} />
                )}

                {!loading && !error && (
                    <>
                        <MagicItemGrid items={items} />

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

export default MagicItems;
