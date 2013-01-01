<p>
    This tutorial will teach you the basics of building a nodejs MVC Web application 
    using nodejs and expressjs. 
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
    Our application will be an express based application. I am going to use an 
    <a href="https://github.com/paulallies/ExpressTemplate_1" target="_blank">
    express template</a> hosted on github.
</p>

<p>
    Right out of the box this template gives you two pages to visit and a basic 
    login page. The next step is to change how this application works and learn 
    a little bit about Express in the process. Close your browser and stop the 
    application and let's change some code.
</p>

<h3>Adding Routes</h3>

<p>
    MVC stands for model-view-controller. MVC is a pattern for developing 
    applications that are well architected and easy to maintain. MVC-based 
    applications contain:
    <ul>
        <li>
            Controllers/Routes: Code that handle incoming requests to the 
            application, retrieve data, and then specify view templates that 
            return a response to the client.
        </li>
        <li>
            Models: Code that represent the data of the application and that 
            use validation logic to enforce business rules for that data.
        </li>
        <li>
            Views: Template files that your application uses to dynamically 
            generate HTML responses. 
        </li>
    </ul>
</p>
<p>
    We'll be covering all these concepts in this tutorial series and show you 
    how to use them to build an application.
</p>
<p>
    Let's begin by creating a route module. Create a new file within the routes 
    folder.  Name your new file "helloworld.js".  Inside the file helloworld.js, 
    create two functions that look like the following code.
</p>
<pre>
    exports.index = function(req, res){
        res.send("This is my default action...");
    };
    exports.welcome = function(req, res){
        res.send("This is the Welcome action method...");
    };
</pre>
<p>
    We also need to register the routes in the routes/index.js file
</p>
<pre>
    var homeRoutes = require('./home')
      , accountRoutes = require('./account')
      <b>, helloworldRoutes = require('./helloworld');</b>

    exports.registerRoutes = function(app){
        app.get('/', homeRoutes.index);
        app.get('/home/about', homeRoutes.about);
        app.get('/account/logon', accountRoutes.logon);
        app.get('/account/register', accountRoutes.register);
        <b>app.get('/helloworld', helloworldRoutes.index);
        app.get('/helloworld/welcome', helloworldRoutes.welcome);</b>
    }
</pre>
<p>
    Your route module is named helloworld and the first method above is named index. Let’s invoke it from a browser. Run the application (node app.js). In the browser, append "helloworld" to the path in the address bar. (For example, in the illustration below, it's http://localhost:3000/helloworld.) The page in the browser will look like the following screenshot. In the function above, the code returned a string directly. You told the system to just return some HTML, and it did!
</p>
<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworld.png" />
</p>

<p>
    Browse to http://localhost:3000/helloworld/welcome. The Welcome method runs and returns the string "This is the Welcome action method...".
</p>

<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/welcome.png" />
</p>

<p>
    Let's modify the example slightly so that you can pass some parameter information from the URL to the route (for example, /helloworld/welcome?name=Scott&numtimes=4). Change your Welcome function to include two parameters as shown below.
</p>

<pre>
    exports.welcome = function(req, res){
        var name = req.query.name,
            numtimes = req.query.numtimes;
        res.send("Hello " + name + ", NumTimes is: " + numtimes);
    };
</pre>

<p>
    Run your application and browse to the example URL (http://localhost:3000/helloworld/welcome?name=Scott&numtimes=4). You can try different values for name and numtimes in the URL. The system automatically maps the named parameters from the query string in the address bar to parameters in your method.
</p>  

<p>
<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/welcomewithquery.png" />
</p>  
<p>
In both these examples the router has been doing the "VC" portion of MVC — that is, the view and controller work. The controller is returning HTML directly. Ordinarily you don't want controllers returning HTML directly, since that becomes very cumbersome to code. Instead we'll typically use a separate view template file to help generate the HTML response. Let's look next at how we can do this.
</p>

<p>We will now modify the helloworld route code to use view template files to cleanly encapsulate the process of generating HTML responses to a client.  You'll create a view template file using the handlebars. Handlebars view templates have a .hbs file extension, and provide an elegant way to create HTML output using js.

Start by using a view template with the Index method in the helloworld router module. Currently the Index method returns a string with a message that is hard-coded. Change the Index method to return a View object, as shown in the following:
</p>

<pre>
    exports.index = function(req, res){
        res.render("/helloworld/index");
    };
</pre>

<p>Notice that when we want to return a view we use the response function render instead of send.  The views to be rendered are located under the views folder. Add the folder "helloworld" under the views folder.  This folder would contain all the helloworld related views. Then add a new file called "index.hbs" for the view with the following code:
</p>

<code>
    <h2>Hello World Index Page</h2>
</code>
<p>
Run the application and browse to the HelloWorld controller (http://localhost:3000/HelloWorld). The Index method in your router didn't do much work; it simply ran the statement res.render("/helloworld/index"), which specified that the method should use a view template file to render a response to the browser. The image below shows the rendered view.
</p>