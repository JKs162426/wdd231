const today = new Date();

let lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  let previousDate = new Date(lastVisit);
  let timeDiff = today.getTime() - previousDate.getTime();
  let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  document.querySelector("#visit-message").textContent =
    `Welcome back! It's been ${daysDiff} day(s) since your last visit.`;
} else {
  document.querySelector("#visit-message").textContent =
    "Welcome! This is your first visit.";
}

localStorage.setItem("lastVisit", today.toString());
