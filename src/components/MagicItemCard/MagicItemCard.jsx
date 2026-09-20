import { Link } from "react-router-dom";

import ArchiveImage from "../ArchiveImage/ArchiveImage";

import "./MagicItemCard.css";

const MagicItemCard = ({ item }) => {
    const rarity =
        typeof item.rarity === "object"
            ? item.rarity?.name
            : item.rarity || "Unknown";

    const category =
        typeof item.category === "object"
            ? item.category?.name
            : item.category || "Unknown";

    const requiresAttunement =
        item.requires_attunement ??
        item.attunement ??
        false;

    return (
        <article className="magic-item-card">

            <ArchiveImage
                kind="magic-item"
                data={item}
                variant="card"
            />

            <div className="magic-item-card__ornament">
                ✦
            </div>

            <div className="magic-item-card__content">

                <span className="magic-item-card__label">
                    Enchanted Artifact
                </span>

                <h3 className="magic-item-card__name">
                    {item.name}
                </h3>

                <div className="magic-item-card__divider">
                    <span>✦</span>
                </div>

                <div className="magic-item-card__info">

                    <div className="magic-item-card__detail">
                        <span>Rarity</span>

                        <strong>
                            {rarity}
                        </strong>
                    </div>

                    <div className="magic-item-card__detail">
                        <span>Category</span>

                        <strong>
                            {category}
                        </strong>
                    </div>

                </div>

                <div className="magic-item-card__attunement">
                    <span>
                        Attunement
                    </span>

                    <strong>
                        {requiresAttunement
                            ? "Required"
                            : "Not required"}
                    </strong>
                </div>

                <Link
                    to={`/magic-item/${
                        item.key || item.slug
                    }`}
                    className="magic-item-card__button"
                >
                    Examine artifact
                    <span>→</span>
                </Link>

            </div>

        </article>
    );
};

export default MagicItemCard;