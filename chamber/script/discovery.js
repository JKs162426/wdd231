const cardGrid = document.getElementById('cardGrid');

async function loadPlaces() {
  try {
    const response = await fetch('./data/places.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    data.places.forEach(place => {
      const card = document.createElement('section');
      card.classList.add('card');

      card.innerHTML = `
        <h2>${place.name}</h2>
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="button"><a href="${place.link}">Learn More</a></button>
      `;
      cardGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading the JSON:', error);
  }
}

loadPlaces();