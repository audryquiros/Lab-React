import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getSpellByKey } from "../../services/api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./SpellDetail.css";

const SpellDetail = () => {
    const { id } = useParams();

    const [spell, setSpell] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* =========================
       SCROLL TO TOP
    ========================= */

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    /* =========================
       LOAD SPELL
    ========================= */

    useEffect(() => {
        const loadSpell = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getSpellByKey(id);

                setSpell(data);
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't open this spell's record."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSpell();
    }, [id]);

    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return (
            <main className="spell-detail">
                <Loader />
            </main>
        );
    }

    /* =========================
       ERROR
    ========================= */

    if (error) {
        return (
            <main className="spell-detail">

                <ErrorMessage
                    message={error}
                />

                <Link
                    to="/spells"
                    className="spell-detail__back"
                >
                    ← Back to spell library
                </Link>

            </main>
        );
    }

    if (!spell) {
        return null;
    }

    /* =========================
       SAFE VALUES
    ========================= */

    const level =
        typeof spell.level === "object"
            ? spell.level?.name
            : spell.level ?? "Unknown";

    const school =
        typeof spell.school === "object"
            ? spell.school?.name
            : spell.school || "Unknown";

    const castingTime =
        typeof spell.casting_time === "object"
            ? spell.casting_time?.name
            : spell.casting_time || "—";

    const range =
        typeof spell.range === "object"
            ? spell.range?.name
            : spell.range || "—";

    const duration =
        typeof spell.duration === "object"
            ? spell.duration?.name
            : spell.duration || "—";

    const components =
        typeof spell.components === "object"
            ? Object.values(spell.components)
                .filter(Boolean)
                .join(", ")
            : spell.components || "—";

    return (
        <main className="spell-detail">

            <div className="spell-detail__container">

                {/* BACK */}

                <Link
                    to="/spells"
                    className="spell-detail__back"
                >
                    ← Back to spell library
                </Link>


                {/* SPELL CARD */}

                <section className="spell-detail__card">

                    <div className="spell-detail__symbol">
                        ✦
                    </div>


                    {/* HEADER */}

                    <div className="spell-detail__header">

                        <span className="spell-detail__label">
                            Arcane Record
                        </span>

                        <h1>
                            {spell.name}
                        </h1>

                        <div className="spell-detail__divider">
                            <span>✦</span>
                        </div>

                    </div>


                    {/* OVERVIEW */}

                    <div className="spell-detail__overview">

                        <div className="spell-detail__item">

                            <span>
                                Level
                            </span>

                            <strong>
                                {level}
                            </strong>

                        </div>


                        <div className="spell-detail__item">

                            <span>
                                School
                            </span>

                            <strong>
                                {school}
                            </strong>

                        </div>


                        <div className="spell-detail__item">

                            <span>
                                Casting Time
                            </span>

                            <strong>
                                {castingTime}
                            </strong>

                        </div>


                        <div className="spell-detail__item">

                            <span>
                                Range
                            </span>

                            <strong>
                                {range}
                            </strong>

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    {spell.desc && (
                        <section className="spell-detail__section">

                            <span className="spell-detail__section-label">
                                Description
                            </span>

                            <p className="spell-detail__description">
                                {spell.desc}
                            </p>

                        </section>
                    )}


                    {/* SPELL DETAILS */}

                    <section className="spell-detail__section">

                        <span className="spell-detail__section-label">
                            Spell Details
                        </span>

                        <div className="spell-detail__stats">

                            <div className="spell-detail__stat">

                                <span>
                                    Duration
                                </span>

                                <strong>
                                    {duration}
                                </strong>

                            </div>


                            <div className="spell-detail__stat">

                                <span>
                                    Components
                                </span>

                                <strong>
                                    {components}
                                </strong>

                            </div>


                            <div className="spell-detail__stat">

                                <span>
                                    Concentration
                                </span>

                                <strong>
                                    {spell.concentration
                                        ? "Yes"
                                        : "No"}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* HIGHER LEVEL */}

                    {spell.higher_level && (
                        <section className="spell-detail__section">

                            <span className="spell-detail__section-label">
                                At Higher Levels
                            </span>

                            <p className="spell-detail__description">
                                {typeof spell.higher_level === "object"
                                    ? Object.values(
                                        spell.higher_level
                                    )
                                        .filter(Boolean)
                                        .join(" ")
                                    : spell.higher_level}
                            </p>

                        </section>
                    )}

                </section>

            </div>

        </main>
    );
};

export default SpellDetail;