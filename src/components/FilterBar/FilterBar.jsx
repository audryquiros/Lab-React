import { useEffect, useRef, useState } from "react";
import "./FilterBar.css";

const formatOptionLabel = (value) => {
    if (value === "true") return "Yes";
    if (value === "false") return "No";

    return String(value)
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
};

const FilterSelect = ({
    filter,
    value,
    onChange,
    isOpen,
    onToggle,
    onClose,
}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [onClose]);

    const selectedValue = value
        ? formatOptionLabel(value)
        : `All ${filter.label}`;

    const isActive = Boolean(value);

    const handleSelect = (option) => {
        onChange(filter.field, option);
        onClose();
    };

    return (
        <div
            ref={wrapperRef}
            className={`filter-bar__field ${
                isActive ? "filter-bar__field--active" : ""
            }`}
        >
            <span className="filter-bar__field-label">
                {filter.label}
            </span>

            <div className="filter-bar__select-wrapper">
                <button
                    type="button"
                    className={`filter-bar__select ${
                        isOpen
                            ? "filter-bar__select--open"
                            : ""
                    }`}
                    onClick={onToggle}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span>{selectedValue}</span>

                    <span
                        className={`filter-bar__arrow ${
                            isOpen
                                ? "filter-bar__arrow--open"
                                : ""
                        }`}
                    >
                        ⌄
                    </span>
                </button>

                {isOpen && (
                    <div
                        className="filter-bar__dropdown"
                        role="listbox"
                    >
                        <button
                            type="button"
                            className={`filter-bar__option ${
                                !value
                                    ? "filter-bar__option--selected"
                                    : ""
                            }`}
                            onClick={() => handleSelect("")}
                            role="option"
                            aria-selected={!value}
                        >
                            <span>All {filter.label}</span>

                            {!value && (
                                <span className="filter-bar__option-mark">
                                    ✦
                                </span>
                            )}
                        </button>

                        {filter.values.map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`filter-bar__option ${
                                    value === option
                                        ? "filter-bar__option--selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleSelect(option)
                                }
                                role="option"
                                aria-selected={
                                    value === option
                                }
                            >
                                <span>
                                    {formatOptionLabel(option)}
                                </span>

                                {value === option && (
                                    <span className="filter-bar__option-mark">
                                        ✦
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterBar = ({
    filters,
    options,
    onChange,
    onClear,
}) => {
    const [openFilter, setOpenFilter] = useState(null);

    const activeFilters = Object.values(filters).filter(
        Boolean
    ).length;

    const handleToggle = (field) => {
        setOpenFilter((current) =>
            current === field ? null : field
        );
    };

    const handleClose = () => {
        setOpenFilter(null);
    };

    const handleClear = () => {
        setOpenFilter(null);
        onClear();
    };

    return (
        <section
            className="filter-bar"
            aria-label="Archive filters"
        >
            <div className="filter-bar__top">
                <div className="filter-bar__title-group">
                    <div className="filter-bar__icon">
                        ✦
                    </div>

                    <div className="filter-bar__title-content">
                        <div className="filter-bar__title-row">
                            <span className="filter-bar__label">
                                Archive Filters
                            </span>

                            {activeFilters > 0 && (
                                <span className="filter-bar__count">
                                    {activeFilters} active
                                </span>
                            )}
                        </div>

                        <span className="filter-bar__hint">
                            Refine your search through the
                            collection
                        </span>
                    </div>
                </div>

                {activeFilters > 0 && (
                    <button
                        type="button"
                        className="filter-bar__clear"
                        onClick={handleClear}
                    >
                        <span>Clear filters</span>

                        <span className="filter-bar__clear-count">
                            {activeFilters}
                        </span>
                    </button>
                )}
            </div>

            <div className="filter-bar__ornament">
                <span></span>
                <i>✦</i>
                <span></span>
            </div>

            <div className="filter-bar__fields">
                {options.map((filter) => (
                    <FilterSelect
                        key={filter.field}
                        filter={filter}
                        value={filters[filter.field] || ""}
                        onChange={onChange}
                        isOpen={openFilter === filter.field}
                        onToggle={() =>
                            handleToggle(filter.field)
                        }
                        onClose={handleClose}
                    />
                ))}
            </div>
        </section>
    );
};

export default FilterBar;