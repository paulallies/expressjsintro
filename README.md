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
    
This creates the file/folder structure for our app
The default view engine which is installed with expressjs is jade so we need to 
change the view engine to hbs this we do be editting the app.js file and change 

    app.set('view engine', 'jade');"    
        to
    app.set('view engine', 'hbs');"
    
We now run the application and point the browser to the server url and what do 
we get:  We get a 500 Error: Failed to lookup view "index". So the index view is 
missing.  Lets look under the views folder and see whats the problem.

We do have an index view but it has a "jade" extension. Of course this was the 
work of the expressjs scaffolding.  Let's change the extension to hbs to look 
like "index.hbs".  We must also change the contents of the file to hbs syntax.
If we want to use a layout/master page we can add a layout.hbs to the views 
folder or just rename the layout.jade to layout.hbs and change the syntax.

<h3>What You'll Build</h3>

You'll implement a simple movie-listing application that supports creating, 
editing, and listing movies from a database. Below are two screenshots of the 
application you’ll build. It includes a page that displays a list of movies 
from a database: <img src="tutorial/MovieList.png" />