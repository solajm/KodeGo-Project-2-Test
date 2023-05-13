document.addEventListener("DOMContentLoaded", function () {
  const spirographContainer = document.getElementById("spirograph-container");
  const planets = [
    { name: "Sun", color: "yellow", radius: 15, orbitRadius: 0, speed: 0 },
    { name: "Mercury", color: "gray", radius: 5, orbitRadius: 50, speed: 5 },
    { name: "Venus", color: "orange", radius: 10, orbitRadius: 80, speed: 3 },
    { name: "Earth", color: "blue", radius: 12, orbitRadius: 120, speed: 2 },
    { name: "Mars", color: "red", radius: 8, orbitRadius: 160, speed: 1.5 },
    { name: "Jupiter", color: "brown", radius: 25, orbitRadius: 220, speed: 1 },
    { name: "Saturn", color: "tan", radius: 22, orbitRadius: 280, speed: 0.8 },
    { name: "Uranus", color: "lightblue", radius: 18, orbitRadius: 340, speed: 0.6 },
    { name: "Neptune", color: "darkblue", radius: 16, orbitRadius: 400, speed: 0.5 },
  ];

  let angle = 0;
  let zoomLevel = 1;

  // Zoom in button
  const zoomInButton = document.getElementById("zoom-in-button");
  zoomInButton.addEventListener("click", function () {
    zoomLevel += 0.1; // Increase zoom level
  });

  // Zoom out button
  const zoomOutButton = document.getElementById("zoom-out-button");
  zoomOutButton.addEventListener("click", function () {
    zoomLevel -= 0.1; // Decrease zoom level
    if (zoomLevel < 0.1) {
      zoomLevel = 0.1; // Set minimum zoom level
    }
  });

  function animate() {
    // Clear the container
    spirographContainer.innerHTML = "";

    // Calculate the container size
    const containerWidth = spirographContainer.offsetWidth;
    const containerHeight = spirographContainer.offsetHeight;

    // Add the sun
    const sunElement = document.createElement("div");
    sunElement.className = "sun";
    spirographContainer.appendChild(sunElement);

    // Draw planets
planets.forEach(function (planet, index) {
  const orbitRadius = planet.orbitRadius * zoomLevel;
  const planetRadius = planet.radius * zoomLevel;

  const planetX =
    containerWidth / 2 +
    Math.cos(angle * planet.speed) * (orbitRadius + planet.orbitRadius * zoomLevel) -
    planetRadius;
  const planetY =
    containerHeight / 2 +
    Math.sin(angle * planet.speed) * (orbitRadius + planet.orbitRadius * zoomLevel) -
    planetRadius;

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
  planetName.style.fontSize = planetRadius / 4 + "px"; // Adjust the font size relative to the planet's size
  planetName.style.top = planetRadius * 2 + "px"; // Position the label below the planet

  planetElement.appendChild(planetName);
  spirographContainer.appendChild(planetElement);
});

    angle += 0.01; // Increase the angle for smoother animation

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
});