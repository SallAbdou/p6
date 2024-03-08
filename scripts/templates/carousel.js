import { lightbox, lightboxContainer, mediaContainer } from '../utils/domLinker'

let currentIndex = 0
let mediaItems = []

export const openCarousel = () => {
  lightbox.style.display = 'flex'

  lightboxContainer.innerHTML = ''

  // Affiche le carrousel et initialise les médias
  currentIndex = 0
  const cloneMediaItems = mediaContainer.cloneNode(true)

  lightboxContainer.appendChild(cloneMediaItems)

  mediaItems = document.querySelectorAll('#lightbox-container article')

  mediaItems.forEach(item => {
    const image = item.querySelector('img')
    const video = item.querySelector('video')
    if (image) {
      image.classList.add('carousel-image')
    }
    if (video) {
      video.id = 'carousel-video'
    }
  })

  // gestion des flèches
  const leftArrow = document.getElementById('left-arrow')
  leftArrow.classList.add('left-arrow')
  const rightArrow = document.getElementById('right-arrow')
  rightArrow.classList.add('right-arrow')
  leftArrow.addEventListener('click', () => navigateCarousel('prev'))
  rightArrow.addEventListener('click', () => navigateCarousel('next'))

  // On les rend focusable (mettre le carroussel sur un autre plan, pour pas avoir à défiler les images avant)
  leftArrow.tabIndex = '0'
  rightArrow.tabIndex = '0'

  updateCarousel()

  // Ajoute un événement pour fermer le carrousel
  document.addEventListener('keydown', keyPress)
}

export const closeCarousel = () => {
  lightbox.style.display = 'none'
  document.removeEventListener('keydown', keyPress)
}

// Gère les touches de navigation du carrousel
const keyPress = (event) => {
  if (event.key === 'ArrowLeft') {
    navigateCarousel('prev')
    console.log('testleft') // test console
  } else if (event.key === 'ArrowRight') {
    navigateCarousel('next')
    console.log('testright')// test console
  } else if (event.key === 'Enter') {
    closeCarousel()
  }
}

// Navigue dans le carrousel
const navigateCarousel = (direction) => {
  if (direction === 'prev' && currentIndex > 0) {
    currentIndex -= 1
  } else if (direction === 'next' && currentIndex < mediaItems.length - 1) {
    currentIndex += 1
  } else if (direction === 'prev' && currentIndex === 0) {
    currentIndex = mediaItems.length - 1
  } else if (direction === 'next' && currentIndex === mediaItems.length - 1) {
    currentIndex = 0
  }

  updateCarousel()
}

// Met à jour l'affichage du carrousel en fonction de l'index
const updateCarousel = () => {
  mediaItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}
