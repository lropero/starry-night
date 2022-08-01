document.addEventListener('DOMContentLoaded', () => {
  const city = document.getElementById('city')
  const sky = document.getElementById('sky')

  const dimensions = { sky: sky.getBoundingClientRect() }
  city.style.height = `${Math.floor(Math.random() * (dimensions.sky.height / 2 - dimensions.sky.height / 5 + 1) + dimensions.sky.height / 5)}px`
  dimensions.city = city.getBoundingClientRect()

  const gauss = number => {
    return (number * (number + 1)) / 2
  }

  const newBuilding = () => {
    const building = document.createElement('div')
    building.classList.add('building')
    building.style.height = `${Math.floor(Math.random() * dimensions.city.height) + 1}px`
    building.style.left = `${Math.floor(Math.random() * dimensions.city.width) - 50}px`
    building.style.width = `${Math.floor(Math.random() * (dimensions.city.width / 10 - dimensions.sky.height / 20 + 1) + dimensions.sky.height / 20)}px`
    city.appendChild(building)
  }

  const newStar = () => {
    const star = document.createElement('div')
    star.classList.add('star')
    star.style.left = `${Math.floor(Math.random() * dimensions.sky.width)}px`
    let guess = Math.floor(Math.random() * gauss(dimensions.sky.height)) + 1
    let i = 0
    while (guess > 0) {
      guess -= ++i
    }
    star.style.top = `${dimensions.sky.height - i}px`
    sky.appendChild(star)
    setTimeout(() => sky.removeChild(star), Math.floor(Math.random() * dimensions.sky.height * dimensions.sky.width) + 60000)
  }

  for (let i = 0; i < Math.round(dimensions.city.width / (Math.floor(Math.random() * 11) + 8)); i++) {
    newBuilding()
  }

  setInterval(newStar, 25)
})
