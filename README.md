# Lean Sheets

A tool to pull data from eletronic tracking from datasources, such as JIRA, to analyize team performace, track projects, manage risks, and project completion times.

## Dependencies
Date-fns package is v2 is in alpha but has the number of business days between dates where as v1.x does not have this functionality.  v2 is also a modular design so only the functions used get included into your build.  

https://date-fns.org/ 

v1 version changelog https://git.io/fxCWb 

v2 version changelog https://gist.github.com/kossnocorp/a307a464760b405bb78ef5020a4ab136

## Supported Browsers
Use [Browserl.ist](https://browserl.ist/) to run the filter from the `package.json`.

* [Supported browsers and how to change the list](https://facebook.github.io/create-react-app/docs/supported-browsers-features)

> When editing the browerslist config, you may notice that your changes don't get picked up right away. This is due to an issue in `babel-loader` not detecting the change in your `package.json`. An easy solution is to delete the `node_modules/.cache` folder and try again.

## Environment variables

In the root folder there are `.env.<environment>` files.  Each has it configured for each environment.  See the below links for some instructions and documentation.

Since this project was created with the [`create-reat-app`](https://github.com/facebook/create-react-app) cli below is some documentation about environment variables and their usage.
.

* [Create-react-app environments](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d)
* [What other .env files can I use?](https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use)
* [Adding custom environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)

### Testing with environment variables

For testing code that has different code paths for different environments read the below link and implement the solution.  This test shows how to do it correctly in VSCode since the debugger loads the `.env.development` file.

See the `logger.test.js` for an example implementation of the link below.

https://stackoverflow.com/questions/48033841/test-process-env-with-jest/48042799

## VSCode testing setup

In the `.vscode` there is a `launch.json` that holds the configuration for the debugging of unit tests.

* [VSCode debugging - launch configurations](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
  * Has information on how to debug with Debugger for Chrome
* [How to debug Jest tests with VSCode](https://medium.com/@mattmazzola/how-to-debug-jest-tests-with-vscode-48f003c7cb41)







## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
