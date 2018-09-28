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
@import "~@project/theme/src/theme.less"
```

## Developing the theme

The theme is composed of two files, index.js and theme.less.

### Index.js

Are the antd variables which will be set by the theme. You can find an example of available variables [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) and additionally the default variables for ls-ui-kit are [here](https://github.com/liquid-state/ls-ui-kit/blob/master/src/variables.less)

### Theme.less

This file sets various styles which are not available in ant variables, includes the typography etc.

### Additional files

You can add additional less and asset files (fonts, background images, etc.) as long as they are imported correctly in theme.less.
