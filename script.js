function showTime() {
  const timeElement = document.getElementById('yourTimeElementId'); // Apne element ki ID yahan likhein
  
  // Element check add karein
  if (timeElement) {
    timeElement.innerHTML = new Date().toLocaleTimeString();
  }
}

// Function call
showTime();

document.addEventListener("DOMContentLoaded", () => {
  const waBtn = document.getElementById("draggableWhatsApp");
  if (!waBtn) return;

  let isDragging = false;
  let hasDragged = false;
  let startX, startY, initialLeft, initialTop;

  // Drag Start (Mouse & Touch)
  const startDrag = (e) => {
    isDragging = true;
    hasDragged = false;

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;

    const rect = waBtn.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    // Fixed position relative to viewport
    waBtn.style.bottom = "auto";
    waBtn.style.right = "auto";
    waBtn.style.left = `${initialLeft}px`;
    waBtn.style.top = `${initialTop}px`;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  };

  // Dragging Movement
  const onDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Movement threshold to distinguish click vs drag
    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasDragged = true;
    }

    if (hasDragged) {
      if (e.cancelable) e.preventDefault(); // Prevent page scroll on touch

      // Screen boundary limits
      const newLeft = Math.min(Math.max(10, initialLeft + deltaX), window.innerWidth - waBtn.offsetWidth - 10);
      const newTop = Math.min(Math.max(10, initialTop + deltaY), window.innerHeight - waBtn.offsetHeight - 10);

      waBtn.style.left = `${newLeft}px`;
      waBtn.style.top = `${newTop}px`;
    }
  };

  // Stop Dragging
  const stopDrag = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  };

  // Prevent link trigger when dragging
  waBtn.addEventListener("click", (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Attach Event Listeners
  waBtn.addEventListener("mousedown", startDrag);
  waBtn.addEventListener("touchstart", startDrag, { passive: true });
});