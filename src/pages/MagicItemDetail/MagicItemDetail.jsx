import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMagicItemByKey } from "../../services/api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./MagicItemDetail.css";

const MagicItemDetail = () => {
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const loadMagicItem = async () => {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await getMagicItemByKey(id);

                setItem(data);
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't open this artifact's record."
                );
            } finally {
                setLoading(false);
            }
        };

        loadMagicItem();
    }, [id]);

    if (loading) {
        return (
            <main className="magic-item-detail">
                <Loader />
            </main>
        );
    }

    if (error) {
        return (
            <main className="magic-item-detail">
                <ErrorMessage
                    message={error}
                />

                <Link
                    to="/items"
                    className="magic-item-detail__back"
                >
                    ← Back to magic items
                </Link>
            </main>
        );
    }

    if (!item) {
        return null;
    }

    const rarity =
        typeof item.rarity === "object"
            ? item.rarity?.name
            : item.rarity || "Unknown";

    const category =
        typeof item.category === "object"
            ? item.category?.name
            : item.category || "Unknown";

    const itemType =
        typeof item.type === "object"
            ? item.type?.name
            : item.type || "Unknown";

    const requiresAttunement =
        item.requires_attunement ??
        item.attunement ??
        false;

    const weight =
        typeof item.weight === "object"
            ? item.weight?.name ||
              item.weight?.value
            : item.weight || "—";

    return (
        <main className="magic-item-detail">

            <div className="magic-item-detail__container">

                <Link
                    to="/items"
                    className="magic-item-detail__back"
                >
                    ← Back to magic items
                </Link>

                <section className="magic-item-detail__card">

                    <div className="magic-item-detail__symbol">
                        ◇
                    </div>

                    <div className="magic-item-detail__header">

                        <span className="magic-item-detail__label">
                            Enchanted Artifact
                        </span>

                        <h1>
                            {item.name}
                        </h1>

                        <div className="magic-item-detail__divider">
                            <span>✦</span>
                        </div>

                    </div>


                    {/* =========================
                        OVERVIEW
                    ========================= */}

                    <div className="magic-item-detail__overview">

                        <div className="magic-item-detail__item">

                            <span>
                                Rarity
                            </span>

                            <strong>
                                {rarity}
                            </strong>

                        </div>

                        <div className="magic-item-detail__item">

                            <span>
                                Category
                            </span>

                            <strong>
                                {category}
                            </strong>

                        </div>

                        <div className="magic-item-detail__item">

                            <span>
                                Type
                            </span>

                            <strong>
                                {itemType}
                            </strong>

                        </div>

                        <div className="magic-item-detail__item">

                            <span>
                                Attunement
                            </span>

                            <strong>
                                {requiresAttunement
                                    ? "Required"
                                    : "Not required"}
                            </strong>

                        </div>

                    </div>


                    {/* =========================
                        DESCRIPTION
                    ========================= */}

                    {item.desc && (
                        <section className="magic-item-detail__section">

                            <span className="magic-item-detail__section-label">
                                Description
                            </span>

                            <div className="magic-item-detail__description">

                                {Array.isArray(item.desc) ? (
                                    item.desc.map(
                                        (paragraph, index) => (
                                            <p
                                                key={index}
                                            >
                                                {paragraph}
                                            </p>
                                        )
                                    )
                                ) : (
                                    <p>
                                        {item.desc}
                                    </p>
                                )}

                            </div>

                        </section>
                    )}


                    {/* =========================
                        ITEM DETAILS
                    ========================= */}

                    <section className="magic-item-detail__section">

                        <span className="magic-item-detail__section-label">
                            Artifact Details
                        </span>

                        <div className="magic-item-detail__stats">

                            <div className="magic-item-detail__stat">

                                <span>
                                    Rarity
                                </span>

                                <strong>
                                    {rarity}
                                </strong>

                            </div>

                            <div className="magic-item-detail__stat">

                                <span>
                                    Weight
                                </span>

                                <strong>
                                    {weight}
                                </strong>

                            </div>

                            <div className="magic-item-detail__stat">

                                <span>
                                    Attunement
                                </span>

                                <strong>
                                    {requiresAttunement
                                        ? "Required"
                                        : "Not required"}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        SPECIAL PROPERTIES
                    ========================= */}

                    {item.properties && (
                        <section className="magic-item-detail__section">

                            <span className="magic-item-detail__section-label">
                                Properties
                            </span>

                            <div className="magic-item-detail__properties">

                                {Array.isArray(
                                    item.properties
                                ) ? (
                                    item.properties.map(
                                        (
                                            property,
                                            index
                                        ) => (
                                            <div
                                                className="magic-item-detail__property"
                                                key={index}
                                            >
                                                {typeof property ===
                                                "object"
                                                    ? property.name ||
                                                      property.value ||
                                                      JSON.stringify(
                                                          property
                                                      )
                                                    : property}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="magic-item-detail__property">
                                        {typeof item.properties ===
                                        "object"
                                            ? JSON.stringify(
                                                  item.properties
                                              )
                                            : item.properties}
                                    </div>
                                )}

                            </div>

                        </section>
                    )}

                </section>

            </div>

        </main>
    );
};

export default MagicItemDetail;