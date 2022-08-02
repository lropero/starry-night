const debounce = (fn, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), timeout)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const city = document.getElementById('city')
  const dot = document.getElementById('dot')
  const sky = document.getElementById('sky')

  let buildings
  let dimensions
  let highest

  const gauss = number => {
    return (number * (number + 1)) / 2
  }

  const newBuilding = () => {
    const building = document.createElement('div')
    const height = Math.round(Math.floor(Math.random() * (dimensions.city.height - dimensions.city.height / 8 + 1)) + dimensions.city.height / 8)
    const width = Math.round(Math.floor(Math.random() * (dimensions.city.height / 4 + 1)) + dimensions.city.height / 4)
    const left = Math.round(Math.floor(Math.random() * dimensions.city.width) - width / 2)
    const windowFrame = Math.floor(Math.random() * 3) + 3
    const windowSize = Math.random() * 3 > 1 ? 2 : 1
    building.classList.add('building')
    building.style.height = `${height}px`
    building.style.left = `${left}px`
    building.style.width = `${width}px`
    for (let i = 0; i < Math.floor(height / (windowFrame * 2 + windowSize)); i++) {
      const floor = newFloor(width, windowFrame, windowSize)
      building.appendChild(floor)
    }
    city.appendChild(building)
    if (!highest || height > highest.height) {
      highest = { building, height, left, width }
    }
    return building
  }

  const newFloor = function makeWindows (width, windowFrame, windowSize) {
    const floor = document.createElement('div')
    floor.className = 'floor'
    floor.style.height = `${windowFrame * 2 + windowSize}px`
    for (let i = 0; i < Math.floor(width / (windowFrame * 2 + windowSize)); i++) {
      const color = ['#999900', '#999966', '#cccc00', '#cccc66', '#eeee00', '#eeee66'][Math.floor(Math.random() * 6)]
      const window = document.createElement('div')
      window.className = 'window'
      if (windowSize === 1) {
        window.style.backgroundColor = color
      } else {
        window.style.backgroundColor = Math.random() * 4 > 1 ? color : 'black'
        window.style.boxShadow = `1px 0 ${Math.random() * 4 > 1 ? color : 'black'}, 0 1px ${Math.random() * 4 > 1 ? color : 'black'}, 1px 1px ${Math.random() * 4 > 1 ? color : 'black'}`
      }
      window.style.margin = `${windowFrame}px`
      floor.appendChild(window)
    }
    return floor
  }

  const newStar = () => {
    const star = document.createElement('div')
    star.classList.add('star')
    star.style.backgroundColor = ['#666666', '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee', '#ffffff'][Math.floor(Math.random() * 10)]
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

  const reset = () => {
    if (Array.isArray(buildings) && buildings.length > 0) {
      buildings.forEach(building => city.removeChild(building))
      highest = { height: 0 }
    }
    buildings = []
    dimensions = { sky: sky.getBoundingClientRect() }
    city.style.height = `${Math.round(Math.floor(Math.random() * (dimensions.sky.height / 2 - dimensions.sky.height / 5 + 1)) + dimensions.sky.height / 5)}px`
    dimensions.city = city.getBoundingClientRect()
    for (let i = 0; i < Math.round(dimensions.city.width / (Math.floor(Math.random() * 13) + 8)); i++) {
      buildings.push(newBuilding())
    }
    dot.style.bottom = `${highest.height + 3}px`
    dot.style.left = `${Math.round(highest.left + highest.width / 2 - 4)}px`
  }

  const switchDot = () => {
    dot.classList.toggle('on')
  }

  const switchWindow = () => {
    const windows = document.querySelectorAll('.window')
    const windowsOn = document.querySelectorAll('.window.on')
    let randomWindow = windows[Math.floor(Math.random() * windows.length)]
    if (windowsOn.length / windows.length < 0.7) {
      while (randomWindow.classList.contains('on')) {
        randomWindow = windows[Math.floor(Math.random() * windows.length)]
      }
    } else {
      while (!randomWindow.classList.contains('on')) {
        randomWindow = windows[Math.floor(Math.random() * windows.length)]
      }
    }
    randomWindow.classList.toggle('on')
  }

  reset()
  setInterval(newStar, 10)
  setInterval(switchDot, 1500)
  setInterval(switchWindow, 5)
  window.addEventListener('resize', debounce(reset))
})
