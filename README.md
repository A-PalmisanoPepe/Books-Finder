<br />
<p align="center">
  <a href="https://booksfinder-8dd23.web.app">
    <img src="src/images/icon.png" alt="Logo" height="80">
  </a>

  <h3 align="center">Books Finder</h3>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#try-it-out">Try it out</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About

The idea behind the project is to use React to create a web app that allows you to search within the largest catalog of books ever: Google Books. A useful app with a nice graphics.

### Search

A search can be started just entering a keyword or setting additional filters. 
If you select "search settings" you can add:

* Author
* Title
* Publisher
* Subject

Choise between:

* Free ebooks
* Paid ebooks
* All ebooks

Order by:

* Relevance
* Newest


This filters are setted by using Google Books APIs that you can find at https://developers.google.com/books

### Sign In

Accounts are created and managed by using Firebase Authentication.


More info at https://firebase.google.com

### Add Notes

Folders, childfolders, notes, book references are created and stored by using Firestore. 


More info at https://firebase.google.com

## Try it out

Take a look at my app - https://booksfinder-8dd23.web.app


## Getting Started

To get a local copy up and running follow these steps.

### Installation

1. Get a free API Key at https://developers.google.com/books
2. Clone the repo
   ```sh
   git clone https://github.com/A-PalmisanoPepe/Books-Finder.git
   ```
3. Replace the API in `src/apikey.js`
   ```JS
   export const apikey = 'YOUR API';
   ```

## Contact

Annalucia Palmisano Pepe - https://www.linkedin.com/in/annaluciapalmisanopepe


Project Link: https://github.com/A-PalmisanoPepe/Books-Finder.git