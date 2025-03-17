# Windsurf Rules for Mantra with React

This guide provides rules and patterns for Windsurf, the world's first agentic IDE powered by Cascade. Following these rules will help Windsurf's AI understand your Mantra application structure and provide better assistance when working with React.

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
- Place React components in the `components` directory with `.jsx` or `.tsx` extension
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

## React-Specific Rules

```windsurf-rules
# React Component Rules
- Use functional components with hooks
- Use TypeScript interfaces for component props
- Keep UI components pure and focused on presentation
- Use React.memo for performance optimization when appropriate
- Use useCallback and useMemo for expensive operations
- Use useEffect for side effects
- Use useRef for DOM references and persisting values between renders

# React Hooks Rules
- Use the useTracker hook from meteor/react-meteor-data for reactive data
- Follow the rules of hooks (only call hooks at the top level, only call hooks from React functions)
- Create custom hooks for reusable logic
- Prefix custom hooks with "use"
- Keep hooks focused on a single responsibility

# React State Management Rules
- Use useState for local component state
- Use useReducer for complex state logic
- Use context for shared state across components
- Use props for passing data down the component tree
- Avoid prop drilling by using context or container components

# Example React Component
```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostItem.css';

const PostItem = ({ post, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="post-item">
      <h3 className="post-title">{post.title}</h3>
      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      {isExpanded ? (
        <div className="post-content">{post.content}</div>
      ) : (
        <div className="post-excerpt">{post.excerpt}</div>
      )}
      
      <div className="post-actions">
        <button onClick={toggleExpand}>
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
        <button onClick={() => onDelete(post._id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PostItem;
```
```

## Meteor Integration with React

```windsurf-rules
# Meteor Data with React Rules
- Use the useTracker hook from meteor/react-meteor-data for reactive data
- Use Meteor.call for method calls
- Use Meteor.subscribe for subscriptions
- Handle loading and error states appropriately
- Clean up subscriptions when components unmount

# Example React Container with Meteor
```jsx
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Posts } from '/imports/api/posts/collection';
import PostList from '../components/PostList';
import Loading from '/imports/ui/components/Loading';

const PostListContainer = () => {
  const { posts, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('posts.all');
    const isLoading = !subscription.ready();
    const posts = Posts.find({}, { sort: { createdAt: -1 } }).fetch();
    
    return { posts, isLoading };
  }, []);
  
  const handleDelete = (postId) => {
    Meteor.call('posts.remove', postId, (error) => {
      if (error) {
        console.error('Error deleting post:', error);
      }
    });
  };
  
  if (isLoading) {
    return <Loading />;
  }
  
  return <PostList posts={posts} onDelete={handleDelete} />;
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
- Use Apollo React hooks (useQuery, useMutation, useSubscription)
- Implement proper error handling for GraphQL operations
- Use Apollo Cache for client-side state management

# GraphQL Schema Rules
- Define GraphQL schema in a dedicated directory
- Use type definitions for all types, queries, mutations, and subscriptions
- Implement resolvers for all fields
- Use proper error handling in resolvers
- Implement proper authentication and authorization in resolvers

# Example Apollo Client Setup
```jsx
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Meteor } from 'meteor/meteor';

// Create the http link
const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    'meteor-login-token': Meteor._localStorage.getItem('Meteor.loginToken')
  }
});

// Create the Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Apollo Provider Component
export const ApolloWrapper = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

// Example Container with Apollo
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
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
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST);
  
  const handleDelete = async (postId) => {
    try {
      await deletePost({ 
        variables: { id: postId },
        refetchQueries: [{ query: GET_POSTS }]
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <PostList 
      posts={data?.posts || []} 
      onDelete={handleDelete} 
      isDeleting={deleteLoading} 
    />
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

# React Mounting Rules
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

## Windsurf-Specific Features for React

```windsurf-rules
# AI Flow Rules
- Use AI Flow to generate new React components, containers, and actions
- Provide clear instructions about the module, purpose, and requirements
- Reference existing components and patterns for consistency
- Review and refine AI-generated code before committing

# Code Explanation Rules
- Ask Windsurf to explain complex React patterns in your Mantra application
- Request explanations for React hooks and their usage
- Use the explanation feature to understand the relationship between components, containers, and actions

# Refactoring Rules
- Use Windsurf's refactoring capabilities to modernize legacy React code
- Request refactoring of class components to functional components with hooks
- Ask for help migrating from react-mounter to custom mounting utilities
- Use AI assistance to improve code organization and module boundaries

# Debugging Rules
- Use Windsurf to help identify issues in your React components
- Provide context about the error and the relevant components/actions
- Ask for debugging strategies specific to React hooks and Meteor reactivity
- Use AI assistance to understand reactive data flow issues
```

## Example Workflows

```windsurf-rules
# Creating a New React Module
1. Define the module's purpose and responsibilities
2. Create the module directory structure (components, containers, actions, etc.)
3. Define the data model with MongoDB collections and schemas
4. Create the React UI components with proper props and types
5. Create container components to connect with Meteor data using useTracker
6. Implement actions for business logic
7. Set up routes in FlowRouter
8. Test the module functionality

# Adding a New React Feature
1. Identify the module that should contain the feature
2. Define the data requirements and update schemas if needed
3. Create or update React UI components
4. Create or update container components with useTracker
5. Implement new actions for business logic
6. Update routes if needed
7. Test the new feature

# Debugging React Reactive Data Issues
1. Identify the component with reactive data issues
2. Check the useTracker hook dependencies
3. Verify that subscriptions are properly set up and ready
4. Check for proper cleanup when components unmount
5. Use React DevTools to inspect component state and props
6. Test with simplified data to isolate the issue
```

## References and Resources

```windsurf-rules
# Official Documentation
- Meteor Documentation: https://docs.meteor.com/
- React Documentation: https://react.dev/
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

These rules are designed to help Windsurf's AI understand and assist with your Mantra application development using React. Adjust them as needed for your specific project requirements.
