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

<p>
    Notice that when we want to return a view we use the response function render instead of send.  The views to be rendered are located under the views folder. Add the folder "helloworld" under the views folder.  This folder would contain all the helloworld related views. Then add a new file called "index.hbs" for the view with the following code:

</p>

    
        <h2>Hello World Index Page</h2>
        <p>Put content here</p>

<p>
    Run the application and browse to the HelloWorld controller (http://localhost:3000/HelloWorld). The Index method in your router didn't do much work; it simply ran the statement res.render("/helloworld/index"), which specified that the method should use a view template file to render a response to the browser. The image below shows the rendered view.
</p>
<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworldview.png" />
</p>

<p>
Looks pretty good. However, notice that the big title on the page says "My MVC Application." Let's change those.
</p>

<h3>Changing Views and Layout Pages</h3>

<p>
    First, you want to change the "My Express Application" title at the top of the page. That text is common to every page. It actually is implemented in only one place in the project, even though it appears on every page in the application. Go to the /Views open the layout.hbs file. This file is called a layout page and it's the shared "shell" that all other pages use.  Layout templates allow you to specify the HTML container layout of your site in one place and then apply it across multiple pages in your site. Note the {{{body}}} line near the bottom of the file. {{{body}}} is a placeholder where all the view-specific pages you create show up, "wrapped" in the layout page. Change the title heading in the layout template from "My Express Application" to "Express Movie App".
</p>

        <div id="title">
            <h1>Express Movie App</h1>
        </div>

<p>
Run the application and notice that it now says "Express Movie App". Click the About link, and you see how that page shows "MVC Movie App", too. We were able to make the change once in the layout template and have all pages on the site reflect the new title.
</p>

<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/about.png" />
</p>
<p>
    The complete layout.hbs file is shown below:
</p>

        <!doctype html>
        <html>
            <head>
                <title>{{title}} - Express Movie App</title>
                <link href="/images/favicon.ico" rel="Shortcut Icon" type="image/x-icon">
                <link rel='stylesheet' href='/stylesheets/style.css' />  
                <script src="/javascripts/modernizr-1.7.min.js"></script>
            </head>
          <body>
            <div class="page">
                <header>
                    <div id="title">
                        <h1>Express Movie App</h1>
                    </div>
                    <div id="logindisplay">
                            [ <a href="/Account/LogOn">Log On</a> ]
                    </div>
                    <nav>
                        <ul id="menu">
                            <li><a href="/">Home</a></li>
                            <li><a href="/Home/About">About</a></li>
                        </ul>
                    </nav>
                </header>
                <section id="main">
                    {{{body}}}
                </section>
                <footer>
                </footer>
            </div>
          </body>
        </html>

<h3>Passing Data from the Route to the View</h3>
<p>
    Before we go to a database and talk about models, though, let's first talk about passing information from the route to a view. Routers are invoked in response to an incoming URL request. A router is where you write the code that handles the incoming parameters, retrieves data from a database, and ultimately decides what type of response to send back to the browser. View templates can then be used from a router to generate and format an HTML response to the browser.

    routers are responsible for providing whatever data or objects are required in order for a view template to render a response to the browser. A view template should never perform business logic or interact with a database directly. Instead, it should work only with the data that's provided to it by the router. Maintaining this "separation of concerns" helps keep your code clean and more maintainable.

    Currently, the "welcome" function in the helloworld router takes a name and a numTimes parameter and then outputs the values directly to the browser. Rather than have the route render this response as a string, let’s change the route to use a view template instead. The view template will generate a dynamic response, which means that you need to pass appropriate bits of data from the route to the view in order to generate the response. You can do this by having the route put the dynamic data that the view template needs in a object that the view template can then access.

    Return to the helloworld.js route file and change the welcome method to pass a messageCollection to the view.  We fill the messageCollection with a list of objects.
</p>


        exports.welcome = function(req, res){
            var name = req.query.name,
                numTimes = req.query.numtimes,
                messageCollection = [];

            for(var i = 0; i < numTimes; i++){
                messageCollection.push({message: "Hello "+ name});
            }

            res.render('helloworld/welcome', { 
                messageCollection: messageCollection
            });
        };
<p>
    The view then iterates through the collection to build a list.
</p>

    <h2>Welcome</h2>
        <ul> 
            {{#each messageCollection}}
                <li>{{message}}</li> 
            {{/each}}
    </ul>

<p>
    Run the application and browse to the following URL: http://localhost:3000/HelloWorld/Welcome?name=Scott&numtimes=4.  Now data is taken from the URL and passed to the route automatically. The route packages the data passes that object to the view. The view then displays the data as HTML to the user.
</p>

<p>
    <img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworldview1.png" />
</p>

<h3>Adding a Model</h3>
<p>
    In this section you'll add some code for managing movies in a database. This will be the "model" part of the application.

    You’ll use a nodejs data-access technology known as the mongoose framework to define and work with these model classes. The mongoose framework allows you to create model objects by writing simple classes.  You can then have the database created on the fly from your classes, which enables a very clean and rapid development workflow communication to a mongodb database.
</p>

<p>
    
</p>


