# topspeed-frontend
 A web app that allows car enthusiasts to easily find information about their favorite cars (front-end)

## Backend Repository
This is just the repo for the frontend. Check out the backend repo here: https://github.com/Jzweifel15/topspeed-backend.git 

## Description
Topspeed is a single-page web application that allows a user to search for their favorite cars and by adding each car to their "garage," a user can see specific information on that car, like a picture, a description, the msrp, and the top speed.

## Technologies Used
Topspeed was built using standard front-end web technologies, like HTML5, CSS3, and JavaScript ES6, while using Ruby on Rails as a back-end API that was formatted into JSON.

## Full CRUD
JavaScript's `fetch()` method was the backbone for creating a smooth single-page application that does not require a refresh when a user updates their garage by adding a new car or deleting a car from their garage. `fetch()` allows JavaScript to make calls to the server and pull the appropriate information from the back-end API. Then, the DOM can be properly manipulated to create a new "car card," that is added to the driver's garage or a "car card," can be deleted from the driver's garage.