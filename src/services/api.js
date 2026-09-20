const API_URL = "https://api.open5e.com/v2";

const buildQuery = (page, limit, filters = {}, search = "") => {
    const params = new URLSearchParams();

    if (search.trim()) {
        params.set("name__icontains", search.trim());
    }

    params.set("page", page);
    params.set("limit", limit);

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.set(key, value);
        }
    });

    return params.toString();
};

const request = async (endpoint, errorMessage) => {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error(errorMessage, error);
        throw error;
    }
};

export const getCreatures = async (
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/creatures/?${buildQuery(page, limit, filters)}`,
        "No se pudieron obtener las criaturas"
    );
};

export const searchCreatures = async (
    name,
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/creatures/?${buildQuery(
            page,
            limit,
            filters,
            name
        )}`,
        "No se encontraron criaturas"
    );
};

export const getCreatureByKey = async (key) => {
    return request(
        `${API_URL}/creatures/${key}/`,
        "No se pudo obtener la criatura"
    );
};

export const getSpells = async (
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/spells/?${buildQuery(page, limit, filters)}`,
        "No se pudieron obtener los hechizos"
    );
};

export const searchSpells = async (
    name,
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/spells/?${buildQuery(
            page,
            limit,
            filters,
            name
        )}`,
        "No se encontraron hechizos"
    );
};

export const getSpellByKey = async (key) => {
    return request(
        `${API_URL}/spells/${key}/`,
        "No se pudo obtener el hechizo"
    );
};

export const getMagicItems = async (
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/magicitems/?${buildQuery(page, limit, filters)}`,
        "No se pudieron obtener los objetos mágicos"
    );
};

export const searchMagicItems = async (
    name,
    page = 1,
    limit = 20,
    filters = {}
) => {
    return request(
        `${API_URL}/magicitems/?${buildQuery(
            page,
            limit,
            filters,
            name
        )}`,
        "No se encontraron objetos mágicos"
    );
};

export const getMagicItemByKey = async (key) => {
    return request(
        `${API_URL}/magicitems/${key}/`,
        "No se pudo obtener el objeto mágico"
    );
};
