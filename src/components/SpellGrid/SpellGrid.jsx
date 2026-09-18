import SpellCard from "../SpellCard/SpellCard";

import "./SpellGrid.css";

const SpellGrid = ({ spells }) => {
    if (!spells || spells.length === 0) {
        return (
            <div className="spell-grid__empty">
                <p>
                    No magical spells were found.
                </p>
            </div>
        );
    }

    return (
        <div className="spell-grid">
            {spells.map((spell, index) => (
                <SpellCard
                    key={
                        spell.slug ||
                        spell.key ||
                        index
                    }
                    spell={spell}
                />
            ))}
        </div>
    );
};

export default SpellGrid;