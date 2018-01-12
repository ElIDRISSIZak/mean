/*var lastSelection;
var p = 0;
var canvasPoints = [];

function listenToClick() {
  var rows = document.querySelectorAll('.row'),
    row;
  var cols, col;

  for (row = 0; row < rows.length; row++) {
    cols = rows[row].children;

    for (col = 0; col < cols.length; col++) {
      cols[col].addEventListener('click', selectAnswer.bind({
        row: row,
        col: col,
        element: cols[col]
      }));
    }
  }
}
var question = null;
var answer = null;

// This is fired when a answer-container is clicked.
function selectAnswer(event) {

  if (this.element.classList.contains("answer")) {
    answer = this.element;
  } else if (this.element.classList.contains("question")) {
    question = this.element;
    answer = null;
  }
  if (question && answer) {
    if (!removeObjects()) {
      var points = {};
      points.answer = getPoint(answer);
      points.question = getPoint(question);
      canvasPoints.push(points);
    }
  } else if (answer) {
    console.log("Please select Left option");
  }
  resizeCanvas();
}

function getPoint(answerElement) {
  var roundPointer = answerElement.lastElementChild;
  return {
    y: answerElement.offsetTop + roundPointer.offsetTop + roundPointer.offsetHeight / 2,
    x: answerElement.offsetLeft + roundPointer.offsetLeft + roundPointer.offsetWidth / 2,
    text: answerElement.innerText
  };
}

function drawLine(p1, p2) {
  var canvas = document.getElementById("connection-canvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function resizeCanvas() {
  var canvas = document.getElementById("connection-canvas");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  for (var i = 0; i < canvasPoints.length; i++) {
    drawLine(canvasPoints[i].answer, canvasPoints[i].question);
  }
  output();
}

function removeObjects() {

  var answerPoints = getPoint(answer);
  var questionPoints = getPoint(question);
  for (var i = 0; i < canvasPoints.length; i++) {

    if (canvasPoints[i].answer.x == answerPoints.x && canvasPoints[i].answer.y == answerPoints.y && canvasPoints[i].question.x == questionPoints.x && canvasPoints[i].question.y == questionPoints.y) {
      canvasPoints.splice(i, 1);
      return true;
    }
  }
  return false;
}
listenToClick();
resizeCanvas();

function output() {
  var outputObject = [];
  for (var i = 0; i < canvasPoints.length; i++) {
    var obj = {
      "left": canvasPoints[i].question.text,
      right: []
    };
    for (var j = 0; j < outputObject.length; j++) {
      if (outputObject[j].left == canvasPoints[i].question.text) {
        obj = outputObject[j];
        outputObject.splice(j, 1);
      }
    }
    obj.right.push(canvasPoints[i].answer.text)
    outputObject.push(obj);
  }
  console.log(outputObject);
}*/


