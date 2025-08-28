const numbers = document.querySelectorAll(".number");
const slots = document.querySelectorAll(".empty");

let dragged = null;

// Drag start
numbers.forEach(num => {
  num.addEventListener("dragstart", e => {
    dragged = num;
    setTimeout(() => (num.style.display = "none"), 0);
  });

  num.addEventListener("dragend", e => {
    dragged.style.display = "flex";
    dragged = null;
  });
});

// Drop into slots
slots.forEach(slot => {
  slot.addEventListener("dragover", e => e.preventDefault());

  slot.addEventListener("drop", e => {
    if (!slot.textContent) {
      slot.textContent = dragged.textContent;
      slot.classList.remove("empty");
      dragged.remove();
      checkWin();
    }
  });
});

// Check win
function checkWin() {
  const slots = document.querySelectorAll("[data-answer]");
  for (let slot of slots) {
    if (slot.textContent !== slot.dataset.answer) {
      return;
    }
  }
  setTimeout(() => alert("🎉 Congratulations! Puzzle Solved!"), 200);
}
