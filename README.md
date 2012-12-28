This tutorial will teach you the basics of building a nodejs MVC Web application 
using nodejs and expressjs. 

Before you start, make sure you've installed the prerequisites listed below. 

    1. nodejs --> install nodejs http://nodejs.org
    2. expressjs --> npm install express
    3. handlebars view engine. --> npm  install hbs
    4. less --> npm install less-middleware
    
After we install all the prerequistes we run the express command to scaffold the 
application:

    $express --sessions --css less
<p>    
This creates the file/folder structure for our app
The default view engine which is installed with expressjs is jade so we need to 
change the view engine to hbs this we do be editting the app.js file and change 
</p>
    app.set('view engine', 'jade');"    
        to
    app.set('view engine', 'hbs');"
<p>    
    We now run the application and point the browser to the server url and what do 
    we get:  We get a 500 Error: Failed to lookup view "index". So the index view is 
    missing.  Lets look under the views folder and see whats the problem.
</p>
<p>
    We do have an index view but it has a "jade" extension. Of course this was the 
    work of the expressjs scaffolding.  Let's change the extension to hbs to look 
    like "index.hbs".  We must also change the contents of the file to hbs syntax.
    If we want to use a layout/master page we can add a layout.hbs to the views 
    folder or just rename the layout.jade to layout.hbs and change the syntax.
</p>
<h3>What You'll Build</h3>

<p>
    You'll implement a simple movie-listing application that supports creating, 
    editing, and listing movies from a database. Below are two screenshots of the 
    application you’ll build. It includes a page that displays a list of movies 
    from a database: 
</p>

<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/MovieList.png" />
</p>

<p>
    The application also lets you add, edit, and delete movies, as well as see 
    details about individual ones. All data-entry scenarios include validation to 
    ensure that the data stored in the database is correct.
</p>

<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/Details.png" />
</p>

<h3>Skills you will learn</h3>

<p>
    Here's what you'll learn:

    <ul>
        <li>How to create a new express project.</li>
        <li>How to create routes and views.</li>
        <li>How to create a new database using the MongoDB and Mongoose.</li>
        <li>How to retrieve and display data.</li>
        <li>How to edit data and enable data validation.</li>
    </ul>
</p>

<h3>Creating Your First Application</h3>
<p>
    Our application will be an express based application. <a href="http://expressjs.com" target="_blank">Express</a> 
    is a MVC web application framework for <a href="http://nodejs.org" target="_blank">nodejs</a>.
    Let's start: 
    
        <ol>
            <li>$ mkdir tutorial</li>
            <li>$ cd tutorial</li>
            <li>$ npm install express</li>
        </ol>
</p>

<p>
    After installing express we can generate the skeleton of our site with the 
    following command:
    <br/>
    <code>
        $ ./node_modules/express/bin/express
    </code>
    <br/>
    When prompted "destination is not empty, continue?" answer with "y".
    Files and folders are then created within the project folder and you can run 
    the web application:
    <br/>
    <code>
        $ node app.js
    </code>
    <br/>
    We then recieve the following error:
</p>
<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/JadeError.PNG" />
</p>

<p>
    We receive this error because the jade view engine is not installed within 
    the application.  I like the <a href="http://handlebarsjs.com/" target="_blank">handlebars</a> 
    view engine so lets install and register handlebars as our view engine for the application.
</p>    
<code>
    $ npm install hbs
</code>
<p>
    We need to register hbs as our view engine. So we alter the app.js file change
    <pre>
    app.set('view engine', 'jade');   
        to
    app.set('view engine', 'hbs');
    </pre>
    We now receive this error:
</p>

<p>
<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/ExpressError.PNG" />
</p>
    

