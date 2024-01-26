//Ici par exemple, on peut accèder à la page de Wilkens 
//par son id avec http://localhost:????/photographer.html?id=930

import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';
import { getPhotographerById, getMediaByPhotographerId } from '../utils/api.js';
import { photographerHeader, mediaContainer, imgCloseModal } from '../utils/domLinker.js';
import { closeModal } from '../utils/contactForm.js';


const getPhotographerIdFromURL = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return parseInt(urlParams.get('id'));
};

const displayDataById = async () => {
    const photographerId = getPhotographerIdFromURL();
    const photographer = await getPhotographerById(photographerId);
    const medias = await getMediaByPhotographerId(photographerId)

    console.log('medias:', medias)

    if (photographer) {

        //Crée un modèle type de photographe, si les données sont récupérées 
        const photographerPageModel = photographerTemplate(photographer);
        const photographerPageDOM = photographerPageModel.getPhotographerPageDOM();
        photographerHeader.appendChild(photographerPageDOM);

        // test pour afficher les tarifs journalier des photographes
        const tarifJournalier = document.getElementById('tarif-journalier');
        const tarifContainer = document.createElement('div');
        tarifContainer.textContent = `${photographer.price} €/jour`;
        tarifJournalier.appendChild(tarifContainer);

        // creating medias
        medias.forEach(media => {
            const mediaPageModel = mediaTemplate(media)
            const mediaPageDOM = mediaPageModel.getMediaCardDOM()
            mediaContainer.appendChild(mediaPageDOM)
        })


    } else {
        console.error("Photographe non trouvé");
    }
};

imgCloseModal.addEventListener('click', () => closeModal())


displayDataById();

