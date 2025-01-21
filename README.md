# MDX Remote App

This is a simple **Next.js** application designed to render dynamic MDX content. It utilizes **Next.js app routing**, supporting multi-segment routes (e.g., `/docs/advanced/hello-world`). The dynamic routing setup serves MDX content based on the URL, making it easy to manage content with nested folder structures and dynamic URL segments.


## Features

- **Dynamic Routing**: The app uses Next.js dynamic routing to handle multiple URL segments. For example, routes like `/docs/advanced/hello-world` are supported.
- **MDX Rendering**: The app renders MDX content dynamically based on the URL, making it easy to manage content in markdown files with embedded JSX.
- **Custom Layout**: The app uses a simple, customizable layout to display MDX content.
- **Static Params Generation**: The app generates static parameters for each doc at build time, ensuring efficient static site generation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mdx-remote-app.git
   cd mdx-remote-app
p
2. Install dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run dev

4. Open the app in your browser:
    ```bash
    http://localhost:3000
    

## Usage
- Place your MDX files inside the `app/content` folder.
- You can organize them into directories for better structure.
- Access your docs by visiting URLs like `/docs/advanced/hello-world` or `/docs/example`.
- Each document has a title, description, and MDX content, which is rendered dynamically.
