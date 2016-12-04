a Web App and RESTful API Server Using the MEAN Stack:
MongoDB, Express, AngularJS, and Node.js

It's based on a tutorial on [heroku](http://heroku.com):
[Create a Web App and RESTful API Server Using the MEAN Stack](https://github.com/facebook/react/wiki/Sites-Using-React)
And currently the only difference is using **mongoose** for database modeling and interactions.

The MEAN stack is a popular web development stack made up of MongoDB, Express, AngularJS, and Node.js. MEAN has gained popularity because it allows developers to program in JavaScript on both the client and the server. The MEAN stack enables a perfect harmony of JavaScript Object Notation (JSON) development: MongoDB stores data in a JSON-like format, Express and Node.js facilitate easy JSON query creation, and AngularJS allows the client to seamlessly send and receive JSON documents.

MEAN is generally used to create browser-based web applications because AngularJS (client-side) and Express (server-side) are both frameworks for web apps. Another compelling use case for MEAN is the development of RESTful API servers. Creating RESTful API servers has become an increasingly important and common development task, as applications increasingly need to gracefully support a variety of end-user devices, such as mobile phones and tablets. This tutorial will demonstrate how to use the MEAN stack to rapidly create a RESTful API server.
AngularJS, a client-side framework, is not a necessary component for creating an API server. You could also write an Android or iOS application that runs on top of the REST API. We include AngularJS in this tutorial to demonstrate how it allows us to quickly create a web application that runs on top of the API server.

The application we will develop in this tutorial is a basic contact management application that supports standard CRUD (Create, Read, Update, Delete) operations. First, we’ll create a RESTful API server to act as an interface for querying and persisting data in a MongoDB database. Then, we’ll leverage the API server to build an Angular-based web application that provides an interface for end users.
So that we can focus on illustrating the fundamental structure of a MEAN application, we will deliberately omit common functionality such as authentication, access control, and robust data validation.