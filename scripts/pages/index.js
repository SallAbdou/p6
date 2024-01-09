import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js'
import { getPhotographers } from '../utils/api.js';
import { photographersSection } from '../utils/domLinker.js';
// //on récupère les données de photographers.json
// const getPhotographers = async () => {
//     try {
//     const dataPhotographers = await fetch(`/data/photographers.json`);
//     return await dataPhotographers.json();
// //on affichera dans la console un message d'erreur si le fichier est introuvable
//     } catch (error) {
//     console.error(error, "Fichier JSON introuvable");
//     }
// };

// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// }

// async function init() {
//     // Récupère les datas des photographes et les affiche
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// }

// init();

const displayData = data => {
    data.forEach(element => {
        const photographerModel = photographerTemplate(element);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

getPhotographers().then(data => displayData(data.photographers))