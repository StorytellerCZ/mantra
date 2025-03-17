# A. Appendix: Prerequisite

These resources will help you understand Mantra very clearly.

## ES2024

ES2015 is the standard version of JavaScript for 2015. It's not fully implemented by all browsers or server-side environments. But, using transpilers like [babel](https://babeljs.io/), we can use E2015 today.

Note: Meteor has built-in support for ES2015

ES2015 is the best thing happen to JavaScript. It introduces a lot of features and fixes a lot of common issues.

* [ES2024 specification](https://tc39.es/ecma262/2024/)

## TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. In essence it gives you types into JavaScript. By default Meteor is not strict which allows you to easily merge JS and TS codebases and by lenient with libraries that don't have TS typings.

* [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## React

React is a UI framework based on JavaScript. Basically, you create the UI inside JavaScript. At first, **it feels weird**. But you'll find it very interesting once you learn the basics.

Just forget about what you already know about HTML for a moment, and learn React. Then rethink. Here are some resources:

* [Official website](https://react.dev/)

## Solic

Solid is a UI framework using JSX like React, but has some specific elements which merge better with Meteor patterns.

- [Official website](https://www.solidjs.com/)

## React Containers

Historically in the olden days of Mantra [react-komposer](https://github.com/kadirahq/react-komposer) was used to compose React components together and separate data and display layers.

Today we use functional components that are separated between the display and data layers to allow for easier testing.

## Meteor Basics

You need to have a better understanding of Meteor. For that, follow Meteor's [official tutorial](https://www.meteor.com/tutorials/react/creating-an-app).

Note: Mantra uses some of the above technologies a bit differently. For an example, Meteor's React tutorial suggests using a mixin to access Mongo collection data. But Mantra uses a container, which is the modern way to use React.
