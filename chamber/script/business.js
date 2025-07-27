const businessCards = document.querySelector('.business-cards');

async function loadBusinessCards() {
  try {
    const response = await fetch('data/business.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    businessCards.innerHTML = '';
    displaySpotlights(data.businesses);

    function displaySpotlights(data) {
      const filtered = data.filter(business =>
        business.membership === 'Gold' || business.membership === 'Silver'
      );

      const shuffled = filtered.sort(() => Math.random() - 0.5);

      const count = Math.floor(Math.random() * 2) + 2;
      const selected = shuffled.slice(0, count);

      selected.forEach(business => {
        const article = document.createElement('article');
        article.classList.add('business');
        article.innerHTML = `
          <h3>${business.name}</h3>
          <img src="${business.image}" alt="${business.name}" loading="lazy">
          <p>Membership: ${business.membership}</p>
          <p>Address: ${business.address}</p>
          <p>Phone: ${business.phone}</p>
          <p>Email: <a href="mailto:${business.email}">${business.email}</a></p>
          <a href="${business.website}" target="_blank">Visit website</a>
        `;
        businessCards.appendChild(article);
      });
    }
  } catch (error) {
        console.error('Error loading the JSON:', error);
    }
}

loadBusinessCards();