import { lightbox, imgLightbox, titleLightbox, videoLightbox, btnCloseLightbox } from '../utils/domLinker'
import { state } from '../utils/state'

let currentIndex
// let mediaItems = []

const updateSlide = () => {
  const data = state.medias[currentIndex]
  imgLightbox.style.display = data.video ? 'none' : 'flex'
  videoLightbox.style.display = data.video ? 'flex' : 'none'
  const element = data.video ? videoLightbox : imgLightbox

  element.src = `assets/medias/${data?.image || data?.video}`
  element.alt = data.title
  element.ariaLabel = data.title

  titleLightbox.innerHTML = data.title
  titleLightbox.ariaLabel = data.title
}

export const navigateCarousel = sens => {
  if (sens === -1 && currentIndex === 0) {
    currentIndex = state.medias.length - 1
  } else if (sens === 1 && currentIndex === (state.medias.length - 1)) {
    currentIndex = 0
  } else {
    currentIndex = currentIndex + sens
  }

  updateSlide()
}

export const openCarousel = data => {
  lightbox.style.display = 'flex'

  currentIndex = state.medias.indexOf(data)
  console.log('currentIndex:', currentIndex)

  btnCloseLightbox.focus()

  updateSlide()
}

export const closeCarousel = () => {
  lightbox.style.display = 'none'
}


