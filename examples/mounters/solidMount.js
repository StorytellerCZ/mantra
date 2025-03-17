/**
 * Solid.js mounting utility for Mantra applications
 * Provides a consistent API with the React mounter
 */

import { render, createComponent } from 'solid-js/web';

// Store the disposal function to clean up previous renders
let dispose = null;
let rootElement = null;

/**
 * Mount a Solid component to the DOM
 * @param {Function} Layout - The layout component to render
 * @param {Object} props - Props to pass to the layout component
 * @param {string} [elementId='solid-root'] - ID of the DOM element to mount to
 */
export const mount = (Layout, props, elementId = 'solid-root') => {
  // Clean up previous render if it exists
  if (dispose) {
    dispose();
  }
  
  // Get or create the root element
  if (!rootElement || rootElement.id !== elementId) {
    rootElement = document.getElementById(elementId);
    
    if (!rootElement) {
      // Create the root element if it doesn't exist
      rootElement = document.createElement('div');
      rootElement.id = elementId;
      document.body.appendChild(rootElement);
    }
  }
  
  // Render the component
  // In Solid, render returns a disposal function
  dispose = render(() => createComponent(Layout, props), rootElement);
};

/**
 * Unmount the current component
 */
export const unmount = () => {
  if (dispose) {
    dispose();
    dispose = null;
  }
};

/**
 * Clean up resources when the application is stopped
 */
export const cleanup = () => {
  unmount();
  if (rootElement?.parentNode) {
    rootElement.parentNode.removeChild(rootElement);
  }
  rootElement = null;
};
