const weddingDate = new Date("2027-01-16T11:00:00+07:00");

const countdownElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const countdownNote = document.querySelector("#countdown-note");

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();

  if (remaining <= 0) {
    Object.values(countdownElements).forEach((element) => {
      element.textContent = "00";
    });
    countdownNote.textContent = "Hôm nay là ngày chúng mình về chung một nhà!";
    return;
  }

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  countdownElements.days.textContent = String(days).padStart(2, "0");
  countdownElements.hours.textContent = String(hours).padStart(2, "0");
  countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
  countdownElements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1_000);

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu");
    mainNav.classList.remove("is-open");
  }
});

const rsvpForm = document.querySelector("#rsvp-form");
const formNote = document.querySelector("#form-note");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!rsvpForm.reportValidity()) {
    return;
  }

  const guestName = new FormData(rsvpForm).get("guestName").toString().trim();
  formNote.textContent = `Cảm ơn ${guestName} đã phản hồi. Hẹn gặp bạn trong ngày vui nhé!`;
  formNote.classList.add("is-success");
  rsvpForm.reset();
});
