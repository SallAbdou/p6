import { openCarousel, closeCarousel } from './carousel.js';

export const mediaTemplate = data => {
    const { id, photographerId, title, image, likes, date, price, video } = data;
    const mediaPath = `assets/medias/`;
    const picture = `assets/medias/${image}`;

    const getMediaCardDOM = () => {
        const article = document.createElement('article');

        if (video) {
           
            //prise en compte des vidéos
            const videoElement = document.createElement('video');
            videoElement.classList.add('class-perso-video');
            videoElement.controls = false; //contrôle des médias vidéos, mettre en false pour enlever les contrôles

          
            // Ajoute les sources des vidéos
            const sourceElement = document.createElement('source');
            sourceElement.src = `${mediaPath}/${video}`;
            sourceElement.type = 'video/mp4';
            videoElement.appendChild(sourceElement);

            article.appendChild(videoElement);

        } else {
            const img = document.createElement('img');
            img.alt = title;
            img.setAttribute('src', picture);
            article.appendChild(img);
        }
        
        article.setAttribute('tabindex', '0'); //rend les articles focusables
        
        article.addEventListener('click', () => {
            openCarousel();
        });

        return article;
    };

    return { getMediaCardDOM };
};