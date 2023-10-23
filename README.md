[Accounting Client Frontend App](https://gitlab.com/boban.mijajlovic/fronted-acc-client) <br/>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scss file compile to css

First you need to install globally sass : 

### `npm install -g sass`

If you need to compile scss files to css run script:

### `sass src/assets/index.scss`

##  Run generic tests
If backend is started, first need to wait for few moments for initialize test data from backend.

First need to set TEST flag on backend:

### `config/local.json - TEST : true`

All tests are in src/test/backend folder. The main test is Application.test.tsx.


### `npm run test`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
