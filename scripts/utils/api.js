// Définition de l'URL vers le fichier JSON contenant les données des photographes
const URL_PHOTOGRAPHER = 'data/photographers.json'

// Fonction pour récupérer les données des photographes
export const getPhotographers = () => fetch(URL_PHOTOGRAPHER).then(res => res.json())

// Fonction pour récupérer les données des photographes par son id
export const getPhotographerById = async (photographerId) => {
  try {
    const photographersData = await getPhotographers()
    const photographer = photographersData.photographers.find((p) => p.id === photographerId)

    if (!photographer) {
      throw new Error('Photographe non trouvé')
    }

    return photographer
  } catch (error) {
    throw new Error(`Error de récupération des datas par ID: ${error.message}`)
  }
}

// Fonction pour récupérer les médias d'un photographe par son ID
export const getMediaByPhotographerId = photographerId => getPhotographers().then(data => data.media.filter(media => media.photographerId === photographerId))
