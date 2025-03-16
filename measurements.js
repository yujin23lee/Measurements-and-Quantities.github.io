const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const distanceDisplay = document.getElementById("distance");
const resetButton = document.getElementById("resetButton");

function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

resizeCanvas();

let drawing = false;
let lastX = null;
let lastY = null;
let totalDistance = 0;
const maxDistance = 4000; // 4km

function getDistance(x1, y1, x2, y2) {
   return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function startDrawing(e) {
   if (totalDistance >= maxDistance) return;
   drawing = true;
   lastX = e.clientX;
   lastY = e.clientY;
}

function draw(e) {
   if (!drawing || totalDistance >= maxDistance) return;
   const x = e.clientX;
   const y = e.clientY;

   if (lastX !== null && lastY !== null) {
       const distance = getDistance(lastX, lastY, x, y);
       totalDistance += distance;

       if (totalDistance >= maxDistance) {
           totalDistance = maxDistance;
           distanceDisplay.textContent = `${totalDistance.toFixed(2)}m`;
           drawing = false;
           return;
       }

       ctx.beginPath();
       ctx.moveTo(lastX, lastY);
       ctx.lineTo(x, y);
       ctx.strokeStyle = "black";
       ctx.lineWidth = 2;
       ctx.stroke();
   }
   lastX = x;
   lastY = y;
   distanceDisplay.textContent = `${totalDistance.toFixed(2)}m`;
}

function stopDrawing() {
   drawing = false;
}

function resetCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   totalDistance = 0;
   distanceDisplay.textContent = "0m";
   lastX = null;
   lastY = null;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
window.addEventListener("resize", resizeCanvas);
resetButton.addEventListener("click", resetCanvas);
