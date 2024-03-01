//Ici par exemple, on peut accèder à la page de Wilkens 
//par son id avec http://localhost:????/photographer.html?id=930

import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate, } from '../templates/media.js';
import { getPhotographerById, getMediaByPhotographerId } from '../utils/api.js';
import {
    photographerHeader, mediaContainer, imgCloseModal, firstname, name, email,
    message, form, btnCloseLightbox
} from '../utils/domLinker.js';
import { closeModal } from '../utils/contactForm.js';
import { closeCarousel } from '../templates/carousel.js';
import { likeTemplate } from '..//templates/like.js';
import { state } from '../utils/state.js';
import { sortMedia } from '../utils/sortMedia.js';


const getPhotographerIdFromURL = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return parseInt(urlParams.get('id'));
};

const displayDataById = async () => {
    const photographerId = getPhotographerIdFromURL();
    const photographer = await getPhotographerById(photographerId);
    state.medias = await getMediaByPhotographerId(photographerId)


    console.log('state.medias:', state.medias)

    if (photographer) {

        //Crée un modèle type de photographe, si les données sont récupérées 
        const photographerPageModel = photographerTemplate(photographer);
        const photographerPageDOM = photographerPageModel.getPhotographerPageDOM();
        photographerHeader.appendChild(photographerPageDOM);

        likeTemplate(photographer).getLikesCardDOM()

        // creating medias
        state.medias.forEach(media => {
            const mediaPageModel = mediaTemplate(media)
            const mediaPageDOM = mediaPageModel.getMediaCardDOM()
            mediaContainer.appendChild(mediaPageDOM)
        })


    } else {
        console.error("Photographe non trouvé");
    }
};

//Fonction d'affichage des médias triés 
const displaySortedMedia = (sortBy) => {
    mediaContainer.innerHTML = '';
    const sortedMedia = sortMedia(state.medias.slice(), sortBy);

    sortedMedia.forEach(media => {
        const mediaPageModel = mediaTemplate(media);
        const mediaPageDOM = mediaPageModel.getMediaCardDOM();
        mediaContainer.appendChild(mediaPageDOM);
    });
};


//EventListener
imgCloseModal.addEventListener('click', () => closeModal())
btnCloseLightbox.addEventListener('click', () => closeCarousel())
//EventListener du menu déroulant
document.getElementById('sort-dropdown').addEventListener('change', function() {
    var sortBy = this.value; // Ici, on récupère la valeur sélectionnée dans le dropdown
    displaySortedMedia(sortBy); // Puis on appelle displaySortedMedia avec le tri sélectionné 
});


//Focus de la modale
firstname.setAttribute('tabindex', '0')
name.setAttribute('tabindex', '0')
email.setAttribute('tabindex', '0')
message.setAttribute('tabindex', '0')
imgCloseModal.setAttribute('tabindex', '0');



form.addEventListener('submit', e => {
    e.preventDefault()

    console.log(`
        firstname: ${firstname.value}
        name: ${name.value}
        email: ${email.value}
        message: ${message.value}
    `)
})

displayDataById();
