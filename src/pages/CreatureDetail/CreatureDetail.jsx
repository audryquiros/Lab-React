import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCreatureByKey } from "../../services/api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./CreatureDetail.css";

const CreatureDetail = () => {
    const { id } = useParams();

    const [creature, setCreature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCreature = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getCreatureByKey(id);

                setCreature(data);
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't open this magical creature's record."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCreature();
    }, [id]);

    if (loading) {
        return (
            <main className="creature-detail">
                <Loader />
            </main>
        );
    }

    if (error) {
        return (
            <main className="creature-detail">
                <ErrorMessage message={error} />

                <Link
                    to="/"
                    className="creature-detail__back"
                >
                    ← Back to library
                </Link>
            </main>
        );
    }

    if (!creature) {
        return null;
    }

    /* =========================
       SAFE VALUES
    ========================= */

    const creatureType =
        typeof creature.type === "object"
            ? creature.type?.name
            : creature.type || "Unknown";

    const size =
        typeof creature.size === "object"
            ? creature.size?.name
            : creature.size || "Unknown";

    const challengeRating =
        typeof creature.challenge_rating === "object"
            ? creature.challenge_rating?.name
            : creature.challenge_rating || "—";

    const alignment =
        typeof creature.alignment === "object"
            ? creature.alignment?.name
            : creature.alignment || "Unknown";

    /* =========================
       SPEED
    ========================= */

    const speed =
        typeof creature.speed === "object"
            ? [
                creature.speed.walk &&
                    `Walk: ${creature.speed.walk}`,

                creature.speed.swim &&
                    `Swim: ${creature.speed.swim}`,

                creature.speed.fly &&
                    `Fly: ${creature.speed.fly}`,

                creature.speed.climb &&
                    `Climb: ${creature.speed.climb}`,
            ]
                .filter(Boolean)
                .join(" · ")
            : creature.speed || "—";

    return (
        <main className="creature-detail">

            <div className="creature-detail__container">

                {/* BACK BUTTON */}

                <Link
                    to="/"
                    className="creature-detail__back"
                >
                    ← Back to library
                </Link>


                {/* CREATURE CARD */}

                <section className="creature-detail__card">

                    <div className="creature-detail__symbol">
                        ✦
                    </div>


                    {/* HEADER */}

                    <div className="creature-detail__header">

                        <span className="creature-detail__label">
                            Magical Creature
                        </span>

                        <h1>
                            {creature.name}
                        </h1>

                        <div className="creature-detail__divider">
                            <span>✦</span>
                        </div>

                    </div>


                    {/* OVERVIEW */}

                    <div className="creature-detail__overview">

                        <div className="creature-detail__item">
                            <span>Type</span>

                            <strong>
                                {creatureType}
                            </strong>
                        </div>


                        <div className="creature-detail__item">
                            <span>Size</span>

                            <strong>
                                {size}
                            </strong>
                        </div>


                        <div className="creature-detail__item">
                            <span>Challenge Rating</span>

                            <strong>
                                {challengeRating}
                            </strong>
                        </div>


                        <div className="creature-detail__item">
                            <span>Alignment</span>

                            <strong>
                                {alignment}
                            </strong>
                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    {creature.desc && (
                        <section className="creature-detail__section">

                            <span className="creature-detail__section-label">
                                Description
                            </span>

                            <p className="creature-detail__description">
                                {creature.desc}
                            </p>

                        </section>
                    )}


                    {/* COMBAT STATISTICS */}

                    <section className="creature-detail__section">

                        <span className="creature-detail__section-label">
                            Combat Statistics
                        </span>

                        <div className="creature-detail__stats">

                            <div className="creature-detail__stat">

                                <span>
                                    Armor Class
                                </span>

                                <strong>
                                    {typeof creature.armor_class === "object"
                                        ? creature.armor_class?.name ||
                                          creature.armor_class?.value ||
                                          "—"
                                        : creature.armor_class || "—"}
                                </strong>

                            </div>


                            <div className="creature-detail__stat">

                                <span>
                                    Hit Points
                                </span>

                                <strong>
                                    {creature.hit_points || "—"}
                                </strong>

                            </div>


                            <div className="creature-detail__stat">

                                <span>
                                    Speed
                                </span>

                                <strong>
                                    {speed}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* ACTIONS */}

                    {creature.actions &&
                        creature.actions.length > 0 && (

                            <section className="creature-detail__section">

                                <span className="creature-detail__section-label">
                                    Actions
                                </span>


                                <div className="creature-detail__actions">

                                    {creature.actions.map(
                                        (action, index) => {

                                            const actionName =
                                                typeof action.name ===
                                                "object"
                                                    ? action.name?.name
                                                    : action.name;

                                            const actionDescription =
                                                typeof action.desc ===
                                                "object"
                                                    ? action.desc?.name
                                                    : action.desc;

                                            return (
                                                <div
                                                    className="creature-detail__action"
                                                    key={index}
                                                >

                                                    <h3>
                                                        {actionName ||
                                                            "Unknown Action"}
                                                    </h3>

                                                    <p>
                                                        {actionDescription ||
                                                            "No description available."}
                                                    </p>

                                                </div>
                                            );
                                        }
                                    )}

                                </div>

                            </section>
                        )}

                </section>

            </div>

        </main>
    );
};

export default CreatureDetail;