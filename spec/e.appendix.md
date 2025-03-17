# Appendix E: Migrating from Original Mantra

This appendix provides guidance for migrating from the original Mantra specification to the modern Mantra approach. The primary focus is on eliminating the Application Context pattern and adopting modern JavaScript and React/Solid practices.

## Eliminating Application Context

The original Mantra specification relied heavily on a global Application Context object that was passed through the component tree. Modern JavaScript and React/Solid practices make this approach unnecessary and cumbersome.

### Why Eliminate Application Context?

1. **Modern Import System**: ES modules allow for clean, direct imports of dependencies
2. **React Hooks and Context API**: Provide better ways to manage state and share functionality
3. **Testability**: Modern testing libraries make it easier to mock imports directly
4. **Code Clarity**: Direct dependencies are more explicit and easier to understand

### Migration Steps

#### 1. Replace Context-Based Actions with Direct Imports

**Original Approach**:
```js
// actions/posts.js
export default {
  create: ({ Meteor, Collections, FlowRouter }) => (title, content) => {
    // Use context dependencies
    const id = Meteor.callAsync('posts.create', title, content);
    FlowRouter.go(`/post/${id}`);
  }
};

// Using the action
const { actions } = context;
actions.posts.create('Title', 'Content');
```

**Modern Approach**:
```ts
// actions/posts.ts
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

export const createPost = async (title: string, content: string) => {
  return await Meteor.callAsync('posts.create', title, content);
};

// In component
import { createPost } from '../actions/posts';
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (title, content) => {
    const id = await createPost(title, content);
    navigate(`/post/${id}`);
  };
  
  // ...
};
```

#### 2. Replace Context-Based Data Access with Hooks

**Original Approach**:
```js
// containers/postList.js
export default function PostList({ context }) {
  const { Meteor, Collections } = context;
  const subscription = Meteor.subscribe('posts');
  const posts = Collections.Posts.find().fetch();
  // ...
}
```

**Modern Approach**:
```tsx
// containers/PostListContainer.tsx
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/collections/posts';

export const PostListContainer = () => {
  const isLoading = useSubscribe('posts');
  const posts = useFind(() => PostsCollection.find());
  // ...
};
```

#### 3. Modernize FlowRouter Usage

**Original Approach**:
```js
// routes.js
export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });
}
```

**Modern Approach**:
```tsx
// routes.tsx
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { mount } from "../utils/reactMount"; // For React
// import { mount } from "../utils/solidMount"; // For Solid
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

See [Appendix F: Modern Component Mounting](f.appendix.md) for details on implementing the custom mounting utilities.

Note that we no longer need to use `injectDeps` since we're not using the Application Context. We directly import and use the components instead.

## Handling Non-Importable Dependencies

Some dependencies can't be directly imported and still require some form of injection. For these cases, use React Context or minimal dependency injection:

```tsx
// contexts/NavigationContext.tsx
import { createContext, useContext } from 'react';

export const NavigationContext = createContext(null);

export const useNavigation = () => useContext(NavigationContext);

// App.tsx
import { NavigationContext } from './contexts/NavigationContext';
import { useNavigate } from 'react-router-dom';

export const App = () => {
  const navigate = useNavigate();
  
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {/* App content */}
    </NavigationContext.Provider>
  );
};
```

## Testing Without Application Context

Modern testing approaches make it easier to test components and actions without a global context:

```tsx
// Testing actions with mocked imports
import { createPost } from '../actions/posts';
import { Meteor } from 'meteor/meteor';

jest.mock('meteor/meteor', () => ({
  Meteor: {
    callAsync: jest.fn()
  }
}));

describe('createPost', () => {
  it('calls the correct Meteor method', async () => {
    Meteor.callAsync.mockResolvedValue('post-id');
    const result = await createPost('Title', 'Content');
    expect(Meteor.callAsync).toHaveBeenCalledWith('posts.create', 'Title', 'Content');
    expect(result).toBe('post-id');
  });
});

// Testing components with mocked hooks
import { render, screen } from '@testing-library/react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { PostListContainer } from '../containers/PostListContainer';

jest.mock('meteor/react-meteor-data', () => ({
  useSubscribe: jest.fn(),
  useFind: jest.fn()
}));

describe('PostListContainer', () => {
  it('renders posts when loaded', () => {
    useSubscribe.mockReturnValue(false); // Not loading
    useFind.mockReturnValue([{ _id: '1', title: 'Test Post' }]);
    
    render(<PostListContainer />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
});
```

## Additional Migration Considerations

### 1. Module Structure

The module structure remains largely the same, but with modern file extensions and TypeScript support:

```
/client/modules/core/
  /actions/
    posts.ts
  /components/
    PostList.tsx
    PostItem.tsx
  /containers/
    PostListContainer.tsx
  /routes.tsx
```

### 2. State Management

Modern Mantra applications can use a combination of:

- React/Solid component state for UI-specific state
- Meteor reactive data for real-time data
- Apollo Client for GraphQL data
- React Context for shared application state

### 3. TypeScript Integration

Modern Mantra strongly encourages the use of TypeScript for better type safety and developer experience:

- Define interfaces for your data models
- Use type annotations for function parameters and return values
- Leverage TypeScript's type inference where possible

### TODO: Additional Migration Topics

- Detailed migration path for complex applications with deep context usage
- Strategies for migrating custom context providers
- Performance optimization techniques for the new architecture
- Integration with other modern tools like React Query, SWR, etc.
