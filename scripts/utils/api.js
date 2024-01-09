const URL_PHOTOGRAPHER = `data/photographers.json`

//on récupère les données de photographers.json
// const getPhotographers = async () => {
//     try {
//         const dataPhotographers = await fetch(`data/photographers.json`);
//         return await dataPhotographers.json();
//         //on affichera dans la console un message d'erreur si le fichier est introuvable
//     } catch (error) {
//         console.error(error, "Fichier JSON introuvable");
//     }
// };

export const getPhotographers = () => fetch(URL_PHOTOGRAPHER).then(res => res.json())