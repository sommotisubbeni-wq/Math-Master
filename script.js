let levels = [];
let currentLevel = 0;
let dragged = null;

// Load levels.json
fetch("levels.json")
  .then(res => res.json())
  .then(data => {
    levels = data;
    loadLevel(0);
  });

// Load a level
function loadLevel(index) {
  currentLevel = index;
  const level = levels[index];
  document.getElementById("level-title").textContent = level.title;

  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";

  // Make grid
  level.grid.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement("div");
      div.classList.add("cell");
      if (cell === null) {
        div.classList.add("empty");
        div.dataset.answer = level.answers.shift();
      } else {
        div.textContent = cell;
      }
      puzzle.appendChild(div);
    });
  });

  // Numbers pool
  const numbersDiv = document.getElementById("numbers");
  numbersDiv.innerHTML = "";
  level.pool.forEach(num => {
    const div = document.createElement("div");
    div.classList.add("number");
    div.textContent = num;
    div.setAttribute("draggable", "true");
    numbersDiv.appendChild(div);
  });

  setupDragAndDrop();
}

// Drag & Drop
function setupDragAndDrop() {
  const numbers = document.querySelectorAll(".number");
  const slots = document.querySelectorAll(".empty");

  numbers.forEach(num => {
    num.addEventListener("dragstart", () => {
      dragged = num;
      setTimeout(() => (num.style.display = "none"), 0);
    });
    num.addEventListener("dragend", () => {
      dragged.style.display = "flex";
      dragged = null;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", () => {
      if (!slot.textContent) {
        slot.textContent = dragged.textContent;
        slot.classList.remove("empty");
        dragged.remove();
        checkWin();
      }
    });
  });
}

// Check win
function checkWin() {
  const slots = document.querySelectorAll("[data-answer]");
  for (let slot of slots) {
    if (slot.textContent !== slot.dataset.answer) {
      return;
    }
  }
  setTimeout(() => alert("🎉 Level Complete!"), 200);
}

// Navigation
function nextLevel() {
  if (currentLevel < levels.length - 1) {
    loadLevel(currentLevel + 1);
  } else {
    alert("🎉 You finished all 30 levels!");
  }
}
function prevLevel() {
  if (currentLevel > 0) {
    loadLevel(currentLevel - 1);
  }
  }
  
