// fonction de tri, qu'on appellera dans displaySortedMedia
export const sortMedia = (mediaArray, sortBy) => {
  switch (sortBy) {
  case 'popularity':
    return mediaArray.sort((a, b) => b.likes - a.likes)
  case 'date':
    return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date))
  case 'price':
    return mediaArray.sort((a, b) => a.price - b.price)
  default:
    return mediaArray
  }
}
