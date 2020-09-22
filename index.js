import galleryItems from "./gallery-items.js";

const Refs = {
  ulGallery: document.querySelector(".js-gallery"),
  backDrop: document.querySelector(".js-lightbox"),
  modal: document.querySelector(".lightbox__content"),
  modalImage: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector("[data-action=close-lightbox]"),
};
galleryItems.forEach((element, index) => {
  const li = document.createElement("li");
  li.setAttribute("class", "gallery__item");
  const link = document.createElement("a");
  link.setAttribute("class", "gallery__link");
  const image = document.createElement("img");
  image.setAttribute("class", "gallery__image");
  image.setAttribute("src", element.preview);
  image.dataset.source = element.original;
  image.dataset.index = index;
  image.setAttribute("alt", element.description);

  link.appendChild(image);
  li.appendChild(link);

  Refs.ulGallery.appendChild(li);
});

Refs.ulGallery.addEventListener("click", openModal);
Refs.closeBtn.addEventListener("click", closeModal);
function openModal(e) {
  if (e.target.nodeName === "IMG") {
    Refs.backDrop.classList.add("is-open");
    Refs.modalImage.setAttribute("src", e.target.dataset.source);
    Refs.modalImage.setAttribute("index", e.target.dataset.index);
    Refs.backDrop.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModal);
  }
}
function closeModal(e) {
  const currentIndex = Number.parseInt(Refs.modalImage.getAttribute("index"));
  if (
    e.code === "ArrowRight" &&
    currentIndex != Refs.ulGallery.childNodes.length - 1
  ) {
    const nextImage =
      Refs.ulGallery.childNodes[currentIndex + 1].firstChild.firstChild.dataset
        .source;
    Refs.modalImage.setAttribute("src", nextImage);
    Refs.modalImage.setAttribute("index", currentIndex + 1);
  } else if (e.code === "ArrowLeft" && currentIndex != 0) {
    const previusImage =
      Refs.ulGallery.childNodes[currentIndex - 1].firstChild.firstChild.dataset
        .source;
    Refs.modalImage.setAttribute("src", previusImage);
    Refs.modalImage.setAttribute("index", currentIndex - 1);
  } else if (
    e.code === "Escape" ||
    e.target.nodeName === "BUTTON" ||
    e.target.nodeName === "DIV"
  ) {
    Refs.backDrop.classList.remove("is-open");
    Refs.modalImage.setAttribute("src", "");
    Refs.backDrop.removeEventListener("click", closeModal);
    window.removeEventListener("keydown", closeModal);
  }
}
