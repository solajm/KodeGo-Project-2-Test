document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasSize();

  // Sun properties
  const sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 40,
    color: "#FFD700"
  };

  // Planet properties
  const planets = [
    { name: "Mercury", radius: 10, orbitRadius: 0.2 * canvas.width, orbitSpeed: 0.001, color: "#BEBEBE" },
    { name: "Venus", radius: 20, orbitRadius: 0.3 * canvas.width, orbitSpeed: 0.0008, color: "#FFA500" },
    { name: "Earth", radius: 25, orbitRadius: 0.4 * canvas.width, orbitSpeed: 0.0005, color: "#6495ED" },
    { name: "Mars", radius: 18, orbitRadius: 0.5 * canvas.width, orbitSpeed: 0.0004, color: "#FF4500" },
    { name: "Jupiter", radius: 50, orbitRadius: 0.7 * canvas.width, orbitSpeed: 0.0002, color: "#CD853F" },
    { name: "Saturn", radius: 45, orbitRadius: 0.9 * canvas.width, orbitSpeed: 0.0001, color: "#D2B48C" },
    { name: "Uranus", radius: 35, orbitRadius: 1.1 * canvas.width, orbitSpeed: 0.00008, color: "#00BFFF" },
    { name: "Neptune", radius: 30, orbitRadius: 1.3 * canvas.width, orbitSpeed: 0.00005, color: "#00008B" },
  ];

  let zoomLevel = 1; // Initial zoom level
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom transformation
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(zoomLevel, zoomLevel);
    context.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw background circle for each planet
    planets.forEach(function(planet) {
      context.beginPath();
      context.arc(sun.x, sun.y, planet.orbitRadius, 0, Math.PI * 2, false);
      context.strokeStyle = "#888888";
      context.lineWidth = 1 / zoomLevel;
      context.stroke();
      context.closePath();
    });

    // Draw sun
    context.beginPath();
    context.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2, false);
    context.fillStyle = sun.color;
    context.fill();
    context.closePath();

    // Draw planets
    planets.forEach(function(planet) {
      const angle = Date.now() * planet.orbitSpeed;
      const planetX = sun.x + Math.cos(angle) * planet.orbitRadius;
      const planetY = sun.y + Math.sin(angle) * planet.orbitRadius;

      context.beginPath();
      context.arc(planetX, planetY, planet.radius, 0, Math.PI * 2, false);
      context.fillStyle = planet.color;
      context.fill();
      context.closePath();

      // Draw planet name
      context.font = "12px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(planet.name, planetX, planetY + planet.radius + 15);
    });

    context.restore(); // Restore canvas transformation
  }

  // Zoom in button
  const zoomInButton = document.getElementById("zoom-in-button");
  zoomInButton.addEventListener("click", function() {
    zoomLevel += 0.1; // Increase zoom level
  });

  // Zoom out button
  const zoomOutButton = document.getElementById("zoom-out-button");
  zoomOutButton.addEventListener("click", function() {
    zoomLevel -= 0.1; // Decrease zoom level
    if (zoomLevel < 0.1) {
      zoomLevel = 0.1; // Set minimum zoom level
    }
  });

   // Mouse event listeners for dragging
   canvas.addEventListener("mousedown", function(event) {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
  });

  canvas.addEventListener("mousemove", function(event) {
    if (isDragging) {
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      sun.x += deltaX;
      sun.y += deltaY;
    }
  });

  canvas.addEventListener("mouseup", function() {
    isDragging = false;
  });

  canvas.addEventListener("mouseleave", function() {
    isDragging = false;
  });


  // Resize event
  window.addEventListener("resize", function() {
    setCanvasSize();
  });

  // Start animation
  animate();
});