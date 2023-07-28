<h1 align="center">
  Scratch Map App
</h1>

<p align="center">
  Online Demo: 
  <a href="https://main--classy-pegasus-8cb993.netlify.app/">
    https://main--classy-pegasus-8cb993.netlify.app/
  </a>
</p>

## Project Description - Scratch Maps

The "Scratch Maps" is a small web application that allows users to interact with SVG maps representing different countries around the world. The main features of the application include:

1.  Country Selection: Users can choose any country from the available SVG maps to explore and interact with.

2.  Coloring Regions: Each map allows users to fill regions with different colors to represent their preferences. Users can choose from five color categories, such as "Visited," "Transit," "Want to visit," "Favorite," or "Don't want."

3.  Clear Map: Users have the option to clear all the color markings on the map, resetting it to its original state.

4.  Delete Map: Users can remove a map from the list.

5.  Download Screenshot: The application offers the functionality to generate and download a screenshot of the current map with color markings.

6.  Zoom Capability: The SVG maps support zooming, enabling users to explore even small regions with ease, such as finding the tiny country of Liechtenstein on the world map.

## Technology Stack:

The application is built using the following technologies:

- React.
- TypeScript.
- Gatsby.
- SVG (Scalable Vector Graphics): Used to represent the interactive maps.

## Project Goals:

The primary goal of the "Scratch Maps" project is to create an engaging and user-friendly platform for users to explore and interact with different SVG maps. The application aims to provide an enjoyable experience by allowing users to express their preferences through color markings and easily navigate the maps using the zoom feature. Additionally, the option to download screenshots enhances the usability of the application for sharing and saving map selections.

## File Structure:

- src
  - assets: For static assets used in the application, such as images, icons, and SVG maps.
    - svg-maps: This subdirectory specifically stores the SVG map files representing different countries.
  - components: For reusable React components used throughout the application.
    - hooks: For custom React hooks.
  - pages: Gatsby system folder for pages.
  - styles: The styles directory contains all the CSS (SCSS) and styling-related files for the application.
    - components: This subdirectory holds CSS modules specific to individual components.
    - fonts: For any custom fonts used in the application.

## 🚀 Try yourself

<a href="https://main--classy-pegasus-8cb993.netlify.app/" target="_blank">
Check online demo
</a>

or
1. Clone the repository and open the directory in terminal.
2. Run `npm ci` or `npm i`.
3. Run `npm develop`.
4. Open <a href="http://localhost:8000/" target="_blank">http://localhost:8000/</a>
