# generator-ls-iwa [![NPM version][npm-image]][npm-url]
> A Yeoman generator for creating Liquid State Integrated Web Apps (IWAs)

This generator creates a mono repo structure for your whole IWA project, as well as providing a subgenerator to create the individual IWAs.

## Installation

This project uses a monorepo and yarn workspaces, you will need to have yarn installed before continuing.

First, install [Yeoman](http://yeoman.io) and generator-ls-iwa using [yarn](https://yarnpkg.com/en/docs/install) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
yarn global add yo generator-ls-iwa
```

Then generate your new project:

```bash
yo ls-iwa
```

This will create the basic structure, as well as creating packages for common components and theme. You can now add as many IWAs to the project as you need.

To generate a new IWA you once again use the generator but this time accessing the `iwa` subgenerator.

```bash
yo ls-iwa:iwa
```

This will ask you a couple of quick questions before generating your new IWA, linking it to the theme and common packages, and adding it to the project storybook.

## License

MIT © [Liquid State]()


[npm-image]: https://badge.fury.io/js/generator-ls-iwa.svg
[npm-url]: https://npmjs.org/package/generator-ls-iwa
