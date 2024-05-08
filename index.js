const showBooks = document.querySelector(".book-list");
const showForm = document.querySelector("#showForm");
const form = document.querySelector("form");

showForm.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

const bookList = [
  new Book(
    "Lord of the Rings",
    "J.R.R. Tolkien",
    5,
    "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg"
  ),
  new Book(
    "Game of Thrones",
    "George R.R. Martin",
    5,
    "https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UF1000,1000_QL80_.jpg"
  ),
];

if (localStorage.getItem("bookList") === null) {
  localStorage.setItem("bookList", JSON.stringify(bookList));
}

console.log(JSON.parse(localStorage.getItem("bookList")));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let bookName = document.getElementById("book-name").value;
  let bookAuthor = document.getElementById("book-author").value;
  let bookRating = document.getElementById("book-rating").value;
  let bookImage = document.getElementById("book-image").value;
  addBookToLibrary(bookName, bookAuthor, bookRating, bookImage);
  document.querySelector("form").reset();
});

function ShowStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

function Book(title, author, rating, img) {
  this.title = title;
  this.author = author;
  this.rating = ShowStars(rating);
  this.img = img;
}

function addBookToLibrary(name, author, rating, image) {
  if (!name || !author || !rating || !image) {
    alert("Please fill in all fields");
    return;
  }

  bookList.push(new Book(name, author, rating, image));
  localStorage.setItem("bookList", JSON.stringify(bookList));
  updateBooks();
}

function updateBooks() {
  showBooks.innerHTML = "";
  const bookList = JSON.parse(localStorage.getItem("bookList"));
  bookList.forEach((book) =>
    showBooks.insertAdjacentHTML(
      "beforeend",
      `<div class="flex flex-col gap-4 items-center rounded-xl border border-black p-4"> <h1 class="text-2xl font-semibold ">${book.title}</h1>
  <p class="text-center">Author: ${book.author}</p>
  <p class="text-center">Rating: ${book.rating} </p>
  <img src="${book.img}" class="w-1/4 rounded-xl">
  </div>`
    )
  );
}

updateBooks();
