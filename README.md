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

<code>
    exports.index = function(req, res){
        res.send("This is my <b>default</b> action...");
    };
    exports.welcome = function(req, res){
        res.send("This is the Welcome action method...");
    };
</code>
