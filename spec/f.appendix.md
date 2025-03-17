# Appendix F: Modern Component Mounting

This appendix provides guidance on modern approaches to mounting React and Solid components when using FlowRouter in Mantra applications.

## The Problem with react-mounter

The original Mantra specification recommended using `react-mounter` with FlowRouter for mounting React components. However, `react-mounter` has several limitations:

1. It hasn't been updated in years and isn't compatible with React 18's new rendering API
2. It uses the legacy `ReactDOM.render` method which is deprecated in React 18
3. There's no equivalent package for Solid.js

## Custom Mounting Utilities

To address these issues, Mantra now recommends creating custom mounting utilities that are compatible with modern React and Solid. These utilities provide a consistent API while using the latest rendering methods under the hood.

### Benefits of Custom Mounting Utilities

- Compatible with React 18+ and Solid.js
- Consistent API across frameworks
- Full control over rendering behavior
- No dependencies on abandoned packages
- Can be extended with additional features as needed

## Implementation

Mantra provides reference implementations for both React and Solid in the `examples/mounters` directory. These implementations can be used directly or adapted to your specific needs.

### Usage with FlowRouter

Once you've created your custom mounting utility, you can use it with FlowRouter in a similar way to the original `react-mounter` approach:

```tsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "../utils/reactMount";
import MainLayout from "../layouts/MainLayout";
import PostListContainer from "../containers/PostListContainer";

FlowRouter.route("/", {
  name: "posts.list",
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});
```

This approach maintains the familiar API while using modern rendering methods under the hood.

## Reference Implementations

See the `examples/mounters` directory for reference implementations for both React and Solid:

- `reactMount.js` - A modern mounting utility for React 18+
- `solidMount.js` - A mounting utility for Solid.js

These implementations can be used as-is or adapted to your specific needs.
