document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []
  let score = 0

  // create board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  //generate a random number

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2
      checkForGameOver()
    } else generate()
  }

  // when we swipe right

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ]

        let filteredRow = row.filter((num) => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }

  // when we swipe left

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ]

        let filteredRow = row.filter((num) => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }

  // when we swipe down

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + width * 2].innerHTML
      let totalFour = squares[i + width * 3].innerHTML
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ]

      let filteredColumn = column.filter((num) => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + width * 2].innerHTML = newColumn[2]
      squares[i + width * 3].innerHTML = newColumn[3]
    }
  }
  // when we swipe up

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + width * 2].innerHTML
      let totalFour = squares[i + width * 3].innerHTML
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ]

      let filteredColumn = column.filter((num) => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + width * 2].innerHTML = newColumn[2]
      squares[i + width * 3].innerHTML = newColumn[3]
    }
  }

  // combining rows

  // const numbers = [2, 4];
  // squares[randomNumber].innerHTML = numbers[Math.floor(Math.random() * numbers.length)]

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + 1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
        addColors()
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
        squares[i + width].innerHTML = combinedTotal
        squares[i].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
        addColors()
      }
    }
    checkForWin()
  }

  // assign keycodes

  function control(e) {
    if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }

  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
    addColors()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
    addColors()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  // check for a win

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You win!'
        document.removeEventListener('keyUp', control)
      }
    }
  }

  // check for a full board / no zeros

  function checkForGameOver() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros == 0) {
      resultDisplay.innerHTML = 'You loose!'
      document.removeEventListener('keyUp', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

  function addColors() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#DCFFFF'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#9FFDF7'
      else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#00CCBE'
      else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#457E80'
      else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#008080'
      else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#41CCCC'
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#F62677'
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#751238'
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#F72575'
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#75354E'
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#C21D5C'
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#f9d240'
    }
  }
  addColors()

  var myTimer = setInterval(addColours, 50)
})
