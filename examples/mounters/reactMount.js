/**
 * Modern React mounting utility for Mantra applications
 * Compatible with React 18+ using the new createRoot API
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

// Store the root instance to avoid recreating it on each mount
let root = null;
let rootElement = null;

/**
 * Mount a React component to the DOM
 * @param {React.ComponentType} Layout - The layout component to render
 * @param {Object} props - Props to pass to the layout component
 * @param {string} [elementId='react-root'] - ID of the DOM element to mount to
 */
export const mount = (Layout, props, elementId = 'react-root') => {
  // Get or create the root element
  if (!rootElement || rootElement.id !== elementId) {
    rootElement = document.getElementById(elementId);
    
    if (!rootElement) {
      // Create the root element if it doesn't exist
      rootElement = document.createElement('div');
      rootElement.id = elementId;
      document.body.appendChild(rootElement);
    }
    
    // Create a new root when the element changes
    root = createRoot(rootElement);
  }
  
  // Render the component
  root.render(
    <Layout {...props} />
  );
};

/**
 * Unmount the current component
 */
export const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
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
