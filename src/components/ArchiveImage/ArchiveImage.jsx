import creatureFallback from "../../assets/archive/creature.svg";
import spellFallback from "../../assets/archive/spell.svg";
import artifactFallback from "../../assets/archive/artifact.svg";
import armorFallback from "../../assets/archive/armor.svg";
import weaponFallback from "../../assets/archive/weapon.svg";
import ringFallback from "../../assets/archive/ring.svg";
import potionFallback from "../../assets/archive/potion.svg";

import "./ArchiveImage.css";

const getText = (value) => {
    if (!value) return "";
    if (typeof value === "object") {
        return value.name || value.value || "";
    }
    return String(value);
};

const getMagicItemFallback = (item) => {
    const text = `${getText(item?.category)} ${getText(item?.type)} ${item?.name || ""}`.toLowerCase();

    if (text.includes("armor") || text.includes("armour")) return armorFallback;
    if (text.includes("weapon") || text.includes("sword") || text.includes("bow") || text.includes("axe")) return weaponFallback;
    if (text.includes("ring")) return ringFallback;
    if (text.includes("potion")) return potionFallback;

    return artifactFallback;
};

const getFallback = (kind, data) => {
    if (kind === "creature") return creatureFallback;
    if (kind === "spell") return spellFallback;
    return getMagicItemFallback(data);
};

const getRemoteImage = (kind, data) => {
    if (kind !== "creature") return "";

    return (
        data?.illustration?.file_url ||
        data?.illustration?.url ||
        data?.image ||
        ""
    );
};

const ArchiveImage = ({ kind, data, variant = "card" }) => {
    const fallback = getFallback(kind, data);
    const remoteImage = getRemoteImage(kind, data);

    return (
        <div className={`archive-image archive-image--${variant}`}>
            <img
                src={remoteImage || fallback}
                alt={data?.name || "Archive illustration"}
                onError={(event) => {
                    if (event.currentTarget.src.endsWith(fallback)) return;
                    event.currentTarget.src = fallback;
                }}
            />
        </div>
    );
};

export default ArchiveImage;
