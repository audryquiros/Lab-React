import CreatureCard from "../CreatureCard/CreatureCard";

import "./CreatureGrid.css";

const CreatureGrid = ({ creatures }) => {
    if (!creatures || creatures.length === 0) {
        return (
            <div className="creature-grid__empty">
                <p>No magical creatures were found.</p>
            </div>
        );
    }

    return (
        <div className="creature-grid">
            {creatures.map((creature, index) => (
                <CreatureCard
                    key={creature.slug || creature.key || index}
                    creature={creature}
                />
            ))}
        </div>
    );
};

export default CreatureGrid;