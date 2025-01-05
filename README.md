# UX/UI Prototype

1. Clone the repo
2. CD into new directory and run 
    $ yarn install



# Dev Notes

You'll need to run the UI and Node server in separate terminal windows. 
The Node server only supplies the dashboard data currently. 

1. Run the React app at localhost:3000
    $ npm run dev 

2. From the root, run the server locally for API testing at localhost:3100
    $ node server


# Heroku Notes

Helpful for understanding how to deploy a React app, using Node.js, to Heroku
https://dev.to/mrcflorian/how-to-deploy-a-react-app-to-heroku-44ig

NOTE: Run the following command before pushing changes to the repo. 
This will confirm that the Heroku build will be successful.

$ npm run build




