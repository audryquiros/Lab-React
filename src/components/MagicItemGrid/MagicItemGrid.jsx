import MagicItemCard from "../MagicItemCard/MagicItemCard";

import "./MagicItemGrid.css";

const MagicItemGrid = ({ items }) => {
    if (!items || items.length === 0) {
        return (
            <div className="magic-item-grid__empty">
                <p>
                    No enchanted artifacts were found.
                </p>
            </div>
        );
    }

    return (
        <div className="magic-item-grid">
            {items.map((item, index) => (
                <MagicItemCard
                    key={
                        item.slug ||
                        item.key ||
                        index
                    }
                    item={item}
                />
            ))}
        </div>
    );
};

export default MagicItemGrid;