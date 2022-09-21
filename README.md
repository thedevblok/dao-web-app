# dao-web-app
standardized dao dapp with voting/staking contracts

Change Contracts name and address,
Change ABI bytecode
Change statistics name


    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
    
    
    
    

Commands and deployment
Nuxt comes with a set of useful commands, both for development and production purpose.

Using in package.json
You should have these commands in your package.json:

"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}

You can launch your commands via yarn <command> or npm run <command> (example: yarn dev / npm run dev).

Development Environment
To launch Nuxt in development mode with hot module replacement on http://localhost:3000:

YarnNPM
Yarn
yarn dev

List of Commands
You can run different commands depending on the target :

target: server (default value)
nuxt dev - Launch the development server.
nuxt build - Build and optimize your application with webpack for production.
nuxt start - Start the production server (after running nuxt build). Use it for Node.js hosting like Heroku, Digital Ocean, etc.
target: static
nuxt dev - Launch the development server.
nuxt generate - Build the application (if needed), generate every route as a HTML file and statically export to dist/ directory (used for static hosting).
nuxt start - serve the dist/ directory like your static hosting would do (Netlify, Vercel, Surge, etc), great for testing before deploying.
Webpack Config Inspection
You can inspect the webpack config used by Nuxt to build the project (similar to vue inspect ).

nuxt webpack query...
Arguments:

--name: Bundle name to inspect. (client, server, modern)
--dev: Inspect webpack config for dev mode
--depth: Inspection depth. Defaults to 2 to prevent verbose output.
--no-colors: Disable ANSI colors (disabled by default when TTY is not available or when piping to a file)
Examples:

nuxt webpack
nuxt webpack devtool
nuxt webpack resolve alias
nuxt webpack module rules
nuxt webpack module rules test=.jsx
nuxt webpack module rules test=.pug oneOf use.0=raw
nuxt webpack plugins constructor.name=WebpackBar options reporter
nuxt webpack module rules loader=vue-
nuxt webpack module rules "loader=.*-loader"
Production Deployment
Nuxt lets you choose between Server or Static deployments.

Server Deployment
To deploy a SSR application we use target: 'server', where server is the default value.

YarnNPM
Yarn
yarn build

Nuxt will create a .nuxt directory with everything inside ready to be deployed on your server hosting.

We recommend putting .nuxt in .npmignore or .gitignore.
Once your application is built you can use the start command to see a production version of your application.

YarnNPM
Yarn
yarn start

Static Deployment (Pre-rendered)
Nuxt gives you the ability to host your web application on any static hosting.

To deploy a static generated site make sure you have target: 'static' in your nuxt.config.js (for Nuxt >= 2.13):

nuxt.config.js
export default {
  target: 'static'
}

YarnNPM
Yarn
yarn generate

Nuxt will create a dist/ directory with everything inside ready to be deployed on a static hosting service.

As of Nuxt v2.13 there is a crawler installed that will now crawl your link tags and generate your routes when using the command nuxt generate based on those links.

Warning: Dynamic routes are ignored by the generate command when using Nuxt <= v2.12: API Configuration generate
When generating your web application with nuxt generate, the context given to asyncData and fetch will not have req and res.
Fail on Error
To return a non-zero status code when a page error is encountered and let the CI/CD fail the deployment or build, you can use the --fail-on-error argument.

YarnNPM
Yarn
yarn generate --fail-on-error
