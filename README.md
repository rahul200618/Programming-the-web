# Programming-the-web

A collection of small front-end exercises and mini-projects created while learning web development. Each folder contains a standalone static project (HTML, CSS, JS and assets). Open a project's folder and open its `index.html` in a browser, or serve the folder with a simple HTTP server during development.

## Projects in this repository

Below is a quick gallery of the projects in this repository. Click a card to open that project's folder in your browser.

| Project | Description |
|---|---|
| [Final project](./Final project/) | Quiz & Ladder — Snakes & Ladders variant with quiz questions. Live demo: https://rahul200618.github.io/Quiz-and-Ladder-A-Web-game/ |
| [CSS BATTLE1](./CSS%20BATTLE1/) | Perfume UI CSS challenge. |
| [CSS BATTLE2](./CSS%20BATTLE2/) | User Reviews CSS challenge. |
| [CSS Mini Challenge](./CSS%20Mini%20Challenge/) | Coffee card mini challenge. |
| [JS Practice](./JS%20Practice/) | Small JS demos (lightbulb, todo, quote generator, etc.). |
| [day1](./day1/) | Day 1 exercises and examples. |
| [weather-app-main](./weather-app-main/) | Weather app demo (includes assets and UI). |

If any folder is missing an `index.html`, open the listed files inside that folder to run the demo.

## How to run locally

1. Clone this repository or download the ZIP.
2. To quickly open a static page, open the project's `index.html` in your browser. For consistent behavior (and to avoid CORS issues) it's recommended to serve files over HTTP:

```powershell
# from the repo root or the specific project folder
python -m http.server 8000

# then open http://localhost:8000/<project-folder>/
```

3. Alternatively use VS Code Live Server extension and click "Go Live" in the bottom bar.

## Contributing

- Add new small projects as separate folders. Keep each project self-contained (assets, HTML, CSS, JS inside its folder).
- Use semantic HTML and add a short `Readme.md` inside each project folder describing how to run that demo and any external APIs or keys required.

## Notes

- This repository is intended for learning and demonstration. If you'd like a single license that applies to all projects, add a top-level `LICENSE` file (MIT is a common choice).
- If you publish any project with sensitive API keys, remove or rotate keys before pushing.

---

If you want, I can:

- Add short descriptions for each subfolder (I can scan each folder and extract `index.html` titles or first lines to produce a more detailed list).
- Add a top-level `LICENSE` (MIT) and a repository-level demo index page that links to every project with thumbnails.

Tell me which of those you'd like and I'll implement it.

