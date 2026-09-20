import { useEffect, useMemo, useState } from "react";

import {
    getCreatures,
    searchCreatures,
} from "../../services/api";

import CreatureGrid from "../../components/CreatureGrid/CreatureGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";

import "./Creatures.css";

const FILTER_OPTIONS = [
    {
        field: "type",
        label: "Type",
        values: [
            "aberration",
            "beast",
            "celestial",
            "construct",
            "dragon",
            "elemental",
            "fey",
            "fiend",
            "giant",
            "humanoid",
            "monstrosity",
            "ooze",
            "plant",
            "undead",
        ],
    },
    {
        field: "size",
        label: "Size",
        values: [
            "tiny",
            "small",
            "medium",
            "large",
            "huge",
            "gargantuan",
        ],
    },
    {
        field: "challenge_rating",
        label: "Challenge Rating",
        values: [
            "0",
            "1/8",
            "1/4",
            "1/2",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
        ],
    },
];

const Creatures = () => {
    const [creatures, setCreatures] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilters] = useState({
        type: "",
        size: "",
        challenge_rating: "",
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
        const loadCreatures = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getCreatures(page, 20, filters);
                } else {
                    data = await searchCreatures(
                        searchTerm.trim(),
                        page,
                        20,
                        filters
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
            type: "",
            size: "",
            challenge_rating: "",
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
        <main className="creatures">
            <section className="creatures__hero">
                <div className="creatures__hero-symbol">✦</div>

                <span className="creatures__eyebrow">
                    Volume I · The Bestiary
                </span>

                <h1>Magical Creatures</h1>

                <p>
                    Explore the creatures preserved within the enchanted
                    archives, from ancient beings to mysterious inhabitants
                    of magical worlds.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search magical creatures..."
                />

                <FilterBar
                    filters={filters}
                    options={FILTER_OPTIONS}
                    onChange={handleFilterChange}
                    onClear={handleClearFilters}
                />
            </section>

            <section className="creatures__collection">
                <div className="creatures__header">
                    <div>
                        <span>The Bestiary</span>

                        <h2>
                            {searchTerm || activeFilters
                                ? "Filtered Results"
                                : "Creature Collection"}
                        </h2>
                    </div>

                    <div className="creatures__page">
                        Page {page}
                    </div>
                </div>

                {loading && <Loader />}

                {!loading && error && (
                    <ErrorMessage message={error} />
                )}

                {!loading && !error && (
                    <>
                        <CreatureGrid creatures={creatures} />

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

export default Creatures;
