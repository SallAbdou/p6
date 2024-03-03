import '../../css/style.scss'
import { photographerTemplate } from '../templates/photographer.js'
import { getPhotographers } from '../utils/api.js'
import { photographersSection } from '../utils/domLinker.js'

const displayData = data => {
  data.forEach(element => {
    const photographerModel = photographerTemplate(element)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

getPhotographers().then(data => displayData(data.photographers))
