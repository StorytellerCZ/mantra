# Cursor AI Rules for Mantra with React

This guide provides rules and patterns for Cursor AI to help you develop Mantra applications using React. Following these rules will ensure your code adheres to Mantra's architecture and best practices.

## General Mantra Rules

```cursor-rules
# Mantra Architecture Rules
- Always organize code into modules with clear boundaries
- Each module should have its own directory with standard subdirectories: components, containers, actions, configs, libs
- Keep UI components pure and stateless whenever possible
- Use containers to connect UI components with data and actions
- Use actions for business logic and data manipulation
- Use FlowRouter for routing with custom mounting utilities
- Follow the single responsibility principle for all components and functions

# File Structure Rules
- Place React components in the `components` directory with `.jsx` or `.tsx` extension
- Place container components in the `containers` directory with `.jsx` or `.tsx` extension
- Place actions in the `actions` directory with `.js` or `.ts` extension
- Place configuration in the `configs` directory
- Place utility functions in the `libs` directory
- Name files using PascalCase for components and camelCase for other files

# Import Rules
- Use absolute imports for cross-module dependencies
- Use relative imports for intra-module dependencies
- Import styles directly into component files
- Import actions directly in containers

# Component Rules
- Create pure functional components by default
- Use React hooks for state and lifecycle management
- Avoid using class components unless necessary
- Keep UI components focused on presentation, not business logic
- Use TypeScript interfaces or PropTypes for component props
- Export components as named exports, not default exports

# Container Rules
- Containers should connect UI components with data and actions
- Use hooks like useState, useEffect, useContext for data management
- Pass data and callbacks to UI components as props
- Keep containers focused on data fetching and state management
- Use custom hooks to share common data fetching logic

# Action Rules
- Actions should contain business logic
- Actions should be pure functions when possible
- Use async/await for asynchronous operations
- Return promises from asynchronous actions
- Handle errors within actions

# Routing Rules
- Use FlowRouter for routing
- Use custom mounting utilities instead of react-mounter
- Define routes in a dedicated routes file
- Group related routes together
- Use route parameters for dynamic content

# Testing Rules
- Write unit tests for all components
- Use Jest and React Testing Library for testing
- Mock external dependencies in tests
- Test actions independently from components
- Use integration tests for complex interactions
```

## React-Specific Rules

```cursor-rules
# React Component Rules
- Use functional components with hooks instead of class components
- Use the useState hook for local component state
- Use the useEffect hook for side effects
- Use the useContext hook for accessing context
- Use the useReducer hook for complex state logic
- Use the useCallback hook for memoizing functions
- Use the useMemo hook for memoizing values
- Use the useRef hook for accessing DOM elements

# React Performance Rules
- Memoize expensive calculations with useMemo
- Memoize callback functions with useCallback
- Use React.memo for pure functional components that render often
- Use the useCallback hook for event handlers passed to child components
- Avoid unnecessary re-renders by using proper dependency arrays in hooks
- Use virtualization for long lists (react-window or react-virtualized)

# React State Management Rules
- Use local state for UI-specific state
- Use context for shared state across components
- Consider using Recoil or Jotai for complex state management
- Avoid prop drilling by using context or state management libraries
- Keep state as close as possible to where it's used

# React Custom Hooks Rules
- Create custom hooks to reuse stateful logic
- Name custom hooks with the 'use' prefix
- Keep custom hooks focused on a single concern
- Return an object or array from custom hooks
- Document custom hooks with JSDoc comments

# React Error Handling Rules
- Use error boundaries to catch and handle errors
- Use try/catch blocks for async operations
- Provide meaningful error messages to users
- Log errors for debugging purposes
- Implement fallback UI for error states

# React Accessibility Rules
- Use semantic HTML elements
- Provide alt text for images
- Use ARIA attributes when necessary
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy

# React Form Rules
- Use controlled components for form inputs
- Use form libraries like Formik or react-hook-form for complex forms
- Validate form inputs
- Provide clear error messages for invalid inputs
- Handle form submission asynchronously
- Disable submit button during form submission

# React Styling Rules
- Use CSS modules or styled-components for component styling
- Keep styles co-located with components
- Use responsive design principles
- Use theme variables for consistent styling
- Avoid inline styles except for dynamic values
```

## Meteor Integration Rules

```cursor-rules
# Meteor Data Rules
- Use the useTracker hook from meteor/react-meteor-data for reactive data
- Use Meteor.call for method calls
- Use Meteor.subscribe for subscriptions
- Use Meteor.userId() and Meteor.user() for user data
- Use Meteor.settings for configuration

# Meteor Collection Rules
- Define collections in a dedicated collections directory
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

# Meteor Publication Rules
- Define publications in a dedicated publications directory
- Implement proper security checks in publications
- Limit the fields returned by publications
- Use reactive joins when necessary
- Handle errors in publications

# Meteor Authentication Rules
- Use Meteor.userId() to check if user is logged in
- Use Meteor.user() to get user data
- Use Roles package for role-based access control
- Implement proper security checks in methods and publications
- Use Accounts.createUser for user registration
- Use Meteor.loginWithPassword for user login
```

## MongoDB Rules

```cursor-rules
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

# MongoDB Example
```js
// Define collection and schema
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
  title: {
    type: String,
    max: 100,
    index: true
  },
  content: {
    type: String,
    max: 5000
  },
  authorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  tags: {
    type: Array,
    optional: true
  },
  'tags.$': {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
});

Posts.attachSchema(Posts.schema);

// Example queries
export const getRecentPosts = (limit = 10) => {
  return Posts.find(
    { }, // query
    { 
      sort: { createdAt: -1 },
      limit,
      fields: { content: 0 } // exclude content for performance
    }
  ).fetch();
};

export const getPostsByTag = (tag, limit = 10) => {
  return Posts.find(
    { tags: tag },
    {
      sort: { createdAt: -1 },
      limit
    }
  ).fetch();
};
```
```

## Apollo GraphQL Rules

```cursor-rules
# Apollo Client Rules
- Use Apollo Client for GraphQL data fetching in Mantra
- Define Apollo Client instance in a dedicated file
- Use useQuery hook for queries
- Use useMutation hook for mutations
- Use useSubscription hook for subscriptions
- Implement proper error handling for GraphQL operations
- Use Apollo Cache for client-side state management

# GraphQL Schema Rules
- Define GraphQL schema in a dedicated directory
- Use type definitions for all types, queries, mutations, and subscriptions
- Implement resolvers for all fields
- Use proper error handling in resolvers
- Implement proper authentication and authorization in resolvers

# Apollo Integration Example
```jsx
// Apollo Client setup (lib/apollo.js)
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Meteor } from 'meteor/meteor';

const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    'meteor-login-token': Meteor._localStorage.getItem('Meteor.loginToken')
  }
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Using Apollo in a container component
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { PostList } from '../components/PostList';
import { Loading } from '/imports/ui/components/Loading';
import { ErrorDisplay } from '/imports/ui/components/ErrorDisplay';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      excerpt
      createdAt
      author {
        _id
        username
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      success
      message
    }
  }
`;

export const PostListContainer = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });
  
  if (loading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;
  
  const handleDelete = (postId) => {
    deletePost({ variables: { id: postId } });
  };
  
  return (
    <PostList 
      posts={data.posts} 
      onDelete={handleDelete} 
      isDeleting={deleteLoading} 
    />
  );
};
```
```

## FlowRouter and Mounting Rules

```cursor-rules
# FlowRouter Rules
- Use FlowRouter for routing
- Define routes in a dedicated routes file
- Group related routes together
- Use route parameters for dynamic content
- Use triggers for authentication and authorization
- Use queryParams for filtering and sorting

# Custom Mounting Rules
- Use the custom mounting utility from utils/reactMount
- Mount components in the FlowRouter action function
- Pass route parameters as props to components
- Use a layout component for consistent page structure
- Clean up resources when unmounting components

# Example FlowRouter Setup
```jsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "../utils/reactMount";
import MainLayout from "../layouts/MainLayout";
import PostListContainer from "../containers/PostListContainer";
import PostViewContainer from "../containers/PostViewContainer";

FlowRouter.route("/", {
  name: "posts.list",
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});

FlowRouter.route("/post/:id", {
  name: "posts.view",
  action(params) {
    mount(MainLayout, {
      content: <PostViewContainer id={params.id} />
    });
  }
});
```
```

## References and Resources

```cursor-rules
# Official Documentation
- Meteor Documentation: https://docs.meteor.com/
- React Documentation: https://react.dev/
- FlowRouter Documentation: https://github.com/zodern/flow-router-extra
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- MongoDB Documentation: https://docs.mongodb.com/
- Apollo GraphQL Documentation: https://www.apollographql.com/docs/

# Recommended Reading
- Mantra Specification: https://github.com/StorytellerCZ/mantra
- React Hooks Documentation: https://react.dev/reference/react
- Meteor Guide: https://guide.meteor.com/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- MongoDB Manual: https://docs.mongodb.com/manual/
- Apollo Client React Documentation: https://www.apollographql.com/docs/react/
- GraphQL Documentation: https://graphql.org/learn/
```

These rules are designed to help Cursor AI assist you in developing Mantra applications with React. Adjust them as needed for your specific project requirements.
