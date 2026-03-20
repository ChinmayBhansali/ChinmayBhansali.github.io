/* ============================================
   HCI Portfolio — Hero Empathy Ripple Effect
   ============================================ */

(function() {
  const canvas = document.getElementById('rippleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let ripples = [];
  let animationId;

  function resize() {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createRipple(x, y) {
    ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(canvas.width, canvas.height) * 0.4,
      opacity: 0.35,
      lineWidth: 2,
      speed: 3
    });

    // Create secondary smaller ripple with delay
    setTimeout(() => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.25,
        opacity: 0.2,
        lineWidth: 1.5,
        speed: 2
      });
    }, 150);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripples = ripples.filter(ripple => {
      ripple.radius += ripple.speed;
      const progress = ripple.radius / ripple.maxRadius;
      const currentOpacity = ripple.opacity * (1 - progress);

      if (currentOpacity <= 0.005) return false;

      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(209, 122, 99, ${currentOpacity})`;
      ctx.lineWidth = ripple.lineWidth * (1 - progress * 0.5);
      ctx.stroke();

      return true;
    });

    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  const hero = document.getElementById('hero');
  
  hero.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    createRipple(e.clientX - rect.left, e.clientY - rect.top);
  });

  // Gentle ambient ripples on mouse move (throttled)
  let lastMoveTime = 0;
  hero.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime < 800) return; // throttle to every 800ms
    lastMoveTime = now;
    
    const rect = canvas.getBoundingClientRect();
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 120,
      opacity: 0.12,
      lineWidth: 1,
      speed: 1.5
    });
  });

  // Initial ambient ripple
  setTimeout(() => {
    createRipple(canvas.width * 0.5, canvas.height * 0.5);
  }, 1000);

  // Setup
  resize();
  animate();
  window.addEventListener('resize', resize);
})();
