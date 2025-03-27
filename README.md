# My Gulp Project

This project is set up to use Gulp for automating tasks, specifically for live reloading of the server whenever changes are made to HTML or CSS files. Below are the details on how to set up and use this project.

## Project Structure

```
my-gulp-project
├── src
│   ├── css
│   │   └── styles.css
│   ├── html
│   │   └── index.html
├── gulpfile.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd my-gulp-project
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run Gulp**
   Start the Gulp tasks by running:
   ```bash
   npx gulp
   ```

## Usage

- The project will automatically reload the server whenever changes are detected in the HTML or CSS files.
- You can modify the `src/css/styles.css` file to change styles, and the `src/html/index.html` file to update the HTML structure.

## Gulp Tasks

- **Watch**: Monitors changes in the HTML and CSS files.
- **Serve**: Serves the project and reloads the browser on changes.

## License

This project is licensed under the MIT License.