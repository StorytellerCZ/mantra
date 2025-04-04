# B. Appendix: Server-Side Directory Layout

This is a directory layout for the server side part of your app. This is **not** a core part of Mantra, but it follows the directory layout we used for the client side of our app.

On the server side, we have four main directories and a JavaScript file called `main.ts`.

```
* methods
* resolvers
* publications
* libs
* configs
* main.ts
```

Let's see what each of these directories and files does.

## methods

This is the directory where we can put methods in your app. This is how the files in this directory look like:

```
* posts.ts
* index.ts
* tests
  - posts.ts
```

Here we have a file called `posts.ts` which has methods for the feature `posts` in our app. Depending your app, we can have different files.

Inside this JavaScript file, we have a default export which is a function. Meteor methods are defined inside that function.

When naming methods inside the `posts.ts`, always prefix the method name. That prefix is the name of the file with a dot (.).

In our case, the prefix is `posts.`

For an example, here are some methods inside `posts.ts`:

```ts
import {Posts, Comments} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'posts.create'(title: string, content: string) {
      //  method body
    },
    'posts.createComment'(postId: string, text: string) {
      //  method body
    }
});
```

Finally, there is a file called `index.ts` which imports all other modules in this directory and invokes them in a default export. So, when importing methods, we can do it with a single import.

Here's a sample `index.ts` file:

```ts
import './posts';
import './admin';
```

### Tests

We can write tests for methods inside the tests directory. For that, it's a better to do integration testing rather doing unit tests.

For that, you can use [Gagarin](https://github.com/anticoders/gagarin).

## publications

This directory is identical to the `methods` directory, but we write publications instead of methods.

## libs

This directory contains utility functions which we can use inside the server.

## configs

This is the place where we can write configurations in our app. These configuration files should have a default export function which can be imported and invoked. Configuration code should stay inside that function.

Here's an example configuration:

```ts
export default function() {
  //  invoke the configuration here
}
```

## main.ts

This is the place where we can start as the entry point for our app. We'll import methods, publications and configuration inside this file and invoke.

Here's an example `main.ts` file:

```ts
import './publications';
import './methods';
import './configs/apollo';
import addInitialData from './configs/initial_adds';

addInitialData();
```

> NOTE: Have a look at this [sample app](https://github.com/mantrajs/mantra-sample-blog-app/tree/master/server) to see how it has implemented these guidelines.

## resolvers

Folder to maintain all the resolvers for GraphQL implementation if you use it.
