# Cursor AI Rules for Mantra with Solid.js

This guide provides rules and patterns for Cursor AI to help you develop Mantra applications using Solid.js. Following these rules will ensure your code adheres to Mantra's architecture and best practices.

## General Mantra Rules

```cursor-rules
# Mantra Architecture Rules
- Always organize code into modules with clear boundaries
- Each module should have its own directory with standard subdirectories: components, containers, actions, configs, libs
- Keep UI components pure and focused on presentation
- Use containers to connect UI components with data and actions
- Use actions for business logic and data manipulation
- Use FlowRouter for routing with custom mounting utilities
- Follow the single responsibility principle for all components and functions

# File Structure Rules
- Place Solid components in the `components` directory with `.jsx` or `.tsx` extension
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
- Create functional components by default
- Use Solid's reactive primitives for state management
- Keep UI components focused on presentation, not business logic
- Use TypeScript interfaces for component props
- Export components as named exports, not default exports

# Container Rules
- Containers should connect UI components with data and actions
- Use Solid's createSignal, createEffect, createMemo for data management
- Pass data and callbacks to UI components as props
- Keep containers focused on data fetching and state management
- Use custom primitives to share common data fetching logic

# Action Rules
- Actions should contain business logic
- Actions should be pure functions when possible
- Use async/await for asynchronous operations
- Return promises from asynchronous actions
- Handle errors within actions

# Routing Rules
- Use FlowRouter for routing
- Use custom mounting utilities instead of solid-mounter
- Define routes in a dedicated routes file
- Group related routes together
- Use route parameters for dynamic content

# Testing Rules
- Write unit tests for all components
- Use Vitest and Solid Testing Library for testing
- Mock external dependencies in tests
- Test actions independently from components
- Use integration tests for complex interactions
```

## Solid.js-Specific Rules

```cursor-rules
# Solid Component Rules
- Use functional components with Solid's reactive primitives
- Use createSignal for local component state
- Use createEffect for side effects
- Use createMemo for derived state
- Use createResource for async data fetching
- Use createContext and useContext for context
- Use props.children for component composition
- Use the <Show> component for conditional rendering
- Use the <For> component for list rendering
- Use the <Switch> and <Match> components for multiple conditions
- Use the <Portal> component for rendering outside the component tree
- Use the <ErrorBoundary> component for error handling

# Solid Reactivity Rules
- Understand that Solid uses fine-grained reactivity, not VDOM diffing
- Access signal values in tracking scopes (like JSX or createEffect)
- Use the () syntax to read signal values
- Use setters to update signal values
- Use batch() for batching multiple updates
- Use untrack() to prevent tracking dependencies
- Use on() to explicitly specify dependencies
- Use createMemo for expensive calculations

# Solid Performance Rules
- Take advantage of Solid's fine-grained reactivity
- Only update what changes, not entire components
- Use createMemo for expensive calculations
- Use the <For> component for efficient list rendering
- Use the keyed attribute for list items
- Use the <Show> component for conditional rendering
- Avoid unnecessary signal reads and writes
- Use createDeferred for non-critical updates

# Solid State Management Rules
- Use createSignal for local state
- Use createStore for complex nested state
- Use createContext for shared state across components
- Consider using Solid's built-in stores for complex state management
- Keep state as close as possible to where it's used
- Use props for passing data down the component tree

# Solid Custom Primitives Rules
- Create custom primitives to reuse reactive logic
- Return signals or derived values from custom primitives
- Keep custom primitives focused on a single concern
- Document custom primitives with JSDoc comments
- Follow the naming convention of create* for custom primitives

# Solid Error Handling Rules
- Use <ErrorBoundary> to catch and handle errors
- Use try/catch blocks for async operations
- Provide meaningful error messages to users
- Log errors for debugging purposes
- Implement fallback UI for error states

# Solid Accessibility Rules
- Use semantic HTML elements
- Provide alt text for images
- Use ARIA attributes when necessary
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy

# Solid Form Rules
- Use controlled inputs with createSignal
- Create custom form primitives for complex forms
- Validate form inputs
- Provide clear error messages for invalid inputs
- Handle form submission asynchronously
- Disable submit button during form submission

# Solid Styling Rules
- Use CSS modules or styled-components for component styling
- Keep styles co-located with components
- Use responsive design principles
- Use theme variables for consistent styling
- Avoid inline styles except for dynamic values
```

## Meteor Integration Rules

```cursor-rules
# Meteor Data Rules
- Create custom primitives for reactive Meteor data
- Use Meteor.call for method calls
- Use Meteor.subscribe for subscriptions
- Use Meteor.userId() and Meteor.user() for user data
- Use Meteor.settings for configuration

# Example Meteor Tracker Integration
```jsx
// createTracker.js - Custom primitive for Meteor reactivity
import { createSignal, onCleanup } from "solid-js";
import { Tracker } from "meteor/tracker";

export function createTracker(reactiveFn) {
  const [state, setState] = createSignal(reactiveFn());
  
  const computation = Tracker.autorun(() => {
    setState(reactiveFn());
  });
  
  onCleanup(() => computation.stop());
  
  return state;
}

// Usage example
function PostContainer(props) {
  const posts = createTracker(() => {
    return Posts.find({}).fetch();
  });
  
  return <PostList posts={posts()} />;
}
```

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
- Use createResource with GraphQL queries
- Create custom primitives for Apollo operations
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

// Custom primitive for Apollo queries
import { createResource, createSignal } from 'solid-js';

export function createQuery(query, options = {}) {
  const [variables, setVariables] = createSignal(options.variables || {});
  
  const [resource] = createResource(variables, (vars) => {
    return apolloClient.query({
      query,
      variables: vars,
      fetchPolicy: options.fetchPolicy || 'cache-first'
    });
  });
  
  return [resource, setVariables];
}

// Custom primitive for Apollo mutations
export function createMutation(mutation) {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);
  const [data, setData] = createSignal(null);
  
  const execute = async (variables) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apolloClient.mutate({
        mutation,
        variables
      });
      setData(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return [execute, { loading, error, data }];
}

// Using Apollo in a container component
import { Show, For, createEffect } from 'solid-js';
import { gql } from '@apollo/client';
import { PostList } from '../components/PostList';
import { Loading } from '/imports/ui/components/Loading';
import { ErrorDisplay } from '/imports/ui/components/ErrorDisplay';
import { createQuery, createMutation } from '../libs/apollo';

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
  const [postsData] = createQuery(GET_POSTS);
  const [deletePost, { loading: deleteLoading }] = createMutation(DELETE_POST);
  
  const handleDelete = async (postId) => {
    try {
      await deletePost({ id: postId });
      // Refetch posts after deletion
      apolloClient.refetchQueries({ include: [GET_POSTS] });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  return (
    <Show when={!postsData.loading} fallback={<Loading />}>
      <Show when={!postsData.error} fallback={<ErrorDisplay error={postsData.error} />}>
        <PostList 
          posts={postsData()?.data?.posts || []} 
          onDelete={handleDelete} 
          isDeleting={deleteLoading()} 
        />
      </Show>
    </Show>
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
- Use the custom mounting utility from utils/solidMount
- Mount components in the FlowRouter action function
- Pass route parameters as props to components
- Use a layout component for consistent page structure
- Clean up resources when unmounting components

# Example FlowRouter Setup
```jsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "../utils/solidMount";
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
- Solid.js Documentation: https://www.solidjs.com/docs/latest/
- FlowRouter Documentation: https://github.com/zodern/flow-router-extra
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- MongoDB Documentation: https://docs.mongodb.com/
- Apollo GraphQL Documentation: https://www.apollographql.com/docs/

# Recommended Reading
- Mantra Specification: https://github.com/StorytellerCZ/mantra
- Solid.js Reactivity Guide: https://www.solidjs.com/guides/reactivity
- Meteor Guide: https://guide.meteor.com/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- MongoDB Manual: https://docs.mongodb.com/manual/
- GraphQL Documentation: https://graphql.org/learn/
- Apollo Client Documentation: https://www.apollographql.com/docs/react/api/core/ApolloClient/
```

These rules are designed to help Cursor AI assist you in developing Mantra applications with Solid.js. Adjust them as needed for your specific project requirements.
