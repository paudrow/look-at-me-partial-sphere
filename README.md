# My Three.js Project

A 3D interactive scene built with Three.js featuring nested spheres with dynamic clipping planes.

## Features

- **Nested Spheres**: Three spheres of different sizes and colors (green, red, yellow) positioned at the same center.
- **Dynamic Clipping**: A clipping plane that updates in real-time to always face the camera, creating cross-sections that follow your view.
- **Grid Floor**: A 10x10 grid helper on the ground for spatial reference.
- **Orbit Controls**: Mouse controls to rotate, zoom, and pan around the scene.
- **No Shadows**: All materials use MeshBasicMaterial for flat, shadow-free rendering.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided URL (usually `http://localhost:5173` or similar).

## Controls

- **Mouse Drag**: Rotate the camera around the scene.
- **Mouse Wheel**: Zoom in/out.
- **Right-Click Drag**: Pan the view.

## Technologies Used

- [Three.js](https://threejs.org/) - 3D graphics library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- TypeScript - For type safety

## Project Structure

- `src/main.ts` - Main application code
- `index.html` - HTML entry point
- `package.json` - Dependencies and scripts

Enjoy exploring the dynamic 3D scene!
