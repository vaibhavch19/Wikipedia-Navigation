# Wikipedia Navigation

## Introduction

This project is a Node.js application that finds the path to the "Philosophy" page on Wikipedia from a given starting URL. It utilizes web scraping techniques to traverse Wikipedia pages, following the first link in the main content of each page until reaching the "Philosophy" page. The number of steps taken and the list of visited pages are then returned.

## Features

- **Traverse Wikipedia**: Initiates the process to find the path to the "Philosophy" page from a specified Wikipedia URL.
- **Web Scraping**: Utilizes Axios for making HTTP requests and Cheerio for parsing and scraping HTML content.
- **Error Handling**: Handles errors gracefully, including missing URL parameters and internal server errors.

## Installation

1. Clone the repository: git clone <repository-url>

2. Navigate to the project directory: cd wikipedia-navigation

3. Install dependencies: npm install


## Usage

1. Start the server: npm start

2. Make a GET request to the `/philosophy-trail` endpoint with the `url` query parameter specifying the Wikipedia page URL to start from.

Example: GET http://localhost:3000/philosophy-trail?url=<wikipedia-url

Replace `<wikipedia-url>` with the URL-encoded Wikipedia page URL.

## Example

Suppose you have the Wikipedia URL `https://en.wikipedia.org/wiki/Artificial_intelligence` that you want to start from.

You would make a GET request to:
GET http://localhost:3000/philosophy-trail?url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FArtificial_intelligence


The server will respond with the number of steps taken and the list of visited pages to reach the "Philosophy" page.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to suggest improvements or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



