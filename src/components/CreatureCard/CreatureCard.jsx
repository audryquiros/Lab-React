import { Link } from "react-router-dom";

import "./CreatureCard.css";

const CreatureCard = ({ creature }) => {
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

    return (
        <article className="creature-card">
            <div className="creature-card__ornament">
                ✦
            </div>

            <div className="creature-card__content">
                <span className="creature-card__label">
                    Magical Creature
                </span>

                <h3 className="creature-card__name">
                    {creature.name}
                </h3>

                <div className="creature-card__divider">
                    <span>✦</span>
                </div>

                <div className="creature-card__info">
                    <div className="creature-card__detail">
                        <span>Type</span>
                        <strong>{creatureType}</strong>
                    </div>

                    <div className="creature-card__detail">
                        <span>Size</span>
                        <strong>{size}</strong>
                    </div>

                    <div className="creature-card__detail">
                        <span>Challenge</span>
                        <strong>{challengeRating}</strong>
                    </div>
                </div>

                <Link
                    to={`/creature/${creature.key || creature.slug}`}
                    className="creature-card__button"
                >
                    Discover creature
                    <span>→</span>
                </Link>
            </div>
        </article>
    );
};

export default CreatureCard;