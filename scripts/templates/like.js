import { tarifJournalier, totalLikes } from '../utils/domLinker'
import { state } from '../utils/state'

export const likeTemplate = photographerData => {
  const getLikesCardDOM = () => {
    // test pour afficher les tarifs journalier des photographes
    tarifJournalier.textContent = `${photographerData.price} €/jour`
    // calcul du nombre de likes
    const total = state.medias.reduce((acc, currentValue) => acc + currentValue.likes, 0)

    // Ajouter le nombre total de likes au tarif container
    totalLikes.textContent += `${total}`
  }

  return { getLikesCardDOM }
}
