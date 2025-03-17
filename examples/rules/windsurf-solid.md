# Windsurf Rules for Mantra with Solid.js

This guide provides rules and patterns for Windsurf, the world's first agentic IDE powered by Cascade. Following these rules will help Windsurf's AI understand your Mantra application structure and provide better assistance when working with Solid.js.

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
- Place Solid.js components in the `components` directory with `.jsx` or `.tsx` extension
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

## Solid.js-Specific Rules

```windsurf-rules
# Solid.js Component Rules
- Use functional components with Solid's reactive primitives
- Use TypeScript interfaces for component props
- Keep UI components pure and focused on presentation
- Use Solid's control flow components (<Show>, <For>, <Switch>, etc.)
- Use createMemo for expensive computations
- Use createEffect for side effects
- Use createSignal for reactive state

# Solid.js Reactivity Rules
- Create custom primitives for Meteor reactivity (createTracker)
- Follow Solid's fine-grained reactivity model
- Use createResource for async data fetching
- Use createStore for complex state management
- Avoid unnecessary wrapping of primitive values
- Use props.children for component composition

# Solid.js State Management Rules
- Use createSignal for local component state
- Use createStore for complex state
- Use context for shared state across components
- Use props for passing data down the component tree
- Avoid prop drilling by using context or container components

# Example Solid.js Component
```jsx
import { createSignal, Show } from 'solid-js';
import './PostItem.css';

const PostItem = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded());
  };
  
  return (
    <div class="post-item">
      <h3 class="post-title">{props.post.title}</h3>
      <div class="post-meta">
        <span>By {props.post.author}</span>
        <span>{new Date(props.post.createdAt).toLocaleDateString()}</span>
      </div>
      
      <Show
        when={isExpanded()}
        fallback={<div class="post-excerpt">{props.post.excerpt}</div>}
      >
        <div class="post-content">{props.post.content}</div>
      </Show>
      
      <div class="post-actions">
        <button onClick={toggleExpand}>
          {isExpanded() ? 'Show Less' : 'Read More'}
        </button>
        <button 
          onClick={() => props.onDelete(props.post._id)} 
          class="delete-button"
          disabled={props.isDeleting}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
```
```

## Meteor Integration with Solid.js

```windsurf-rules
# Meteor Data with Solid.js Rules
- Create a custom createTracker primitive for Meteor reactivity
- Use Meteor.call for method calls
- Use Meteor.subscribe for subscriptions
- Handle loading and error states appropriately
- Clean up subscriptions when components dispose

# Example Solid.js Container with Meteor
```jsx
import { createSignal, createEffect, onCleanup, Show } from 'solid-js';
import { Posts } from '/imports/api/posts/collection';
import PostList from '../components/PostList';
import Loading from '/imports/ui/components/Loading';

// Custom primitive for Meteor reactivity
function createTracker(reactiveFn, deps = []) {
  const [state, setState] = createSignal(reactiveFn());
  
  createEffect(() => {
    // Re-run when deps change
    deps;
    
    // Set up the tracker
    const computation = Tracker.autorun(() => {
      setState(reactiveFn());
    });
    
    // Clean up the tracker when the component is disposed
    onCleanup(() => computation.stop());
  });
  
  return state;
}

const PostListContainer = () => {
  const postsData = createTracker(() => {
    const subscription = Meteor.subscribe('posts.all');
    const isLoading = !subscription.ready();
    const posts = Posts.find({}, { sort: { createdAt: -1 } }).fetch();
    
    return { posts, isLoading };
  });
  
  const [isDeleting, setIsDeleting] = createSignal(false);
  
  const handleDelete = (postId) => {
    setIsDeleting(true);
    Meteor.call('posts.remove', postId, (error) => {
      setIsDeleting(false);
      if (error) {
        console.error('Error deleting post:', error);
      }
    });
  };
  
  return (
    <Show when={!postsData().isLoading} fallback={<Loading />}>
      <PostList 
        posts={postsData().posts} 
        onDelete={handleDelete} 
        isDeleting={isDeleting()} 
      />
    </Show>
  );
};

export default PostListContainer;
```
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

# Example MongoDB Collection and Schema
```js
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
  excerpt: {
    type: String,
    max: 200,
    optional: true,
    autoValue: function() {
      const content = this.field('content');
      if (content.isSet) {
        return content.value.substring(0, 197) + '...';
      }
    }
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
  return Posts.find({}, { 
    sort: { createdAt: -1 },
    limit: limit,
    fields: { title: 1, excerpt: 1, createdAt: 1, authorId: 1 }
  }).fetch();
};

export const getPostsByTag = (tag, limit = 10) => {
  return Posts.find(
    { tags: tag },
    { 
      sort: { createdAt: -1 },
      limit: limit,
      fields: { title: 1, excerpt: 1, createdAt: 1, authorId: 1 }
    }
  ).fetch();
};
```
```

## Apollo GraphQL Rules

```windsurf-rules
# Apollo Client Rules
- Use Apollo Client for GraphQL data fetching
- Define Apollo Client instance in a dedicated file
- Create custom primitives for Apollo Client (createQuery, createMutation)
- Implement proper error handling for GraphQL operations
- Use Apollo Cache for client-side state management

# GraphQL Schema Rules
- Define GraphQL schema in a dedicated directory
- Use type definitions for all types, queries, mutations, and subscriptions
- Implement resolvers for all fields
- Use proper error handling in resolvers
- Implement proper authentication and authorization in resolvers

# Example Apollo Client Setup with Solid.js
```jsx
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { Meteor } from 'meteor/meteor';
import { createSignal, createResource, onCleanup } from 'solid-js';

// Create the http link
const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    'meteor-login-token': Meteor._localStorage.getItem('Meteor.loginToken')
  }
});

// Create the Apollo Client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Custom primitive for Apollo queries
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
export function createMutation(mutation, options = {}) {
  const [loading, setLoading] = createSignal(false);
  
  const executeMutation = async (variables = {}) => {
    setLoading(true);
    try {
      const result = await apolloClient.mutate({
        mutation,
        variables,
        ...options
      });
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  
  return [executeMutation, { loading }];
}

// Example Container with Apollo
import { Show } from 'solid-js';
import { createQuery, createMutation, apolloClient } from '../lib/apollo';
import { gql } from '@apollo/client/core';
import PostList from '../components/PostList';
import Loading from '/imports/ui/components/Loading';
import ErrorDisplay from '/imports/ui/components/ErrorDisplay';

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

const PostListContainer = () => {
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

export default PostListContainer;
```
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

# Solid.js Mounting Rules
- Use the custom mounting utility from utils/solidMount
- Mount components in the FlowRouter action function
- Pass route parameters as props to components
- Use a layout component for consistent page structure
- Clean up resources when components dispose

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

## Windsurf-Specific Features for Solid.js

```windsurf-rules
# AI Flow Rules
- Use AI Flow to generate new Solid.js components, containers, and actions
- Provide clear instructions about the module, purpose, and requirements
- Reference existing components and patterns for consistency
- Review and refine AI-generated code before committing

# Code Explanation Rules
- Ask Windsurf to explain complex Solid.js patterns in your Mantra application
- Request explanations for Solid.js reactivity primitives and their usage
- Use the explanation feature to understand the relationship between components, containers, and actions

# Refactoring Rules
- Use Windsurf's refactoring capabilities to modernize legacy code to Solid.js
- Request refactoring of React components to Solid.js components
- Ask for help migrating from react-mounter to solidMount utility
- Use AI assistance to improve code organization and module boundaries

# Debugging Rules
- Use Windsurf to help identify issues in your Solid.js components
- Provide context about the error and the relevant components/actions
- Ask for debugging strategies specific to Solid.js reactivity and Meteor integration
- Use AI assistance to understand reactive data flow issues
```

## Example Workflows

```windsurf-rules
# Creating a New Solid.js Module
1. Define the module's purpose and responsibilities
2. Create the module directory structure (components, containers, actions, etc.)
3. Define the data model with MongoDB collections and schemas
4. Create the Solid.js UI components with proper props and types
5. Create container components with createTracker or custom primitives
6. Implement actions for business logic
7. Set up routes in FlowRouter
8. Test the module functionality

# Adding a New Solid.js Feature
1. Identify the module that should contain the feature
2. Define the data requirements and update schemas if needed
3. Create or update Solid.js UI components
4. Create or update container components with createTracker
5. Implement new actions for business logic
6. Update routes if needed
7. Test the new feature

# Debugging Solid.js Reactive Data Issues
1. Identify the component with reactive data issues
2. Check the createTracker or custom primitive implementation
3. Verify that subscriptions are properly set up and ready
4. Check for proper cleanup when components dispose
5. Use Solid.js debugging tools to inspect component state
6. Test with simplified data to isolate the issue
```

## References and Resources

```windsurf-rules
# Official Documentation
- Meteor Documentation: https://docs.meteor.com/
- Solid.js Documentation: https://www.solidjs.com/docs/latest/
- FlowRouter Documentation: https://github.com/zodern/flow-router-extra
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- MongoDB Documentation: https://docs.mongodb.com/
- Apollo GraphQL Documentation: https://www.apollographql.com/docs/
- Windsurf Documentation: https://windsurf.io/docs

# Mantra Resources
- Mantra Specification: https://github.com/StorytellerCZ/mantra
- Mantra Examples: https://github.com/StorytellerCZ/mantra/examples
- Custom Mounters: https://github.com/StorytellerCZ/mantra/examples/mounters
```

These rules are designed to help Windsurf's AI understand and assist with your Mantra application development using Solid.js. Adjust them as needed for your specific project requirements.
