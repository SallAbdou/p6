import { tarifJournalier, tarifContainer } from "../utils/domLinker";
import { state } from "../utils/state";

export const likeTemplate = photographerData => {


    const getLikesCardDOM = () => {

        // test pour afficher les tarifs journalier des photographes
        tarifContainer.textContent = `${photographerData.price} €/jour`;
        tarifJournalier.appendChild(tarifContainer);

        //calcul du nombre de likes
        // let totalLikes = 0;
        // medias.forEach(media => {
        //     totalLikes += media.likes || 0;
        // });
        const totalLikes = state.medias.reduce((acc, currentValue) => acc + currentValue.likes, 0)

        // Ajouter le nombre total de likes au tarif container
        tarifContainer.textContent += `  ${totalLikes} likes`;


        // Ajouter le container à tarif journallier
        tarifJournalier.appendChild(tarifContainer);
    }

    return { getLikesCardDOM }
}