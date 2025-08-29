// -------------------------------
// Mock Book Data (Marketplace)
// -------------------------------
let books = [
  { title: "Harry Potter", author: "J.K. Rowling", price: 200, category: "Fantasy" },
  { title: "Atomic Habits", author: "James Clear", price: 300, category: "Self-help" },
  { title: "The Alchemist", author: "Paulo Coelho", price: 150, category: "Fiction" },
  { title: "A Brief History of Time", author: "Stephen Hawking", price: 250, category: "Science" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", price: 220, category: "Fantasy" },
];

// -------------------------------
// Utility: Load & Save Bookshelf
// -------------------------------
function getBookshelf() {
  return JSON.parse(localStorage.getItem("bookshelf")) || [];
}

function saveBookshelf(shelf) {
  localStorage.setItem("bookshelf", JSON.stringify(shelf));
}

// -------------------------------
// INDEX.HTML (Browse + Search + Recs)
// -------------------------------
if (document.getElementById("book-list")) {
  const bookList = document.getElementById("book-list");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category");
  const recSection = document.getElementById("recommendations");

  // Display books
  function displayBooks(list, container) {
    container.innerHTML = "";
    if (list.length === 0) {
      container.innerHTML = "<p>No books found.</p>";
      return;
    }
    list.forEach((book, index) => {
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>₹${book.price}</p>
        <p>Category: ${book.category}</p>
        <button onclick="addToShelf(${index})">Add to Shelf</button>
      `;
      container.appendChild(div);
    });
  }

  // Initial Display
  displayBooks(books, bookList);

  // Search functionality
  searchInput.addEventListener("input", () => {
    filterBooks();
  });

  // Category filter
  categoryFilter.addEventListener("change", () => {
    filterBooks();
  });

  function filterBooks() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    let filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
    );
    if (category !== "all") {
      filtered = filtered.filter((b) => b.category === category);
    }
    displayBooks(filtered, bookList);
  }

  // Add to Shelf
  window.addToShelf = function (index) {
    const shelf = getBookshelf();
    shelf.push(books[index]);
    saveBookshelf(shelf);
    alert(`${books[index].title} added to your shelf!`);
    showRecommendations();
  };

  // Show Recommendations
  function showRecommendations() {
    const shelf = getBookshelf();
    if (shelf.length === 0) {
      recSection.innerHTML = "<p>No recommendations yet. Add books to your shelf!</p>";
      return;
    }
    const lastBook = shelf[shelf.length - 1];
    const recs = books.filter(
      (b) => b.category === lastBook.category && !shelf.some((s) => s.title === b.title)
    );
    displayBooks(recs, recSection);
  }

  showRecommendations();
}

// -------------------------------
// SELL.HTML (Form + Price Suggestion)
// -------------------------------
if (document.getElementById("sellForm")) {
  const form = document.getElementById("sellForm");
  const confirmation = document.getElementById("confirmation");
  const priceSuggestion = document.getElementById("price-suggestion");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      category: document.getElementById("category").value,
      condition: document.getElementById("condition").value,
      price: parseInt(document.getElementById("price").value),
    };

    // Add to "marketplace" books
    books.push(newBook);

    // Suggest price range (±20% of entered price)
    const low = Math.round(newBook.price * 0.8);
    const high = Math.round(newBook.price * 1.2);
    priceSuggestion.innerHTML = `<p>💡 Suggested Price Range: ₹${low} – ₹${high}</p>`;

    // Confirmation
    confirmation.textContent = `✅ ${newBook.title} has been added for sale!`;

    // Reset form
    form.reset();
  });
}

// -------------------------------
// BOOKSHELF.HTML (My Shelf)
// -------------------------------
if (document.getElementById("shelf-list")) {
  const shelfList = document.getElementById("shelf-list");
  const emptyMsg = document.getElementById("empty-message");

  function displayShelf() {
    const shelf = getBookshelf();
    shelfList.innerHTML = "";

    if (shelf.length === 0) {
      emptyMsg.textContent = "Your bookshelf is empty.";
      return;
    } else {
      emptyMsg.textContent = "";
    }

    shelf.forEach((book, index) => {
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>₹${book.price}</p>
        <p>Category: ${book.category}</p>
        <button onclick="removeFromShelf(${index})">Remove</button>
      `;
      shelfList.appendChild(div);
    });
  }

  // Remove book
  window.removeFromShelf = function (index) {
    let shelf = getBookshelf();
    shelf.splice(index, 1);
    saveBookshelf(shelf);
    displayShelf();
  };

  displayShelf();
}
