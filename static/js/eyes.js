document.addEventListener('mousemove', (e) => {
  const eyesList = document.querySelectorAll('.tee__eyes');
  if (!eyesList.length) return;

  eyesList.forEach((eyes) => {
    const rect = eyes.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = e.clientX - centerX;
    let dy = e.clientY - centerY;

    const maxRadius = 12; // Ограничиваем амплитуду движения глаз

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxRadius) {
      const scale = maxRadius / distance;
      dx *= scale;
      dy *= scale;
    }

    eyes.style.transform = `translate(${dx}px, ${dy}px)`;
  });
});
