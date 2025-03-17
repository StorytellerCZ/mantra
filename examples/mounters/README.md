# Modern Component Mounters for Mantra

This directory contains modern mounting utilities for React and Solid.js applications following the Mantra specification. These utilities provide a consistent API for mounting components with FlowRouter while using the latest rendering methods under the hood.

## Available Mounters

- `reactMount.js` - A modern mounting utility for React 18+
- `solidMount.js` - A mounting utility for Solid.js

## Installation

Copy the appropriate mounter file to your project's `lib/utils` directory (or another location of your choice).

### Dependencies

#### For React Mounter
- React 18+
- react-dom 18+

#### For Solid Mounter
- Solid.js
- solid-js/web

## Usage with FlowRouter

### React Example

```jsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "/imports/lib/utils/reactMount";
import MainLayout from "/imports/ui/layouts/MainLayout";
import PostListContainer from "/imports/ui/containers/PostListContainer";

FlowRouter.route("/", {
  name: "posts.list",
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});
```

### Solid Example

```jsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "/imports/lib/utils/solidMount";
import MainLayout from "/imports/ui/layouts/MainLayout";
import PostListContainer from "/imports/ui/containers/PostListContainer";

FlowRouter.route("/", {
  name: "posts.list",
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});
```

## API

Both mounters provide the same API:

### mount(Layout, props, elementId)

Mounts a component to the DOM.

- `Layout`: The layout component to render
- `props`: Props to pass to the layout component
- `elementId`: (Optional) ID of the DOM element to mount to. Defaults to 'react-root' for React and 'solid-root' for Solid.

### unmount()

Unmounts the current component.

### cleanup()

Cleans up resources when the application is stopped.

## Customization

Feel free to modify these utilities to suit your specific needs. For example, you might want to add error handling, logging, or additional features like automatic data loading.
