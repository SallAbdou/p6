import { displayModal } from '../utils/contactForm.js'

export const photographerTemplate = data => {
  const { name, portrait, city, country, tagline, price, id } = data
  const picture = `assets/photographers/${portrait}`

  // Importe les données des photographes
  function getUserCardDOM () {
    const a = document.createElement('a')
    a.href = `photographer.html?id=${id}`
    const article = document.createElement('article')

    // afficher l'image
    const img = document.createElement('img')
    img.alt = `Portrait de ${name}`
    img.setAttribute('src', picture)
    article.appendChild(img)

    // afficher le nom/prenom
    const h2 = document.createElement('h2')
    h2.textContent = name
    article.appendChild(h2)

    // Affiche la ville et le pays
    const cityAndCountry = document.createElement('h3')
    cityAndCountry.textContent = `${city}, ${country}`
    article.appendChild(cityAndCountry)

    // Affiche la tagline
    const taglineHeading = document.createElement('h4')
    taglineHeading.textContent = tagline
    article.appendChild(taglineHeading)

    // Affiche le prix suivi de "€/jour"
    const tarif = document.createElement('p')
    tarif.textContent = `${price} €/jour`
    article.appendChild(tarif)

    // Rend les articles focusables
    article.setAttribute('tabindex', '0')

    a.appendChild(article)

    return (a)
  }

  function getUserCardPhotographerDOM () {
    const article = document.createElement('article')

    // Créer une div pour regrouper le nom, la ville, et la tagline
    const infoDiv = document.createElement('div')

    // Affiche le nom (H2)
    const h2 = document.createElement('h2')
    h2.textContent = name
    infoDiv.appendChild(h2)

    // Affiche la ville (H3)
    const cityAndCountry = document.createElement('h3')
    cityAndCountry.textContent = `${city}, ${country}`
    infoDiv.appendChild(cityAndCountry)

    // Affiche la tagline (H4)
    const taglineHeading = document.createElement('h4')
    taglineHeading.textContent = tagline
    infoDiv.appendChild(taglineHeading)

    // Ajoute la div infoDiv à l'article
    article.appendChild(infoDiv)

    // Ajoute le bouton "Contactez-moi"
    const contactButton = document.createElement('button')
    contactButton.textContent = 'Contactez-moi'
    contactButton.classList.add('contact_button')
    contactButton.onclick = () => displayModal()
    article.appendChild(contactButton)

    // Affiche l'image
    const img = document.createElement('img')
    img.alt = `Portrait de ${name}`
    img.setAttribute('src', picture)
    article.appendChild(img)

    // Rendre l'article focusable
    article.setAttribute('tabindex', '0')

    return article
  }

  function getPhotographerPageDOM () {
    const page = document.createElement('div')
    page.classList.add('photographer-page')
    page.appendChild(getUserCardPhotographerDOM())

    return page
  }

  return { name, picture, getUserCardDOM, getPhotographerPageDOM }
}
