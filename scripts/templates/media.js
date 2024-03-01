import { openCarousel, closeCarousel } from './carousel.js';
import { state } from '../utils/state.js';
import { totalLikes } from '../utils/domLinker.js';

export const mediaTemplate = data => {
    const { id, photographerId, title, image, likes, date, price, video } = data;
    const mediaPath = `assets/medias/`;
    const picture = `assets/medias/${image}`;

    const getMediaCardDOM = () => {
        const a = document.createElement('a')
        a.href = "#"
        const article = document.createElement('article');
        a.appendChild(article)

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

        //description sous la photo et bouton like
        const containerDescription = document.createElement('div')
        containerDescription.setAttribute('class', 'container-description')

        const spanName = document.createElement('span')
        spanName.setAttribute('class', 'name')
        spanName.innerHTML = title
        containerDescription.appendChild(spanName)

        const containerLike = document.createElement('div')
        containerLike.setAttribute('class', 'container-like')
        containerDescription.appendChild(containerLike)

        const spanLikeNumber = document.createElement('span')
        spanLikeNumber.setAttribute('class', 'like-number')
        spanLikeNumber.innerHTML = likes
        containerLike.appendChild(spanLikeNumber)

        const imageLikeIcon = document.createElement('img')
        imageLikeIcon.src = '/assets/icons/favorite.png'
        imageLikeIcon.alt = 'like'
        containerLike.appendChild(imageLikeIcon)

        imageLikeIcon.addEventListener('click', e => {
            e.stopPropagation()
            e.preventDefault()

            // increment like and total like one time on click
            if (!imageLikeIcon.classList.contains('liked')) {
                imageLikeIcon.classList.add('liked')
                spanLikeNumber.innerHTML = likes + 1

                console.log(state.medias)

                let findCurrentMedia = state.medias.find(media => media.id === data.id)
                findCurrentMedia.likes++


                const total = state.medias.reduce((acc, currentValue) => acc + currentValue.likes, 0)
                totalLikes.textContent = `${total}`;
            }
        })

        article.appendChild(containerDescription)

        a.setAttribute('tabindex', '0'); //rend les articles focusables

        a.addEventListener('click', () => {
            openCarousel();
        });

        return a;
    };



    return { getMediaCardDOM };
};
