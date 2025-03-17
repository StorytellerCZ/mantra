# ChatGPT/Claude Prompts for Mantra Development

This document provides effective prompts for ChatGPT, Claude, and other conversational AI assistants to help you develop Mantra applications. These prompts are designed to guide the AI to provide responses that align with Mantra's architecture and best practices.

## General Mantra Architecture Prompts

### Understanding Mantra Architecture

```
I'm working on a Meteor application using the Mantra architecture. Mantra organizes code into modules with components, containers, actions, and configs. Each module has clear boundaries and responsibilities. UI components are pure and focused on presentation, containers connect UI components with data and actions, and actions contain business logic.

I need help with [your specific question or task].
```

### Creating a New Module

```
I need to create a new module for my Mantra application. The module will handle [describe functionality]. Following Mantra's architecture, I need to create the standard directory structure with components, containers, actions, and configs. Can you help me set up this module structure and explain what should go in each directory?
```

### File Structure Questions

```
I'm working on a Mantra application with [React/Solid]. I need to organize my files according to Mantra's conventions. Where should I place my [components/containers/actions/routes/etc.]? What naming conventions should I follow?
```

## React-Specific Prompts

### Creating React Components

```
I'm working on a Mantra application with React. I need to create a [describe component] component. Following Mantra's principles, this should be a pure UI component that receives data and callbacks as props. Can you help me create this component?
```

### Creating React Containers

```
I'm working on a Mantra application with React. I need to create a container component that will connect my [component name] UI component with data and actions. The container should handle data fetching using Meteor's useTracker hook and pass the data to the UI component. Can you help me create this container?
```

### Using React Hooks in Mantra

```
I'm working on a Mantra application with React. I need to use React hooks to manage state and side effects in my container components. Can you show me how to properly use useState, useEffect, and useTracker (from meteor/react-meteor-data) in a Mantra container component?
```

## Solid.js-Specific Prompts

### Creating Solid Components

```
I'm working on a Mantra application with Solid.js. I need to create a [describe component] component. Following Mantra's principles, this should be a pure UI component that receives data and callbacks as props. Can you help me create this component using Solid's JSX and reactive primitives?
```

### Creating Solid Containers

```
I'm working on a Mantra application with Solid.js. I need to create a container component that will connect my [component name] UI component with data and actions. The container should handle data fetching using a custom createTracker primitive for Meteor reactivity and pass the data to the UI component. Can you help me create this container?
```

### Using Solid Reactivity in Mantra

```
I'm working on a Mantra application with Solid.js. I need to use Solid's reactive primitives to manage state and side effects in my container components. Can you show me how to properly use createSignal, createEffect, and createMemo in a Mantra container component?
```

## FlowRouter and Mounting Prompts

### Setting Up FlowRouter

```
I'm working on a Mantra application with [React/Solid]. I need to set up FlowRouter for my application. Following Mantra's recommendations, I want to use FlowRouter with a custom mounting utility. Can you help me set up the routes for my application?
```

### Creating Custom Mounting Utilities

```
I'm working on a Mantra application with [React/Solid]. I need to create a custom mounting utility to use with FlowRouter instead of using react-mounter/solid-mounter. Can you help me create this utility?
```

### Handling Authentication and Authorization

```
I'm working on a Mantra application with [React/Solid]. I need to implement authentication and authorization using FlowRouter. I want to create protected routes that only authenticated users can access. Can you help me implement this using FlowRouter triggers?
```

## Meteor Integration Prompts

### Working with Meteor Collections

```
I'm working on a Mantra application with [React/Solid]. I need to work with Meteor collections in my actions and containers. Can you show me how to properly define, query, and modify collections following Mantra's principles?
```

### Implementing Meteor Methods

```
I'm working on a Mantra application with [React/Solid]. I need to implement Meteor methods for my application. Following Mantra's principles, where should I define these methods and how should I call them from my actions?
```

### Setting Up Publications and Subscriptions

```
I'm working on a Mantra application with [React/Solid]. I need to set up publications and subscriptions for my data. Following Mantra's principles, where should I define publications and how should I subscribe to them in my containers?
```

## MongoDB Integration Prompts

### Setting Up MongoDB Collections with Schemas

```
I'm working on a Mantra application with [React/Solid]. I need to set up MongoDB collections with proper schemas using SimpleSchema. Can you show me how to define collections, create schemas with validation, and set up indexes for frequently queried fields?
```

### Optimizing MongoDB Queries

```
I'm working on a Mantra application with [React/Solid]. I need to optimize my MongoDB queries for performance. Can you show me how to use projection, sorting, pagination, and query operators effectively? I also need to understand how to use aggregation for more complex data transformations.
```

### MongoDB Security Best Practices

```
I'm working on a Mantra application with [React/Solid]. I need to implement security best practices for MongoDB in my Meteor application. Can you show me how to secure my collections, implement proper validation, and ensure that users can only access and modify data they're authorized to?
```

## Apollo GraphQL Integration Prompts

### Setting Up Apollo Client in Mantra

```
I'm working on a Mantra application with [React/Solid]. I need to integrate Apollo Client for GraphQL data fetching. Can you show me how to set up Apollo Client, create a provider component, and structure my queries and mutations following Mantra's principles?
```

### Using Apollo with React in Mantra

```
I'm working on a Mantra application with React. I need to use Apollo Client's React hooks (useQuery, useMutation, useSubscription) in my container components. Can you show me how to structure my containers to fetch and modify data using Apollo while following Mantra's principles?
```

### Using Apollo with Solid.js in Mantra

```
I'm working on a Mantra application with Solid.js. I need to create custom primitives for Apollo Client to use in my container components. Can you show me how to create createQuery and createMutation primitives and use them in my containers while following Mantra's principles?
```

### Setting Up GraphQL Schema and Resolvers

```
I'm working on a Mantra application with [React/Solid]. I need to set up a GraphQL schema with type definitions and resolvers on the server side. Can you show me how to structure my schema, implement resolvers, and handle authentication and authorization in my resolvers?
```

## Testing Prompts

### Testing UI Components

```
I'm working on a Mantra application with [React/Solid]. I need to write tests for my UI components. Following Mantra's principles, how should I approach testing pure UI components? Can you help me write tests for my [component name] component?
```

### Testing Containers

```
I'm working on a Mantra application with [React/Solid]. I need to write tests for my container components. Following Mantra's principles, how should I approach testing containers that connect to Meteor's reactivity system? Can you help me write tests for my [container name] container?
```

### Testing Actions

```
I'm working on a Mantra application with [React/Solid]. I need to write tests for my actions. Following Mantra's principles, how should I approach testing actions that interact with Meteor methods and collections? Can you help me write tests for my [action name] action?
```

## Migration and Modernization Prompts

### Migrating from Original Mantra

```
I'm working on a Mantra application that was built using the original Mantra specification with Application Context. I want to migrate it to the modern Mantra approach without Application Context. Can you help me understand how to refactor my code to use direct imports and hooks/signals instead of context?
```

### Updating to Modern JavaScript

```
I'm working on a Mantra application that uses older JavaScript syntax. I want to update it to use modern JavaScript features like ES modules, async/await, and optional chaining. Can you help me modernize my code while maintaining Mantra's architecture?
```

## Tips for Using These Prompts

1. **Be specific**: Add details about your specific use case, technologies, and requirements to get more tailored responses.

2. **Provide context**: Include relevant code snippets or file structures when asking for help.

3. **Clarify constraints**: Mention any specific constraints or preferences you have for the solution.

4. **Ask for explanations**: Request explanations along with code examples to better understand the recommendations.

5. **Iterate**: If the initial response doesn't fully address your needs, ask follow-up questions to refine the solution.

Example of a well-structured prompt:

```
I'm working on a Mantra application with React and TypeScript. I'm implementing a user profile feature and need to create:

1. A pure UI component (UserProfile) that displays user information and allows editing
2. A container component that fetches user data from Meteor and handles form submission
3. Actions for updating user profile information via Meteor methods

Here's my current file structure:
[Include relevant file structure]

Can you help me implement these components following Mantra's architecture principles?
```
