let questions = [
  {
    question : 'Commonly used data types DO NOT include:',
    choices : ['strings', 'booleans', 'alerts', 'numbers'],
    answer : 'alerts'
  },
  {
    question : 'The condition in an if/else statement is closed within -----.',
    choices : ['quotes', 'curly brackets', 'parantheses', 'square brackets'],
    answer: 'parantheses'
  },
  {
    question : 'Arrays in JavaScript can be used to store ------.',
    choices : ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    answer: 'all of the above'
  },
  {
    question : 'String values must be enclosed within ---- when being assigned to variables.',
    choices : ['commas', 'curly brackets', 'quotes', 'parantheses'],
    answer: 'quotes'
  },
  {
    question : 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices : ['JavScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 'console.log'
  }
]
let current = 0, score = 0, time = 60, timer
function end() {
  document.getElementById('question').innerHTML = 'your score: ' + score
  document.getElementById('end-result').innerHTML = '<h1>All done!</h1>'
  document.getElementById('result').innerHTML = ''
  document.getElementById('time').innerHTML = ''
  document.getElementById('scoreSubmission').className = 'text-center'
}

function displayQuestion(){
  document.getElementById('question').innerHTML=''
  let q = document.createElement('div')
  q.innerHTML = `
            <div class="d-grid gap-2 col-6 mx-auto">
              <h2> ${questions[current].question}</h2>
              <button type="button" class="btn btn-primary choice" data-value="${questions[current].choices[0]}">${questions[current].choices[0]}</button>
              <button type="button" class="btn btn-primary choice" data-value="${questions[current].choices[1]}">${questions[current].choices[1]}</button>
              <button type="button" class="btn btn-primary choice" data-value="${questions[current].choices[2]}">${questions[current].choices[2]}</button>
              <button type="button" class="btn btn-primary choice" data-value="${questions[current].choices[3]}">${questions[current].choices[3]}</button>
            </div>
  `
  document.getElementById('question').append(q)
}
document.getElementById('startButton').addEventListener('click', function () {
document.getElementById('strt').remove() 
timer = setInterval(() => {
  time--
  document.getElementById('time').textContent = `Time Left: ${time}`
  if (time < 0) {
    end()
    clearInterval(timer)
  }
}, 1000);

displayQuestion()

})

document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value == questions[current].answer) {
      document.getElementById('result').innerHTML='correct!'
      score++
    }
    else {
      document.getElementById('result').innerHTML = 'wrong!'
      time-=10
    }
    current++
    if (current>= questions.length){
      end ()
      clearInterval(timer)
    }
    else {displayQuestion()}
  }
})

document.getElementById('submitScore').addEventListener('click', function () {
  event.preventDefault()
  let initials = document.getElementById('initials').value
  document.getElementById('scoreSubmission').className = 'hidden'
  let scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)

  let tableElem = document.createElement('table')
  tableElem.className = 'table'
  tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `
  let tableBody = document.createElement('tbody')

  for (let i = 0; i < scores.length; i++) {
    tableBody.innerHTML += `
          <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
          </tr>
        `
  }

  tableElem.append(tableBody)
  document.getElementById('question').append(tableElem)
  let startOver = document.createElement('button')
  startOver.innerHTML='Start Over'
  startOver.className = 'btn btn-outline-success'
  startOver.id = 'startOverButton'
  document.getElementById('question').append(startOver)
  startOver.addEventListener('click', function () {
    location.reload()
  })
})