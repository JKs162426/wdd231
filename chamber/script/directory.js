const today = new Date;
const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = document.lastModified;


const membersContainer = document.querySelector('.directory');

async function loadMembers() {
  try {
    const response = await fetch('./data/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    data.forEach(member => {
      const article = document.createElement('article');
      article.classList.add('member');
      article.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <h2>${member.name}</h2>
        <p>${member.role}</p>
      `;
      membersContainer.appendChild(article);
    });
  } catch (error) {
    console.error('Error loading the JSON:', error);
  }
}

loadMembers();


const hamButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const gridBtn = document.querySelector('.gridView');
const listBtn = document.querySelector('.listView');
const directory = document.querySelector('.directory');

gridBtn.addEventListener('click', () => {
  directory.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list-view');
});