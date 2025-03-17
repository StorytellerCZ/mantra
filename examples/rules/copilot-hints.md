# GitHub Copilot Hints for Mantra

This document provides hints and patterns for GitHub Copilot to help you develop Mantra applications. While Copilot doesn't have a formal rules system like Cursor, you can use these hints by keeping this file open in your editor or by copying relevant sections into your code comments.

## General Mantra Architecture Hints

```
/*
 * Mantra Architecture Guidelines:
 * - Organize code into modules with clear boundaries
 * - Each module has: components, containers, actions, configs, libs
 * - UI components should be pure and focused on presentation
 * - Containers connect UI components with data and actions
 * - Actions contain business logic and data manipulation
 * - Use FlowRouter for routing with custom mounting utilities
 * - Follow single responsibility principle
 */
```

## React-Specific Hints

```jsx
/*
 * React Component Guidelines:
 * - Use functional components with hooks
 * - Keep UI components pure and focused on presentation
 * - Use containers for data fetching and state management
 * - Use custom hooks for reusable logic
 * - Example component structure:
 */

import React from 'react';
import './styles.css';

// Pure UI component
export const PostList = ({ posts, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <div className="empty-state">No posts found</div>;
  }
  
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => onDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

/*
 * Container Component Guidelines:
 * - Connect UI components with data and actions
 * - Handle data fetching and state management
 * - Pass data and callbacks to UI components
 * - Example container structure:
 */

import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PostList } from '../components/PostList';
import { PostsCollection } from '/imports/api/collections/posts';
import { deletePost } from '../actions/posts';

export const PostListContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use Meteor's reactive data system
  const { posts, isLoading: dataLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('posts.all');
    const posts = PostsCollection.find({}).fetch();
    return {
      posts,
      isLoading: !subscription.ready()
    };
  }, []);
  
  useEffect(() => {
    setIsLoading(dataLoading);
  }, [dataLoading]);
  
  const handleDelete = (postId) => {
    deletePost(postId);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return <PostList posts={posts} onDelete={handleDelete} />;
};

/*
 * Actions Guidelines:
 * - Contain business logic
 * - Handle API calls and data manipulation
 * - Return promises for async operations
 * - Example action structure:
 */

import { PostsCollection } from '/imports/api/collections/posts';

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    Meteor.call('posts.delete', postId, (error, result) => {
      if (error) {
        console.error('Error deleting post:', error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/*
 * Routing Guidelines:
 * - Use FlowRouter for routing
 * - Use custom mounting utilities
 * - Example routing structure:
 */

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from '../utils/reactMount';
import MainLayout from '../layouts/MainLayout';
import PostListContainer from '../containers/PostListContainer';
import PostViewContainer from '../containers/PostViewContainer';

FlowRouter.route('/', {
  name: 'posts.list',
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});

FlowRouter.route('/post/:id', {
  name: 'posts.view',
  action(params) {
    mount(MainLayout, {
      content: <PostViewContainer id={params.id} />
    });
  }
});

/*
 * MongoDB Guidelines:
 * - Define collections with SimpleSchema for validation
 * - Use MongoDB query operators for efficient queries
 * - Use indexes for frequently queried fields
 * - Example MongoDB collection and schema:
 */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

// Define schema for validation
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

// Example MongoDB queries
export const getRecentPosts = (limit = 10) => {
  return Posts.find(
    {}, // query
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

/*
 * Apollo GraphQL Guidelines:
 * - Use Apollo Client for GraphQL data fetching
 * - Define Apollo Client instance in a dedicated file
 * - Use useQuery, useMutation, and useSubscription hooks
 * - Example Apollo Client setup and usage:
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider, useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// Apollo Client setup
const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    'meteor-login-token': Meteor._localStorage.getItem('Meteor.loginToken')
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Apollo Provider component
export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

// Example GraphQL queries and mutations
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

// Example container using Apollo Client
export const PostListContainer = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const handleDelete = (postId) => {
    deletePost({ variables: { id: postId } });
  };
  
  return <PostList posts={data.posts} onDelete={handleDelete} />;
};
```

## Solid.js-Specific Hints

```jsx
/*
 * Solid.js Component Guidelines:
 * - Use functional components with Solid's reactive primitives
 * - Keep UI components pure and focused on presentation
 * - Use containers for data fetching and state management
 * - Use custom primitives for reusable logic
 * - Example component structure:
 */

import { For, Show } from 'solid-js';
import './styles.css';

// Pure UI component
export const PostList = (props) => {
  return (
    <div class="post-list">
      <Show when={props.posts.length > 0} fallback={<div class="empty-state">No posts found</div>}>
        <For each={props.posts}>
          {post => (
            <div class="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => props.onDelete(post._id)}>Delete</button>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

/*
 * Container Component Guidelines:
 * - Connect UI components with data and actions
 * - Handle data fetching and state management
 * - Pass data and callbacks to UI components
 * - Example container structure:
 */

import { createSignal, createEffect } from 'solid-js';
import { PostList } from '../components/PostList';
import { createTracker } from '../libs/createTracker';
import { PostsCollection } from '/imports/api/collections/posts';
import { deletePost } from '../actions/posts';

export const PostListContainer = () => {
  const [isLoading, setIsLoading] = createSignal(true);
  
  // Use custom primitive for Meteor's reactive data
  const posts = createTracker(() => {
    const subscription = Meteor.subscribe('posts.all');
    setIsLoading(!subscription.ready());
    return PostsCollection.find({}).fetch();
  });
  
  const handleDelete = (postId) => {
    deletePost(postId);
  };
  
  return (
    <Show when={!isLoading()} fallback={<div>Loading...</div>}>
      <PostList posts={posts()} onDelete={handleDelete} />
    </Show>
  );
};

/*
 * Actions Guidelines:
 * - Contain business logic
 * - Handle API calls and data manipulation
 * - Return promises for async operations
 * - Example action structure:
 */

import { PostsCollection } from '/imports/api/collections/posts';

export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    Meteor.call('posts.delete', postId, (error, result) => {
      if (error) {
        console.error('Error deleting post:', error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/*
 * Routing Guidelines:
 * - Use FlowRouter for routing
 * - Use custom mounting utilities
 * - Example routing structure:
 */

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from '../utils/solidMount';
import MainLayout from '../layouts/MainLayout';
import PostListContainer from '../containers/PostListContainer';
import PostViewContainer from '../containers/PostViewContainer';

FlowRouter.route('/', {
  name: 'posts.list',
  action() {
    mount(MainLayout, {
      content: <PostListContainer />
    });
  }
});

FlowRouter.route('/post/:id', {
  name: 'posts.view',
  action(params) {
    mount(MainLayout, {
      content: <PostViewContainer id={params.id} />
    });
  }
});

/*
 * MongoDB Guidelines:
 * - Define collections with SimpleSchema for validation
 * - Use MongoDB query operators for efficient queries
 * - Use indexes for frequently queried fields
 * - Example MongoDB collection and schema:
 */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

// Define schema for validation
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

// Example MongoDB queries
export const getRecentPosts = (limit = 10) => {
  return Posts.find(
    {}, // query
    { 
      sort: { createdAt: -1 },
      limit,
      fields: { content: 0 } // exclude content for performance
    }
  ).fetch();
};

/*
 * Apollo GraphQL Guidelines:
 * - Use Apollo Client for GraphQL data fetching
 * - Create custom primitives for Apollo operations
 * - Use createResource with GraphQL queries
 * - Example Apollo Client setup and usage:
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client';
import { createResource, createSignal } from 'solid-js';

// Apollo Client setup
const httpLink = new HttpLink({
  uri: '/graphql',
  headers: {
    'meteor-login-token': Meteor._localStorage.getItem('Meteor.loginToken')
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Custom primitive for Apollo queries
export function createQuery(query, options = {}) {
  const [variables, setVariables] = createSignal(options.variables || {});
  
  const [resource] = createResource(variables, (vars) => {
    return client.query({
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
      const result = await client.mutate({
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

// Example container using Apollo Client
export const PostListContainer = () => {
  const [postsData] = createQuery(GET_POSTS);
  const [deletePost, { loading: deleteLoading }] = createMutation(DELETE_POST);
  
  return (
    <Show when={!postsData.loading} fallback={<div>Loading...</div>}>
      <Show when={!postsData.error} fallback={<div>Error: {postsData.error?.message}</div>}>
        <PostList 
          posts={postsData()?.data?.posts || []} 
          onDelete={(id) => deletePost({ id })} 
          isDeleting={deleteLoading()} 
        />
      </Show>
    </Show>
  );
};
```

## Using These Hints

To use these hints effectively with GitHub Copilot:

1. Keep this file open in a split view while working on your Mantra project
2. Copy relevant sections into your code as comments when starting new files
3. Use the examples as templates for your own components, containers, and actions
4. Reference the patterns and guidelines when asking Copilot to generate code

For example, you might start a new component file with:

```jsx
/*
 * Mantra UI Component Guidelines:
 * - Keep UI components pure and focused on presentation
 * - Accept data and callbacks as props
 * - Use TypeScript interfaces or PropTypes for props
 * - Avoid business logic in UI components
 */

// Now let's create a UserProfile component that displays user information
```

Then let Copilot generate the component based on these hints.
