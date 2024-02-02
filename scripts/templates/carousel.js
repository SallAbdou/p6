export { openCarousel, closeCarousel };

let currentIndex = 0;
let mediaItems = [];

const openCarousel = () => {
    // Affiche le carrousel et initialise les médias
    currentIndex = 0;
    mediaItems = document.querySelectorAll('#medias article');
    updateCarousel();

    // Ajoute un événement pour fermer le carrousel
    document.addEventListener('keydown', keyPress);
};

const closeCarousel = () => {
    document.removeEventListener('keydown', keyPress);
};

// Gère les touches de navigation du carrousel
const keyPress = (event) => {
    if (event.key === 'ArrowLeft') {
        navigateCarousel('prev');
        console.log("testleft"); //test console
   
    } else if (event.key === 'ArrowRight') {
        navigateCarousel('next'); 
        console.log("testright");//test console
  
    } else if (event.key === 'Escape') {
        closeCarousel();
    }
};

// Navigue dans le carrousel 
const navigateCarousel = (direction) => {
    if (direction === 'prev' && currentIndex > 0) {
        currentIndex -= 1;
    } else if (direction === 'next' && currentIndex < mediaItems.length - 1) {
        currentIndex += 1;
    }

    updateCarousel();
};

// Met à jour l'affichage du carrousel en fonction de l'index
const updateCarousel = () => {
    mediaItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

