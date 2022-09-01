(function () {
  document.addEventListener('DOMContentLoaded', function () {



    const btnStart = document.querySelector('#start')
    const screens = document.querySelectorAll('.screen')
    const timeList = document.querySelector('#time-list')
    let time = 0
    const elTime = document.querySelector('#time')
    const board = document.querySelector('#board')
    let score = 0 
    const COLORS = [
      '#8CBEB2',
      '#F2EBBF',
      '#F3B562',
      '#F06060',
    ]

    btnStart.addEventListener('click', (e) => {
      e.preventDefault()
      screens[0].classList.add('--up')
    })

    timeList.addEventListener('click', (e) => {
      if (e.target.classList.contains('time-btn')) {
        time = Number(e.target.getAttribute('data-time'))
        startGame()
      }
    })

    board.addEventListener('click', (e)=>{
      if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createCircleRandom()
      }
    })

    function startGame() {
      screens[1].classList.add('--up')
      setTime(time)
      createCircleRandom()
      setInterval(decreaseTime, 1000)
    }

    function decreaseTime() {
      if (time === 0) {
        finishGame()
      }
      else {
        let curTime = --time
        if (curTime < 10) {
          curTime = `0${curTime}`
        }
        setTime(curTime)
      }
    }

    function setTime(curTime) {
      elTime.innerHTML = curTime + ' сек'
    }

    function finishGame() {
      board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
      elTime.parentNode.classList.add('--hide')
    }

    function createCircleRandom() {
      const elCircle = document.createElement('span')
      const size = getRandomNumber(10, 30)
      const color = COLORS[getRandomNumber(0, COLORS.length-1)]

      const { width, height } = board.getBoundingClientRect()

      const x = getRandomNumber(0, width - size)
      const y = getRandomNumber(0, height - size)
      // const x = getRandomNumber(0, 100)//%
      // const y = getRandomNumber(0, 100)//%

      elCircle.classList.add('circle')

      elCircle.style.width = size + 'px'
      elCircle.style.height = size + 'px'

      elCircle.style.left = `${x}px`
      elCircle.style.top = `${y}px`

      elCircle.style.backgroundColor = color
      // elCircle.style.left = `calc(${x}% - ${size}px)`
      // elCircle.style.top = `calc(${y}% - ${size}px)`

      board.append(elCircle)
    }

    function getRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min)
    }



  })
})()