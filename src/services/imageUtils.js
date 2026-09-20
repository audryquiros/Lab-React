const OPEN5E_SITE_URL = "https://open5e.com";

export const getOpen5eImageUrl = (image) => {
    const fileUrl =
        image?.file_url ||
        image?.file_urls?.original ||
        image?.url;

    if (!fileUrl) {
        return null;
    }

    if (fileUrl.startsWith("http")) {
        return fileUrl;
    }

    if (fileUrl.startsWith("/")) {
        return `${OPEN5E_SITE_URL}${fileUrl}`;
    }

    return `${OPEN5E_SITE_URL}/${fileUrl}`;
};
