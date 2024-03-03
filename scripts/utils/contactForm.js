import { contactModal, imgCloseModal } from './domLinker'

export const displayModal = () => {
  contactModal.style.display = 'block'
  imgCloseModal.focus()
}

export const closeModal = () => {
  contactModal.style.display = 'none'
}
