import { Link } from "react-router-dom";

import "./SpellCard.css";

const SpellCard = ({ spell }) => {
    const level =
        typeof spell.level === "object"
            ? spell.level?.name
            : spell.level ?? "Unknown";

    const school =
        typeof spell.school === "object"
            ? spell.school?.name
            : spell.school || "Unknown";

    return (
        <article className="spell-card">

            <div className="spell-card__ornament">
                ✦
            </div>

            <div className="spell-card__content">

                <span className="spell-card__label">
                    Arcane Record
                </span>

                <h3 className="spell-card__name">
                    {spell.name}
                </h3>

                <div className="spell-card__divider">
                    <span>✦</span>
                </div>

                <div className="spell-card__info">

                    <div className="spell-card__detail">
                        <span>Level</span>
                        <strong>
                            {level}
                        </strong>
                    </div>

                    <div className="spell-card__detail">
                        <span>School</span>
                        <strong>
                            {school}
                        </strong>
                    </div>

                </div>

                <Link
                    to={`/spell/${spell.key || spell.slug}`}
                    className="spell-card__button"
                >
                    Open spell
                    <span>→</span>
                </Link>

            </div>

        </article>
    );
};

export default SpellCard;