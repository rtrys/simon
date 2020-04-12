const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generateSequence()
    setTimeout(this.nextLevel, 500)
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.chooseColor = this.chooseColor.bind(this)
    this.togglebtnStart()
    this.level = 1
    this.colors = {
      blue,
      violet,
      orange,
      green
    }
  }

  togglebtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel() {
    this.subLevel = 0
    this.startSequence()
    this.addEventClick()
  }

  getColorFromNumber(number) {
    switch (number) {
      case 0:
        return 'blue'
      case 1:
        return 'violet'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }

  getNumberFromColor(color) {
    switch (color) {
      case 'blue':
        return 0
      case 'violet':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  startSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.getColorFromNumber(this.sequence[i])
      setTimeout(() => this.turnOnColor(color), 1000 * i)
    }
  }

  turnOnColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light')
  }

  addEventClick() {
    this.colors.blue.addEventListener('click', this.chooseColor)
    this.colors.green.addEventListener('click', this.chooseColor)
    this.colors.violet.addEventListener('click', this.chooseColor)
    this.colors.orange.addEventListener('click', this.chooseColor)
  }

  removeEventClick() {
    this.colors.blue.removeEventListener('click', this.chooseColor)
    this.colors.green.removeEventListener('click', this.chooseColor)
    this.colors.violet.removeEventListener('click', this.chooseColor)
    this.colors.orange.removeEventListener('click', this.chooseColor)
  }

  chooseColor(ev) {
    const colorName = ev.target.dataset.color
    const colorNumber = this.getNumberFromColor(colorName)
    this.turnOnColor(colorName)
    if (colorNumber === this.sequence[this.subLevel]) {
      this.subLevel++
      if (this.subLevel === this.level) {
        this.level++
        this.removeEventClick()
        if (this.level === (LAST_LEVEL + 1)) {
          this.winGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      }
    } else {
      this.lostGame()
    }
  }

  winGame() {
    swal('Platzi', 'Congrats, you won the game!', 'success')
      .then(this.initialize)
  }

  lostGame() {
    swal('Platzi', 'We are sorry, you lose :(', 'error')
      .then(() => {
        this.removeEventClick()
        this.initialize()
      })
  }
}

function startGame() {
  window.game = new Game()
}
