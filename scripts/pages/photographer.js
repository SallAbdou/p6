// Ici par exemple, on peut accèder à la page de Wilkens
// par son id avec http://localhost:????/photographer.html?id=930

import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js'
import { mediaTemplate } from '../templates/media.js'
import { getPhotographerById, getMediaByPhotographerId } from '../utils/api.js'
import {
  photographerHeader, mediaContainer, imgCloseModal, firstname, name, email,
  message, form, btnCloseLightbox, leftArrow, rightArrow, selectSortMedias
} from '../utils/domLinker.js'
import { closeModal } from '../utils/contactForm.js'
import { closeCarousel, navigateCarousel } from '../templates/carousel.js'
import { likeTemplate } from '..//templates/like.js'
import { state } from '../utils/state.js'
import { sortMedia } from '../utils/sortMedia.js'

const getPhotographerIdFromURL = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return parseInt(urlParams.get('id'))
}

const updateMedias = () => {
  mediaContainer.innerHTML = ''

  state.medias.forEach(media => {
    const mediaPageModel = mediaTemplate(media)
    const mediaPageDOM = mediaPageModel.getMediaCardDOM()
    mediaContainer.appendChild(mediaPageDOM)
  })

  console.log('state.medias:', state.medias)
}

const displayDataById = async () => {
  const photographerId = getPhotographerIdFromURL()
  const photographer = await getPhotographerById(photographerId)
  state.medias = await getMediaByPhotographerId(photographerId)

  if (photographer) {
    // Crée un modèle type de photographe, si les données sont récupérées
    const photographerPageModel = photographerTemplate(photographer)
    const photographerPageDOM = photographerPageModel.getPhotographerPageDOM()
    photographerHeader.appendChild(photographerPageDOM)

    likeTemplate(photographer).getLikesCardDOM()

    // creating medias
    updateMedias()
  } else {
    console.error('Photographe non trouvé')
  }
}

// EventListener des modales
imgCloseModal.addEventListener('click', () => closeModal())
btnCloseLightbox.addEventListener('click', () => closeCarousel())
// EventListener du menu déroulant
selectSortMedias.addEventListener('change', () => {
  const sortBy = selectSortMedias.value // Ici, on récupère la valeur sélectionnée dans le dropdown
  // Puis on applique le tri sélectionné
  state.medias = sortMedia(state.medias.slice(), sortBy)
  updateMedias()
})

// Focus de la modale
firstname.setAttribute('tabindex', '0')
name.setAttribute('tabindex', '0')
email.setAttribute('tabindex', '0')
message.setAttribute('tabindex', '0')
imgCloseModal.setAttribute('tabindex', '0')

form.addEventListener('submit', e => {
  e.preventDefault()

  console.log(`
        firstname: ${firstname.value}
        name: ${name.value}
        email: ${email.value}
        message: ${message.value}
    `)
})

displayDataById()

// events lightbox
leftArrow.addEventListener('click', () => navigateCarousel(-1))
rightArrow.addEventListener('click', () => navigateCarousel(1))

// All events keys pressed
const keyPress = (event) => {
  const key = event.key || event.keyCode

  if (key === 'ArrowLeft' || key === 37) {
    navigateCarousel(-1)
  }
  if (key === 'ArrowRight' || key === 39) {
    navigateCarousel(1)
  }

  // press Escape
  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeCarousel()
    closeModal()
  }

  if (key === 'Enter') {
    console.log('enter pressed', event.target)

    if (event.target === btnCloseLightbox) {
      closeCarousel()
    }

    if (event.target === imgCloseModal) {
      closeModal()
    }

    if (event.target === leftArrow) {
      navigateCarousel(-1)
    }

    if (event.target === rightArrow) {
      navigateCarousel(1)
    }

    if (event.target.classList.contains('container-like')) {
      event.stopPropagation()
      event.preventDefault()
      event.target.click()
    }
  }
}

document.addEventListener('keydown', keyPress)
