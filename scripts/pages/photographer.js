//Ici par exemple, on peut accèder à la page de Wilkens 
//par son id avec http://localhost:????/photographer.html?id=930

import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js';
import { getPhotographerById } from '../utils/api.js';
import { photographerHeader } from '../utils/domLinker.js';

const getPhotographerIdFromURL = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
};

const displayDataById = async () => {
    const photographerId = getPhotographerIdFromURL();
    const photographer = await getPhotographerById(photographerId);

    if (photographer) {
    
        //Crée un modèle type de photographe, si les données sont récupérées 
        const photographerPageModel = photographerTemplate(photographer);
        const photographerPageDOM = photographerPageModel.getPhotographerPageDOM();
        document.body.appendChild(photographerPageDOM);
        photographerHeader.appendChild(photographerPageDOM);
        
        // test pour afficher les tarifs journalier des photographes
        const tarifJournalier = document.getElementById('tarif-journalier');
        const tarifContainer = document.createElement('div');
        tarifContainer.textContent = `${photographer.price} €/jour`;
        tarifJournalier.appendChild(tarifContainer);

        

    } else {
        console.error("Photographe non trouvé");
    }
};



displayDataById();