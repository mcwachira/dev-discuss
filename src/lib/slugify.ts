const SlugifyFunction = (slug: string) => {
    return slug.toLowerCase()
        .trim()
        .normalize("NFD") // removes accents like é → e
        .replace(/[\u0300-\u036f]/g, "") // further clean accents
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // replace spaces with dash
        .replace(/-+/g, "-") // remove multiple dashes
        .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

export default SlugifyFunction