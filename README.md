# TurakKG Search frontend
  Turak Kg is a service for finding temporary housing
  ![Search Page Image](https://github.com/aeshevdaniyar/arenda/blob/master/public/search-results-image.example.png)

# TurakKG Calendar
  Turak Calendar is an online management system for a hotel, hostel, apartment or any other property that can be rented out.
  ![TurakKg Calendar](https://github.com/aeshevdaniyar/arenda/blob/master/public/calendar-image.example.png)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
