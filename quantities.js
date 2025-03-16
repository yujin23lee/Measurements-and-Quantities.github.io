const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const weightDisplay = document.getElementById("weight-display");
const resetButton = document.getElementById("reset-btn");


const canvasWidth = 1000;
const canvasHeight = 600;


const maxWeight = 7.9; // Maximum weight in kg
let currentWeight = 0; // Current weight in kg


// Initialize canvas size
canvas.width = canvasWidth;
canvas.height = canvasHeight;


// Weight-related parameters
const dropWeight = 0.1; // Each ink drop adds 0.05kg
const maxWeightDrops = maxWeight / dropWeight; // Total drops to reach 8kg


// Function to generate realistic ink drop with varied size and characteristics
function generateInkDrop(x, y) {
 // Randomly vary the radius, opacity, and shadow for each drop
 const dropRadius = Math.random() * 40 + 10; // Random radius between 10 and 40 pixels
 const shadowBlur = Math.random() * 20 + 5; // Random shadow blur effect
 const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1


 // Create a radial gradient to make the drop look more realistic
 const gradient = ctx.createRadialGradient(x, y, 0, x, y, dropRadius);
 gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`); // Dark center (opaque)
 gradient.addColorStop(0.7, `rgba(0, 0, 0, ${opacity * 0.5})`); // Lighter middle
 gradient.addColorStop(1, `rgba(0, 0, 0, ${opacity * 0.2})`); // Very light edge


 // Set up drop's visual style
 ctx.beginPath();
 ctx.arc(x, y, dropRadius, 0, Math.PI * 2, false); // Draw a circular shape for the drop
 ctx.fillStyle = gradient; // Apply the gradient for ink effect
 ctx.shadowBlur = shadowBlur; // Apply random shadow blur for realism
 ctx.shadowColor = "rgba(0, 0, 0, 0.2)"; // Shadow color to make the drop feel like it's landing
 ctx.fill();


 // Add weight based on the drop size
 currentWeight += dropWeight;


 // Update the weight display
 weightDisplay.innerText = `${currentWeight.toFixed(3)}kg`;


 // Update the progress bar based on the current weight
 const progress = (currentWeight / maxWeight) * 100;
 progressBar.style.width = `${progress}%`;


 // If weight reaches exactly 8kg, trigger completion action
 if (currentWeight >= maxWeight) {
   completeDrawing();
 }
}


// Handle click event to drop ink at the mouse position
canvas.addEventListener("click", (event) => {
 if (currentWeight >= maxWeight) return; // Prevent adding more drops after reaching max weight


 const x = event.offsetX;
 const y = event.offsetY;


 generateInkDrop(x, y); // Create ink drop at the clicked position
});


// Handle reset action
resetButton.addEventListener("click", resetDrawing);


// Function to complete the drawing once 8kg is reached
function completeDrawing() {
 // Lock the drawing and change the background color
 canvas.style.backgroundColor = "#e0f7e0"; // Greenish background to indicate completion
 resetButton.disabled = false; // Allow reset
}


// Reset the canvas and weight
function resetDrawing() {
 currentWeight = 0;
 ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
 weightDisplay.innerText = "0kg";
 progressBar.style.width = "0%";
 canvas.style.backgroundColor = "#fff"; // Reset background color
 resetButton.disabled = true; // Disable reset until 8kg is reached
}



