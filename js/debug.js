document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    refresh();
  } else if (!isNaN(parseInt(e.key))) {
    activatePart(parseInt(e.key));
    override = true;
  } else if (e.key === "f") {
    fireworks = !fireworks;
    if (fireworks) {
      startFireworks();
    }
  }
});
