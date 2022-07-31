document.addEventListener('DOMContentLoaded', () => {
  const city = document.getElementById('city')
  const sky = document.getElementById('sky')

  const dimensions = { sky: sky.getBoundingClientRect() }
  city.style.height = `${Math.floor(Math.random() * (dimensions.sky.height / 2 - dimensions.sky.height / 5 + 1) + dimensions.sky.height / 5)}px`
  dimensions.city = city.getBoundingClientRect()

  const gauss = number => {
    return (number * (number + 1)) / 2
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

  setInterval(newStar, 25)
})
