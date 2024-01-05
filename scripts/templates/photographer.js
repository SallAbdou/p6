export const photographerTemplate = data => {
    const {  name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
       
        //afficher l'image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        article.appendChild(img);

        //afficher le nom/prenom
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(h2);
       
        // Affiche la ville et le pays 
        const cityAndCountry = document.createElement('h3');
        cityAndCountry.textContent = `${city}, ${country}`;
        article.appendChild(cityAndCountry);

        // Affiche la tagline 
        const taglineHeading = document.createElement('h4');
        taglineHeading.textContent = tagline;
        article.appendChild(taglineHeading);

        // Affiche le prix suivi de "€/jour" 
        const tarif = document.createElement('p');
        tarif.textContent = `${price} €/jour`;
        article.appendChild(tarif);
       
        return (article);

    }
    return { name, picture, getUserCardDOM }
}