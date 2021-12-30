/*global activatePart, refresh, fireworks, override, startFireworks*/

document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    refresh();
  } else if (!isNaN(parseInt(e.key, 10))) {
    activatePart(parseInt(e.key, 10));
    override = true;
  } else if (e.key === "f") {
    fireworks = !fireworks;
    if (fireworks) {
      startFireworks();
    }
  }
});
