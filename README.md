# Home Page Framework

The home page framework is a simple framework for building simple static web sites with limited dependencies and low complexity. The framework trades capability for simplicity, with the main aim being to empower non-technical contributors to build content.

## Objectives

1. Empower non-technical contributors
    - All pages are build using Markdown 
    - The site structure is defined by a single JavaScript object
    - All content is in one place and can reference each other
2. Minimize complexity of code and size
    - The site is uses default web technologies (HTML, CSS, JavaScript)
    - The site does not use any frameworks or Typescript
    - The site does not come with any dependencies and only uses a few tools for development ([`marked`](https://www.npmjs.com/package/marked), [`prettier`](https://www.npmjs.com/package/prettier), [`eslint`](https://www.npmjs.com/package/eslint))
3. Simplify forking and hosting
    - The site can be forked, the content in `packages/page/pages` replaced and deployed
    - The site is fully compatible with [GitHub pages](https://docs.github.com/en/pages) and can be hosted for free there

## Stack

The tech stack is trimmed to absolute basics and minimal dependencies to reduce complexity, size and risk of NPM supply chain attacks.

- HTML - defines the static page structure (menus and layout)
- CSS - styles the page, sets color scheme and significant parts of the functionality
- JavaScript - generates menu content and loads individual pages to the `content` container
    - The functionality is implemented by toggling CSS classes
    - The pages are loaded using [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- NPM dependencies
    - [`marked`](https://www.npmjs.com/package/marked) - converts Markdown to HTML during site build
    - [`prettier`](https://www.npmjs.com/package/prettier) - formats the cource code
    - [`eslint`](https://www.npmjs.com/package/eslint) - does a static analysis with the formatting handled by `prettier`

## Build and Deployment

The page can be built using the following command. The build converts Markdown content to HTML pages, from `packages/page/pages` to `packages/page/dist/pages`.

```bash
pnpm build
```

The site can be tested locally using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). In VSCode:
- Install Live Server
- Right-click `packages/page/dist/index.html` and pick `Open with Live Server` 

The cannot be opened directly in a browser (without a server), because it won't be able to access the separate pages due to CORS policy.

The page is designed for deployment in [GitHub pages](https://docs.github.com/en/pages). The pages can deploy pages only from the root of the repository. The page is deployed using a `git subtree` that basically creates a branch with only the sub-tree so GitHub pages can deploy from the branch with the page in root. The page is deployed byt the following command triggered from the repository root.

```bash
pnpm run deploy
```

The deployment uses the following command to create a branch `gh-pages` with the page in the root.

```bash
git subtree push --prefix packages/page/dist origin gh-pages
```

The GitHub pages must be then configured to deploy from the `gh-pages` branch. In the repository, set the `Settings->Pages->Branch` to `gh-pages`, `/(root)` and click `Save`.

## Contributing Content

All content is in the directory `packages/page/pages`.
- The pages are defined in Markdown
- Pages can be in sub-directories
- Images must be in `png` format
- The site structure is based on the `packages/page/pages` directory structure
    - The top level directories define buttons in the top menu
    - The deeper levels define buttons in the side menu
    - Sub-directories define collapsible sections in the side menu
    - The pages are ordered by prefixing each with the `NUMBER_*`, the number defines order and is removed before the sections are rendered
    - The page files should use `_` instead of spaces, the page logic replaces them for spaces