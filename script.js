document.addEventListener("DOMContentLoaded", function () {
  const spirographContainer = document.getElementById("spirograph-container");
  const planets = [
    { name: "Mercury", color: "gray", radius: 5, orbitRadius: 50, speed: 0.005 },
    { name: "Venus", color: "orange", radius: 10, orbitRadius: 80, speed: 0.003 },
    { name: "Earth", color: "blue", radius: 12, orbitRadius: 120, speed: 0.002 },
    { name: "Mars", color: "red", radius: 8, orbitRadius: 160, speed: 0.0015 },
    { name: "Jupiter", color: "brown", radius: 25, orbitRadius: 220, speed: 0.001 },
    { name: "Saturn", color: "tan", radius: 22, orbitRadius: 280, speed: 0.0008 },
    { name: "Uranus", color: "lightblue", radius: 18, orbitRadius: 340, speed: 0.0006 },
    { name: "Neptune", color: "darkblue", radius: 16, orbitRadius: 400, speed: 0.0005 },
  ];

  let angle = 0;
  let zoomLevel = 1;

  function animate() {
    // Clear the container
    spirographContainer.innerHTML = "";

    // Calculate the container size
    const containerWidth = spirographContainer.offsetWidth;
    const containerHeight = spirographContainer.offsetHeight;

    // Draw circle outlines for planet orbits
    planets.forEach(function (planet) {
      const orbitRadius = planet.orbitRadius * zoomLevel;
      const planetRadius = planet.radius * zoomLevel;
      const orbitX = containerWidth / 2 - orbitRadius;
      const orbitY = containerHeight / 2 - orbitRadius;
    
      const orbitElement = document.createElement("div");
      orbitElement.className = "orbit";
      orbitElement.style.width = orbitRadius * 2 + "px";
      orbitElement.style.height = orbitRadius * 2 + "px";
      orbitElement.style.top = orbitY + "px";
      orbitElement.style.left = orbitX + "px";
    
      spirographContainer.appendChild(orbitElement);
    
      const planetX = orbitX + orbitRadius + Math.cos(angle) * orbitRadius - planetRadius;
      const planetY = orbitY + orbitRadius + Math.sin(angle) * orbitRadius - planetRadius;
    
      const planetElement = document.createElement("div");
      planetElement.className = "planet";
      planetElement.style.backgroundColor = planet.color;
      planetElement.style.width = planetRadius * 2 + "px";
      planetElement.style.height = planetRadius * 2 + "px";
      planetElement.style.top = planetY + "px";
      planetElement.style.left = planetX + "px";
    
      const planetName = document.createElement("div");
      planetName.className = "planet-name";
      planetName.textContent = planet.name;
    
      planetElement.appendChild(planetName);
      spirographContainer.appendChild(planetElement);
    
      angle += planet.speed;
    });

    requestAnimationFrame(animate);
  }

  // Zoom in button
  const zoomInButton = document.getElementById("zoom-in-button");
  zoomInButton.addEventListener("click", function () {
    zoomLevel += 0.1; // Increase zoom level
  });

  // Drag functionality
  let isDragging = false;
  let startPosition = { x: 0, y: 0 };
  let currentTranslate = { x: 0, y: 0 };

  spirographContainer.addEventListener("mousedown", function (event) {
    isDragging = true;
    startPosition.x = event.clientX;
    startPosition.y = event.clientY;
  });

  spirographContainer.addEventListener("mousemove", function (event) {
    if (isDragging) {
      const deltaX = event.clientX - startPosition.x;
      const deltaY = event.clientY - startPosition.y;

      currentTranslate.x += deltaX;
      currentTranslate.y += deltaY;

      spirographContainer.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px)`;

      startPosition.x = event.clientX;
      startPosition.y = event.clientY;
    }
  });

  spirographContainer.addEventListener("mouseup", function () {
    isDragging = false;
  });

  spirographContainer.addEventListener("mouseleave", function () {
    isDragging = false;
  });

  // Start animation
  animate();
});