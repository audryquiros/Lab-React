const API_URL = "https://api.open5e.com/v2";

/**
 * Obtener criaturas
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const getCreatures = async (page = 1, limit = 20) => {
    try {
        const response = await fetch(
            `${API_URL}/creatures/?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error("No se pudieron obtener las criaturas");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo criaturas:", error);
        throw error;
    }
};

/**
 * Buscar criaturas por nombre
 * @param {string} name - Nombre de la criatura
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const searchCreatures = async (
    name,
    page = 1,
    limit = 20
) => {
    try {
        const response = await fetch(
            `${API_URL}/creatures/?name__icontains=${encodeURIComponent(
                name
            )}&page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error("No se encontraron criaturas");
        }

        return await response.json();
    } catch (error) {
        console.error("Error buscando criaturas:", error);
        throw error;
    }
};

/**
 * Obtener una criatura específica
 * @param {string} key - Key de la criatura
 */
export const getCreatureByKey = async (key) => {
    try {
        const response = await fetch(
            `${API_URL}/creatures/${key}/`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener la criatura");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo criatura:", error);
        throw error;
    }
};

/**
 * Obtener hechizos
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const getSpells = async (page = 1, limit = 20) => {
    try {
        const response = await fetch(
            `${API_URL}/spells/?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error("No se pudieron obtener los hechizos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo hechizos:", error);
        throw error;
    }
};


/**
 * Buscar hechizos por nombre
 * @param {string} name - Nombre del hechizo
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const searchSpells = async (
    name,
    page = 1,
    limit = 20
) => {
    try {
        const response = await fetch(
            `${API_URL}/spells/?name__icontains=${encodeURIComponent(
                name
            )}&page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error("No se encontraron hechizos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error buscando hechizos:", error);
        throw error;
    }
};


/**
 * Obtener un hechizo específico
 * @param {string} key - Key del hechizo
 */
export const getSpellByKey = async (key) => {
    try {
        const response = await fetch(
            `${API_URL}/spells/${key}/`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener el hechizo");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo hechizo:", error);
        throw error;
    }
};

/**
 * Obtener objetos mágicos
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const getMagicItems = async (
    page = 1,
    limit = 20
) => {
    try {
        const response = await fetch(
            `${API_URL}/magicitems/?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(
                "No se pudieron obtener los objetos mágicos"
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "Error obteniendo objetos mágicos:",
            error
        );

        throw error;
    }
};


/**
 * Buscar objetos mágicos por nombre
 * @param {string} name - Nombre del objeto
 * @param {number} page - Página actual
 * @param {number} limit - Cantidad de resultados
 */
export const searchMagicItems = async (
    name,
    page = 1,
    limit = 20
) => {
    try {
        const response = await fetch(
            `${API_URL}/magicitems/?name__icontains=${encodeURIComponent(
                name
            )}&page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(
                "No se encontraron objetos mágicos"
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "Error buscando objetos mágicos:",
            error
        );

        throw error;
    }
};


/**
 * Obtener un objeto mágico específico
 * @param {string} key - Key del objeto
 */
export const getMagicItemByKey = async (key) => {
    try {
        const response = await fetch(
            `${API_URL}/magicitems/${key}/`
        );

        if (!response.ok) {
            throw new Error(
                "No se pudo obtener el objeto mágico"
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "Error obteniendo objeto mágico:",
            error
        );

        throw error;
    }
};