import { displayModal, closeModal } from '../utils/contactForm.js';


export const photographerTemplate = data => {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;



    //Importe les données des photographes 
    function getUserCardDOM() {
        const article = document.createElement('article');
    
        // Créer une div pour regrouper le nom, la ville, et la tagline
        const infoDiv = document.createElement('div');
    
        // Affiche le nom (H2)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        infoDiv.appendChild(h2);
    
        // Affiche la ville (H3)
        const cityAndCountry = document.createElement('h3');
        cityAndCountry.textContent = `${city}, ${country}`;
        infoDiv.appendChild(cityAndCountry);
    
        // Affiche la tagline (H4)
        const taglineHeading = document.createElement('h4');
        taglineHeading.textContent = tagline;
        infoDiv.appendChild(taglineHeading);
    
        // Ajoute la div infoDiv à l'article
        article.appendChild(infoDiv);
    
        // Ajoute le bouton "Contactez-moi"
        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contactez-moi';
        contactButton.classList.add('contact_button');
        contactButton.onclick = () => displayModal();
        article.appendChild(contactButton);
    
        // Affiche l'image
        const img = document.createElement('img');
        img.alt = `Portrait de ${name}`;
        img.setAttribute('src', picture);
        article.appendChild(img);
    
        // Rendre l'article focusable
        article.setAttribute('tabindex', '0');
    
        return article;
    }
    
    


    function getPhotographerPageDOM() {
        const page = document.createElement('div');
        page.classList.add('photographer-page');
        page.appendChild(getUserCardDOM());

        return page;
    }

    return { name, picture, getUserCardDOM, getPhotographerPageDOM };
}