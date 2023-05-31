export const getRandomId = () => {
  return Math.ceil(Math.random() * (200 - 15) + 15)
}

export const getImageUrl = (name: string): string => {
  // temporary solution, couse require not work in vite
  return new URL(`../assets/images/${name}`, import.meta.url).href
}