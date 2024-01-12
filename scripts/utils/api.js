const URL_PHOTOGRAPHER = `data/photographers.json`

export const getPhotographers = () => fetch(URL_PHOTOGRAPHER).then(res => res.json())


export const getPhotographerById = async (photographerId) => {
    try {
      const photographersData = await getPhotographers();
      const photographer = photographersData.photographers.find((p) => p.id === parseInt(photographerId));
  
      if (!photographer) {
        throw new Error('Photographe non trouvé');
      }
  
      return photographer;
    } catch (error) {
      throw new Error(`Error de récupération des datas par ID: ${error.message}`);
    }
  };