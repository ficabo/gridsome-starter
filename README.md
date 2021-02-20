# A custom starter for Gridsome

Based on the project you get when you run `gridsome create new-project`.

Maintained by [Ficabo](https://www.ficabo.com.au) for creating fast, modern, custom websites.

## Features added

- Typescript Support in Vue Files (gridsome-plugin-typescript)
- ESLint and Prettier (ensuring compatible with Vue)
- Gridsome plugins for PWA, Sitemap and Robots.txt
- Sanity config and various plugins supporting Sanity
- Custom App.vue with transition on router-view for content
- Some standard meta tags added to main.js to be updated
- TailwindCSS (using gridsome plugin, postcss7 compat) and SCSS
- Webpack Bundle Analyzer and Terser Plugin for output optimization

## Sanity

Strip out sanity information from config if using something else.
Project will not build while expecting the .env for a Sanity project.

- To add a new sanity project, use `sanity init` in project root.
- Create .env with the project id, dataset name and access token

## Ongoing improvements

- Keep packages up to date

## Future improvements

- Ensure Vue3 support once officially supported by Gridsome
