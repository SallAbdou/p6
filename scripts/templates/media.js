export const mediaTemplate = data => {
    const { id, photographerId, title, image, likes, date, price } = data
    const picture = `assets/medias/${image}`;

    const getMediaCardDOM = () => {
        const article = document.createElement('article');

        const img = document.createElement('img')
        img.alt = title
        img.setAttribute("src", picture)
        article.appendChild(img);
        
        return article
    }

    return { getMediaCardDOM }
}