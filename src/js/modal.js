const modal = document.querySelector(".main-modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");
const modalContent = document.querySelector(".modal-content");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// thank you message onClick register button
modal.addEventListener("click", function (e) {
  if (e.target.tagName == "BUTTON") {
    modalContent.innerHTML = `<h4>Thank you for registering!</h4> <p>Check your email for giveaway details.</p>`;
  }
});
