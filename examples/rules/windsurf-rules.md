# Windsurf Rules for Mantra Development

This directory contains rules for Windsurf, the world's first agentic IDE powered by Cascade, to help with Mantra application development.

Please use the appropriate rules file based on your framework choice:

- [Windsurf Rules for React](./windsurf-react.md) - Rules for Windsurf when working with Mantra + React
- [Windsurf Rules for Solid.js](./windsurf-solid.md) - Rules for Windsurf when working with Mantra + Solid.js

## General Mantra Structure Rules

```windsurf-rules
# Project Structure Rules
- Mantra organizes code into modules with clear boundaries
- Each module has its own directory with standard subdirectories: components, containers, actions, configs, libs
- UI components are pure and focused on presentation
- Containers connect UI components with data and actions
- Actions contain business logic and data manipulation
- FlowRouter is used for routing with custom mounting utilities
- Follow the single responsibility principle for all components and functions

# File Naming and Organization Rules
- Place React/Solid components in the `components` directory with `.jsx` or `.tsx` extension
- Place container components in the `containers` directory with `.jsx` or `.tsx` extension
- Place actions in the `actions` directory with `.js` or `.ts` extension
- Place configuration in the `configs` directory
- Place utility functions in the `libs` directory
- Name files using PascalCase for components and camelCase for other files
- Group related files in subdirectories when appropriate

# Import Rules
- Use absolute imports for cross-module dependencies
- Use relative imports for intra-module dependencies
- Import styles directly into component files
- Import actions directly in containers
- Avoid circular dependencies
```

## Framework-Specific Rules

```windsurf-rules
# React Rules
- Use functional components with hooks
- Use the useTracker hook from meteor/react-meteor-data for reactive data
- Keep UI components pure and focused on presentation
- Use TypeScript interfaces for component props
- Follow React best practices for performance optimization

# Solid.js Rules
- Use functional components with Solid's reactive primitives
- Create custom primitives for Meteor reactivity (createTracker)
- Use Solid's <Show>, <For>, and other control flow components
- Keep UI components pure and focused on presentation
- Follow Solid.js best practices for fine-grained reactivity
```

## Meteor Integration Rules

```windsurf-rules
# Meteor Data Rules
- Use the appropriate reactive data mechanism for your framework (useTracker for React, createTracker for Solid)
- Use Meteor.call for method calls
- Use Meteor.subscribe for subscriptions
- Use Meteor.userId() and Meteor.user() for user data
- Use Meteor.settings for configuration

# Meteor Collection Rules
- Define collections in a dedicated collections directory
- Use SimpleSchema for schema validation
- Use MongoDB methods for querying collections
- Use Meteor methods for modifying collections
- Implement proper security checks in Meteor methods
- Use publication functions to control data access

# Meteor Method Rules
- Define methods in a dedicated methods directory
- Use check or SimpleSchema for method argument validation
- Implement proper security checks in methods
- Return values from methods when appropriate
- Handle errors in methods
```

## MongoDB Rules

```windsurf-rules
# MongoDB Schema Rules
- Define clear schemas for all collections using SimpleSchema
- Use schema validation for both client and server
- Define indexes for frequently queried fields
- Use proper data types for fields (String, Number, Boolean, Date, etc.)
- Include createdAt and updatedAt timestamps in schemas

# MongoDB Query Rules
- Use MongoDB query operators ($eq, $gt, $lt, $in, etc.) for efficient queries
- Use projection to limit fields returned by queries
- Use sort, skip, and limit for pagination
- Use aggregation pipeline for complex data transformations
- Implement proper security checks before executing queries
```

## Apollo GraphQL Rules

```windsurf-rules
# Apollo Client Rules
- Use Apollo Client for GraphQL data fetching
- Define Apollo Client instance in a dedicated file
- Use the appropriate hooks or primitives for your framework (React hooks or Solid primitives)
- Implement proper error handling for GraphQL operations
- Use Apollo Cache for client-side state management

# GraphQL Schema Rules
- Define GraphQL schema in a dedicated directory
- Use type definitions for all types, queries, mutations, and subscriptions
- Implement resolvers for all fields
- Use proper error handling in resolvers
- Implement proper authentication and authorization in resolvers
```

## FlowRouter and Mounting Rules

```windsurf-rules
# FlowRouter Rules
- Use FlowRouter for routing
- Define routes in a dedicated routes file
- Group related routes together
- Use route parameters for dynamic content
- Use triggers for authentication and authorization
- Use queryParams for filtering and sorting

# Custom Mounting Rules
- Use the custom mounting utility for your framework (reactMount for React, solidMount for Solid)
- Mount components in the FlowRouter action function
- Pass route parameters as props to components
- Use a layout component for consistent page structure
- Clean up resources when unmounting components
```

## Windsurf-Specific Features

```windsurf-rules
# AI Flow Rules
- Use AI Flow to generate new components, containers, and actions
- Provide clear instructions about the module, purpose, and requirements
- Reference existing components and patterns for consistency
- Review and refine AI-generated code before committing

# Code Explanation Rules
- Ask Windsurf to explain complex code patterns in your Mantra application
- Request explanations for Meteor-specific features when needed
- Use the explanation feature to understand the relationship between components, containers, and actions

# Refactoring Rules
- Use Windsurf's refactoring capabilities to modernize legacy Mantra code
- Request refactoring of class components to functional components
- Ask for help migrating from react-mounter to custom mounting utilities
- Use AI assistance to improve code organization and module boundaries

# Debugging Rules
- Use Windsurf to help identify issues in your Mantra application
- Provide context about the error and the relevant components/actions
- Ask for debugging strategies specific to Meteor and your framework
- Use AI assistance to understand reactive data flow issues
```

## Example Workflows

```windsurf-rules
# Creating a New Module
1. Define the module's purpose and responsibilities
2. Create the module directory structure (components, containers, actions, etc.)
3. Define the data model with MongoDB collections and schemas
4. Create the UI components with proper props and types
5. Create container components to connect with Meteor data
6. Implement actions for business logic
7. Set up routes in FlowRouter
8. Test the module functionality

# Adding a New Feature
1. Identify the module that should contain the feature
2. Define the data requirements and update schemas if needed
3. Create or update UI components
4. Create or update container components
5. Implement new actions for business logic
6. Update routes if needed
7. Test the new feature

# Debugging Reactive Data Issues
1. Identify the component with reactive data issues
2. Check the container component's reactive data sources
3. Verify that subscriptions are properly set up and ready
4. Check for proper cleanup when components unmount
5. Use Meteor's reactive debugging tools if needed
6. Test with simplified data to isolate the issue
```

## References and Resources

```windsurf-rules
# Official Documentation
- Meteor Documentation: https://docs.meteor.com/
- React Documentation: https://react.dev/
- Solid.js Documentation: https://www.solidjs.com/docs/latest/
- FlowRouter Documentation: https://github.com/zodern/flow-router-extra
- MongoDB Documentation: https://docs.mongodb.com/
- Apollo GraphQL Documentation: https://www.apollographql.com/docs/
- Windsurf Documentation: https://windsurf.io/docs

# Mantra Resources
- Mantra Specification: https://github.com/StorytellerCZ/mantra
- Mantra Examples: https://github.com/StorytellerCZ/mantra/examples
- Custom Mounters: https://github.com/StorytellerCZ/mantra/examples/mounters
```

These rules are designed to help Windsurf's AI understand and assist with your Mantra application development. Adjust them as needed for your specific project requirements.
