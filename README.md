
# App Name: VideoFavoritesList-backend

**Author**: CoderMichelle
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

MERN - Express server to take user input from frontend and make API calls to IMDB, send formatted response back to front end, take list of favorites and store it into MongoDB/Atlas.

## Getting Started

Note: You will need an API key for the .env file from the IMDB API for your backend server.

## Architecture

This Express server waits for client requests from its own React frontend. It then reaches out to the IMDB API and reformats the data it receives from the IMDB API and serves the formatted response to its own React frontend to be displayed and styled using Bootstrap. It uses Axios for all of its request/response communications.

 After the React frontend receives the results from the user's query it displays these results using the movie poster from IMDB and a short description. It then allows the user to add their favorite movies to their own personal saved list. This selection gets communicated to this backend server, which uses the information to save the new/updated list in CRUD modality to a database. This database first uses MongoDB locally and is later updated by using a deployed version using Atlas. The frontend app will be deployed on Netlify. The backend app will be deployed on Heroku.

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

02-05-2022 4:59pm -Setting up GitHub repositories, cloning them to my local working environment, creating SSH Keys, setting up README file.  -->

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

Name of feature: Whiteboard
Estimate of time needed to complete: 15min
Start time: 9pm
Finish time: 9:30pm
Actual time needed to complete: 20min

Name of feature: Map,Long/Lat,API call
Estimate of time needed to complete: 2.5hrs
Start time: 5:30pm
Finish time: 11:00pm
Actual time needed to complete: 4.0hrs

Name of feature:
Estimate of time needed to complete:
Start time:
Finish time:
Actual time needed to complete:

![server diagram lab06](public/whiteboard.jpg)
