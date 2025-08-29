📚 Tome Store: Pre-Owned Book Marketplace

Tome Store is a lightweight, web-based application that enables users to buy, sell, and manage pre-owned books. Built entirely with HTML, CSS, and vanilla JavaScript, the project provides a responsive UI where users can browse available books, manage a personal bookshelf, receive personalized recommendations, and sell books with smart price suggestions.

📖 Overview

Tome Store is designed as a mini book marketplace with three main features:

Browse & Search Books
Users can search by title/author and filter by category.

Personal Bookshelf
Books can be saved to a personal bookshelf (using localStorage). Users can add or remove books anytime.

Sell Books
A simple form allows users to list books for sale, with an automatic price range suggestion based on their entered price.

🛠 Workflow

Browsing & Searching:

Users land on index.html, where they can browse available books.

Search and category filters help refine results.

Bookshelf Management:

Adding a book stores it in localStorage.

Recommendations are shown based on the last added book’s category.

Books can be removed anytime from bookshelf.html.

Selling a Book:

The form in sell.html captures details like title, author, category, condition, and price.

A smart suggestion shows a ±20% price range to help sellers choose better pricing.

📂 Project Structure
tome-store/
├── index.html        # Home page - Browse & search books
├── bookshelf.html    # My Bookshelf - Saved books
├── sell.html         # Sell a book form
├── script.js         # App logic (browse, shelf, sell, recommendations)
├── style.css         # Global styles
└── assets/
    └── logo.png      # Application logo

⚙️ Installation

Clone the repository:

git clone https://github.com/your-username/tome-store.git
cd tome-store


No build required!
