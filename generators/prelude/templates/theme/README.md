# Project Theme

This is the theme package for your project. It contains the overrides to antd and @liquid-state/ui-kit variables. You should customise index.js and theme.less to suit your project.

## Using the theme

If you create new IWAs using the generator, the theme will be installed and linked automatically. However if you need to manually add the theme to a new IWA you can follow the instructions below:

run `lerna add --scope my-new-iwa-name @project/theme`

add the following to your package.json

```json
"theme": "@project/theme",
```

and to your index.less file

```less
@import "~@project/theme/src/theme.less";
```

## Developing the theme

Customising a theme should in most cases come down to re-defining variables. You can also add additional LESS code and customise fonts etc.

### variables.less

You can find an example of available variables [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) and additionally the default variables for ls-ui-kit are [here](https://github.com/liquid-state/ls-ui-kit/blob/master/packages/ui-kit/src/variables.less)

You can use LESS code to re-define variables in the variables.less file.

### theme.less

This file includes variables.less and sets various styles which are not available in ant variables, includes the typography etc.

### index.js

Can be used to override theme variables which are normally set in less files. This is run at build time, giving you the flexibility to define theme variables based on JS code (to for example use environment variables etc.)

In most cases it is fine to leave this file as-is and code all theme changes in LESS.

### Additional files

You can add additional less and asset files (fonts, background images, etc.) as long as they are imported correctly in theme.less.
