import { useEffect, useMemo, useState } from "react";

import {
    getSpells,
    searchSpells,
} from "../../services/api";

import SpellGrid from "../../components/SpellGrid/SpellGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";

import "./Spells.css";

const FILTER_OPTIONS = [
    {
        field: "level",
        label: "Level",
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
        field: "school",
        label: "School",
        values: [
            "abjuration",
            "conjuration",
            "divination",
            "enchantment",
            "evocation",
            "illusion",
            "necromancy",
            "transmutation",
        ],
    },
    {
        field: "concentration",
        label: "Concentration",
        values: ["true", "false"],
    },
    {
        field: "ritual",
        label: "Ritual",
        values: ["true", "false"],
    },
];

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilters] = useState({
        level: "",
        school: "",
        concentration: "",
        ritual: "",
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

    const apiFilters = useMemo(
        () => ({
            level: filters.level,
            school: filters.school,
            concentration: filters.concentration,
            ritual: filters.ritual,
        }),
        [filters]
    );

    useEffect(() => {
        const loadSpells = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;

                if (searchTerm.trim() === "") {
                    data = await getSpells(page, 20, apiFilters);
                } else {
                    data = await searchSpells(
                        searchTerm.trim(),
                        page,
                        20,
                        apiFilters
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
    }, [searchTerm, page, apiFilters]);

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
            level: "",
            school: "",
            concentration: "",
            ritual: "",
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
        <main className="spells">
            <section className="spells__hero">
                <div className="spells__hero-symbol">✦</div>

                <span className="spells__eyebrow">
                    Volume II · The Arcane Archives
                </span>

                <h1>Spell Library</h1>

                <p>
                    Explore ancient incantations, powerful rituals and
                    magical knowledge preserved within the enchanted archives.
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search magical spells..."
                />

                <FilterBar
                    filters={filters}
                    options={FILTER_OPTIONS}
                    onChange={handleFilterChange}
                    onClear={handleClearFilters}
                />
            </section>

            <section className="spells__collection">
                <div className="spells__header">
                    <div>
                        <span>The Arcane Archives</span>

                        <h2>
                            {searchTerm || activeFilters
                                ? "Filtered Results"
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
