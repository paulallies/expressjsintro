This tutorial will teach you the basics of building a nodejs MVC Web application using nodejs and expressjs. 

###What You'll Build


You'll implement a simple movie-listing application that supports creating, editing, and listing movies from a database. Below are two screenshots of the application you’ll build. It includes a page that displays a list of movies from a database: 

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/MovieList.png" />

The application also lets you add, edit, and delete movies, as well as see details about individual ones. All data-entry scenarios include validation to ensure that the data stored in the database is correct.


<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/Details.png" />

###Skills you will learn

Here's what you'll learn:

* How to create a new express project.
* How to create routes and views.
* How to create a new database using the MongoDB and Mongoose.
* How to retrieve and display data.
* How to edit data and enable data validation.

###Creating Your First Application

Our application will be an express based application. I am going to use an <a href="https://github.com/paulallies/ExpressTemplate_1" target="_blank"> express template</a> hosted on github.

Right out of the box this template gives you two pages to visit and a basic 
    login page. The next step is to change how this application works and learn 
    a little bit about Express in the process. Close your browser and stop the 
    application and let's change some code.

###Adding Routes

MVC stands for model-view-controller. MVC is a pattern for developing applications that are well architected and easy to maintain. MVC-based applications contain:

* Controllers/Routes: Code that handle incoming requests to the application, retrieve data, and then specify view templates that return a response to the client.

* Models: Code that represent the data of the application and that use validation logic to enforce business rules for that data.

* Views: Template files that your application uses to dynamically generate HTML responses. 

We'll be covering all these concepts in this tutorial series and show you how to use them to build an application.

Let's begin by creating a route module. Create a new file within the routes folder.  Name your new file "helloworld.js".  Inside the file helloworld.js, create two functions that look like the following code.


```javascript
exports.index = function(req, res){
    res.send("This is my default action...");
};
exports.welcome = function(req, res){
    res.send("This is the Welcome action method...");
};
```

We also need to register the routes in the routes/index.js file

```javascript
var homeRoutes = require('./home'),
    accountRoutes = require('./account'),
    helloworldRoutes = require('./helloworld');

exports.registerRoutes = function(app){
    app.get('/', homeRoutes.index);
    app.get('/home/about', homeRoutes.about);
    app.get('/account/logon', accountRoutes.logon);
    app.get('/account/register', accountRoutes.register);
    app.get('/helloworld', helloworldRoutes.index);
    app.get('/helloworld/welcome', helloworldRoutes.welcome);
}
```

Your route module is named `helloworld` and the first method above is named index. Let’s invoke it from a browser. Run the application (node app.js). In the browser, append "helloworld" to the path in the address bar. (For example, in the illustration below, it's http://localhost:3000/helloworld.) The page in the browser will look like the following screenshot. In the function above, the code returned a string directly. You told the system to just return some HTML, and it did!
    

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworld.png" />

Browse to http://localhost:3000/helloworld/welcome. The Welcome method runs and returns the string "This is the Welcome action method...".

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/welcome.png" />

Let's modify the example slightly so that you can pass some parameter information from the URL to the route (for example, /helloworld/welcome?name=Scott&numtimes=4). Change your Welcome function to include two parameters as shown below.

```javascript
exports.welcome = function(req, res){
    var name = req.query.name,
        numtimes = req.query.numtimes;
    res.send("Hello " + name + ", NumTimes is: " + numtimes);
};

```
Run your application and browse to the example URL (http://localhost:3000/helloworld/welcome?name=Scott&numtimes=4). You can try different values for name and numtimes in the URL. The system automatically maps the named parameters from the query string in the address bar to parameters in your method.

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/welcomewithquery.png" />

In both these examples the router has been doing the "VC" portion of MVC — that is, the view and controller work. The controller is returning HTML directly. Ordinarily you don't want controllers returning HTML directly, since that becomes very cumbersome to code. Instead we'll typically use a separate view template file to help generate the HTML response. Let's look next at how we can do this.

We will now modify the helloworld route code to use view template files to cleanly encapsulate the process of generating HTML responses to a client.  You'll create a view template file using the handlebars. Handlebars view templates have a .hbs file extension, and provide an elegant way to create HTML output using js.

Start by using a view template with the Index method in the helloworld router module. Currently the Index method returns a string with a message that is hard-coded. Change the Index method to return a View object, as shown in the following:

```javascript
exports.index = function(req, res){
    res.render("/helloworld/index");
};
```

Notice that when we want to return a view we use the response function render instead of send.  The views to be rendered are located under the views folder. Add the folder "helloworld" under the views folder.  This folder would contain all the helloworld related views. Then add a new file called "index.hbs" for the view with the following code:

```html
<h2>Hello World Index Page</h2>
<p>Put content here</p>
```
    
Run the application and browse to the HelloWorld controller (http://localhost:3000/HelloWorld). The Index method in your router didn't do much work; it simply ran the statement res.render("/helloworld/index"), which specified that the method should use a view template file to render a response to the browser. The image below shows the rendered view.

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworldview.png" />

Looks pretty good. However, notice that the big title on the page says "My Express Application." Let's change those.

###Changing Views and Layout Pages

First, you want to change the "My Express Application" title at the top of the page. That text is common to every page. It actually is implemented in only one place in the project, even though it appears on every page in the application. Go to the /Views open the layout.hbs file. This file is called a layout page and it's the shared "shell" that all other pages use.  Layout templates allow you to specify the HTML container layout of your site in one place and then apply it across multiple pages in your site. Note the {{{body}}} line near the bottom of the file. {{{body}}} is a placeholder where all the view-specific pages you create show up, "wrapped" in the layout page. Change the title heading in the layout template from "My Express Application" to "Express Movie App".

```html
<div id="title">
    <h1>Express Movie App</h1>
</div>
```

Run the application and notice that it now says "Express Movie App". Click the About link, and you see how that page shows "Express Movie App", too. We were able to make the change once in the layout template and have all pages on the site reflect the new title.

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/about.png" />

The complete layout.hbs file is shown below:

```html
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
```

###Passing Data from the Route to the View

Before we go to a database and talk about models, though, let's first talk about passing information from the route to a view. Routers are invoked in response to an incoming URL request. A router is where you write the code that handles the incoming parameters, retrieves data from a database, and ultimately decides what type of response to send back to the browser. View templates can then be used from a router to generate and format an HTML response to the browser.

Routers are responsible for providing whatever data or objects are required in order for a view template to render a response to the browser. A view template should never perform business logic or interact with a database directly. Instead, it should work only with the data that's provided to it by the router. Maintaining this "separation of concerns" helps keep your code clean and more maintainable.

Currently, the "welcome" function in the helloworld router takes a name and a numTimes parameter and then outputs the values directly to the browser. Rather than have the route render this response as a string, let’s change the route to use a view template instead. The view template will generate a dynamic response, which means that you need to pass appropriate bits of data from the route to the view in order to generate the response. You can do this by having the route put the dynamic data that the view template needs in a object that the view template can then access.

Return to the helloworld.js route file and change the welcome method to pass a messageCollection to the view.  We fill the messageCollection with a list of objects.

```javascript
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

```

The view then iterates through the collection to build a list.

```html
<h2>Welcome</h2>
    <ul> 
        {{#each messageCollection}}
            <li>{{message}}</li> 
        {{/each}}
</ul>
```

Run the application and browse to the following URL: http://localhost:3000/HelloWorld/Welcome?name=Scott&numtimes=5.  Now data is taken from the URL and passed to the route automatically. The route packages the data passes that object to the view. The view then displays the data as HTML to the user.

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/helloworldview1.png" />

###Adding a Model

In this section you'll add some code for managing movies in a database. This will be the "model" part of the application.

You’ll use a nodejs data-access technology known as the <a href="http://mongoosejs.com/" target="_blank">mongoose framework</a> to define and work with these model classes. The mongoose framework allows you to create model objects by writing simple classes.  You can then have the database created on the fly from your classes, which enables a very clean and rapid development workflow communication to a <a href="http://www.mongodb.org/" target="_blank">mongodb</a> database.

Lets start by creating a folder called "models" under the project folder.  In this folder we create a file called "movie.js". This will store the model for our movie.


```javascript
module.exports = {
        title : { type: String, required: true, trim: true},
        releasedate : { type: Date, required: true, trim: true},
        genre : { type : String, trim: true, required : true},
        price : { type: Number, trim: true, required: true }, 
        rating: {type: String,  uppercase: true, enum: ['PG', 'R'], trim: true}
};
```    
We also create a repository file to store all our movie operation methods

```javascript
var mongoose = require("mongoose");
var config = require("../config");


var schema = mongoose.Schema(require("./movie"));
var Movie = mongoose.model('Movie', schema);

exports.getAll = function(cb){
    mongoose.connect(config.moviesConnectionString);
    Movie.find(
        function(err, docs) {
            if (!err){ 
                var movieList = [];
                for(var d in docs)
                {
                    movieList.push({
                        title : docs[d].title,
                        releasedate : docs[d].releasedate,
                        genre : docs[d].genre,
                        price : docs[d].price,
                        rating: docs[d].rating
                    });
                }
                cb(movieList);
                mongoose.disconnect();
            }
            else { 
                throw err;
            }
        }
    );  
}

exports.create = function(movie, cb){
    mongoose.connect(config.moviesConnectionString);
    var newMovie = new Movie({ 
        title : req.body.title,
        releasedate : req.body.releasedate,
        genre : req.body.genre,
        price : req.body.price, 
        rating: req.body.rating
    });

    newMovie.save(function (err) {
        if (err) {
            cb(err);
        }else{
            cb();
        }
        mongoose.disconnect();
    });
}

```

This file has a lot of important stuff that needs to be explained.  In the repository file we store all the methods that will be used by the routes.  We don't want to store database specific code in the route. So to display a list of movies we would call the "getAll" function and to create a movie we would call the "create" function.  We have refactored the connectionstring into a config file in the root of the project folder where we will store future configuration settings.

Next, you'll build a new movie routes module that your can use to display the movie data and allow users to create new movie listings.  Let's look at the first function of the movie route.  Create a file named movie.js under the routes folder and add the following code:

```javascript
var movieRepository = require("../models/movierepository");

exports.index = function(req, res){
    movieRepository.getAll(function(result){
        res.render("movie/index",{
            title: "Move List",
            movies : result
        }); 
    });   
};
```
Register the router in the /routes/index.js file by adding the following line:

```javascript
app.get('/movies', moviesRoutes.index);

```
The index function renders movie/index view so we need to create a view to display the movie list:


```html
<h2>My Movie List</h2>
<p>
    <a href="/movie/create">Create New</a>
</p>
<p>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Title</th>
                <th>Release Date</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Rating</th>

            </tr>
        </thead>
        <tbody>
        {{#each movies}}
            <tr>
                <td>
                    <a href="/movie/edit/{{id}}">Edit</a> |
                    <a href="/movie/details/{{id}}">Details</a> |
                    <a href="/movie/delete/{{id}}">Delete</a>
                </td>
                <td>{{title}}</td>
                <td>{{releasedate}}</td>
                <td>{{genre}}</td>
                <td>{{price}}</td>
                <td>{{rating}}</td>

            </tr>
        {{/each}}
        </tbody>
    </table>
</p>
```
    
Run the application and browse to the movies route by appending /movies to the URL in the address bar of your browser. The browser request http://localhost:3000/movies is routed to the default Index action method of the movies route module. The result is an empty list of movies, because you haven't added any yet.  Note the "Create New" link in the movie list view. 

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/movielistempty.png" />

To add some movies to the database we need a create view.  Create a new file under the movie view folder and call it create.hbs.  The file will have the following html

```html
<form action="/movie/create" method="post">    
    <div>
        <fieldset>
            <legend>Create Movie</legend>

            <div class="editor-label">
                <label for="title">Title</label>
            </div>
            <div class="editor-field">
                <input id="title" name="title" type="text"/>
            </div>

            <div class="editor-label">
                <label for="releasedate">Release Date</label>
            </div>
            <div class="editor-field">
                <input id="releasedate" name="releasedate" type="text" />
            </div>

            <div class="editor-label">
                <label for="genre">Genre</label>
            </div>
            <div class="editor-field">
                <input id="genre" name="genre" type="text" />
            </div>

            <div class="editor-label">
                <label for="price">Price</label>
            </div>
            <div class="editor-field">
                <input id="price" name="price" type="text" />
            </div>
            
            <div class="editor-label">
                <label for="rating">Rating</label>
            </div>
            <div class="editor-field">
                <input id="rating" name="rating" type="text" />
            </div>

            <p>
                <input type="submit" value="Create" />
            </p>
        </fieldset>
    </div>
</form>

<p>
    <a href="/movies">Back to List</a>
</p>
```

We must now create another route in our movie route to render this view

```javascript
exports.create = function(req, res){
    if(req.method == "GET"){
        res.render("movie/create", { title: "Create"});
    }
}
```

We must also register the route in the routes/index.js file

```javascript
app.get('/movie/create', moviesRoutes.create);

```

###Creating a Movie

Select the Create New link. Enter some details about a movie and then click the Create button.


<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/moviecreate.png" />

Clicking the Create button causes the form to be posted to the server, where the movie information is saved in the database. You're then redirected to the /Movies URL, where you can see the newly created movie in the listing.

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/movielist1.png" />

Lets look at the code that made it possible to take data from a posted form, add it to the database and redirect to the movie list to display the result.

To handle the movie/create post we had to add another function to the "routes/movie.js" route module:

```javascript
exports.add  = function(req, res){
    var newMovie = {
        title : req.body.title,
        releasedate : req.body.releasedate,
        genre : req.body.genre,
        price : req.body.price, 
        rating: req.body.rating
    };

    movieRepository.create(newMovie, function(){
        res.redirect("movies")
    });
}
```

We also had to register this function in the routes/index.js file:

```javascript
app.post('/movie/create', moviesRoutes.add);
```

###Editing a Movie

When we click on the edit link in the movie list we need to route through to the movie/edit view.  So lets add a route to the `routes/index.js` 

```javascript
app.get('/movie/edit/:id', moviesRoutes.edit);
```

After doing this we need to add the edit method to the `routes/movie.js` file:

```javascript
exports.edit = function(req, res){
    movieRepository.getMovie(req.params.id, function(movie){
        res.render("movie/edit", { title: "Edit", movie : movie});
    });
};
```

As can be seen this function fetches a movie using the getMovie function from the movieRepository by passing the id of the movie to the function.  

```javascript
exports.getMovie = function(id, cb){
    mongoose.connect(config.moviesConnectionString);
    Movie.findOne({ _id : id},
        function(err, doc) {
            mongoose.connection.close();
            if (!err){ 
                cb({
                        id : doc._id,
                        title : doc.title,
                        releasedate : (new Date(doc.releasedate)).toDateString(),
                        genre : doc.genre,
                        price : doc.price,
                        rating: doc.rating
                });
            }
            else { 
                throw err;
            }
        }
    );  
} 
```

Once the movie is fetched we render the movie using the `movie/edit.hbs` view.  The code for the edit view is as follows:

```html
<form action="/movie/edit" method="post">    
    <div>
        <fieldset>
            <legend>Update Movie</legend>

            {{#movie}}<input type="hidden" name="id" id="id" value="{{id}}" />{{/movie}}

            <div class="editor-label">
                <label for="title">Title</label>
            </div>
            <div class="editor-field">
                <input id="title" name="title" type="text" {{#movie}}value="{{title}}"{{/movie}}/>
            </div>

            <div class="editor-label">
                <label for="releasedate">Release Date</label>
            </div>
            <div class="editor-field">
                <input id="releasedate" name="releasedate" type="text" {{#movie}}value="{{releasedate}}"{{/movie}} />
            </div>

            <div class="editor-label">
                <label for="genre">Genre</label>
            </div>
            <div class="editor-field">
                <input id="genre" name="genre" type="text" {{#movie}}value="{{genre}}"{{/movie}} />
            </div>

            <div class="editor-label">
                <label for="price">Price</label>
            </div>
            <div class="editor-field">
                <input id="price" name="price" type="text" {{#movie}}value="{{price}}"{{/movie}} />

            </div>
            
            <div class="editor-label">
                <label for="rating">Rating</label>
            </div>
            <div class="editor-field">
                <input id="rating" name="rating" type="text" {{#movie}}value="{{rating}}"{{/movie}} />
            </div>

            <p>
                <input type="submit" value="Update" />
            </p>
        </fieldset>
    </div>
</form>

<p>
    <a href="/movies">Back to List</a>
</p>

```    
and will render this

<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/movieedit.png" />

Clicking the update button will post this form to the '/movie/edit' route.  So lets add this route to the `/routes/index.js` file

```js
    app.post('/movie/edit', moviesRoutes.update);
```
and we must add the update function to the `/routes/movie.js`

```js
exports.update = function(req, res){
    var updatedMovie = {
        id: req.body.id,
        title : req.body.title,
        releasedate : new Date(req.body.releasedate),
        genre : req.body.genre,
        price : req.body.price, 
        rating: req.body.rating
    };

    movieRepository.edit(updatedMovie, function(err){
        if(err){
            res.render("movie/edit", { title: "Edit", movie : updatedMovie, validation: err});
        }else{
            res.redirect("movies");
        }
    })
}
```

The update function executes the movieRepository.edit function: 

```js
exports.edit = function(movie, cb){
    mongoose.connect(config.moviesConnectionString);

    var updatedMovie = new Movie({
        id: movie.id,
        title: movie.title,  
        releasedate : movie.releasedate,
        genre : movie.genre,
        price : movie.price,
        rating: movie.rating
    });

    updatedMovie.validate(function(validationerr){
        if(validationerr) {
            mongoose.connection.close(); 
            cb(null, validationerr);
        }else{
            Movie.findByIdAndUpdate(
                movie.id, 
                { 
                    title: movie.title,
                    releasedate : movie.releasedate,
                    genre : movie.genre,
                    price : movie.price,
                    rating: movie.rating
                }, 
                function(err){
                    mongoose.connection.close();
                    if (!err){ 
                        cb();
                    }
                    else { 
                        cb(err)
                    }
                }
            );
        }
    });


};
```

In the code above, the movie is validated and updated.

###Deleting a Movie

The delete link in the movie list view routes to a `movie/delete/{id}`.  This is added to the `routes/index.js` file

```js
    app.get('/movie/delete/:id', moviesRoutes.delete);
```

The delete function in the `routes/movies.js` file handles the request:

```js
exports.delete = function(req, res){
    movieRepository.delete(req.params.id, function(){
        res.redirect("movies");     
    });
}
```

which in turn executes the delete function in the `models/moviereposistory.js`:

```js
exports.delete = function(id, cb){
    mongoose.connect(config.moviesConnectionString);
    Movie.remove({ _id : id},
        function(err, doc) {
            mongoose.connection.close();
            if (!err){ 
                cb();
            }
            else { 
                throw err;
            }
        }
    );
}
```

###Validation

Let's talk a little about validation.  In the project we choose to do validation of movie data on create and update.  The following is the code for the movie model.

```js


var Validator = require('validator').Validator;
var validate = new Validator();

Validator.prototype.error = function (err_msg) {
    return false;
};

var validateLength = function(val){
    return validate.check(val).len(2, 50); 
};

var titleValidate = [
    { validator: validateLength, msg: 'Title must be between 2 and 50 characters in length'}

];

var priceValidate = [
    { 
        validator: function(val){
            var minval = 1;
            var maxval = 100;
            return validate.check(val).min(minval) && validate.check(val).max(maxval);
        }, 
        msg: 'Price must be between $1 and $100'
    }
];

var ratingValidate = [
    {
        validator: function(val){
            var ratingArray = ["PG", "R", "R16", "R18", "PG13"];
            return ratingArray.indexOf(val) > -1;
        }, 
        msg: "Rating must be 'PG', 'R16', 'R18', 'R' or 'PG13' "
    }
];

module.exports = {
        title : { type: String, required: true, validate: titleValidate},
        releasedate : { type: Date ,  required: true},
        genre : { type : String, required : true},
        price : { type: Number, required: true, validate : priceValidate }, 
        rating: {type: String,  uppercase: true, required: true, validate : ratingValidate}
};
```

In the movie model add different validators to each model property.  To assist us we use the node-validator npm module.  For more information about mongoose validation <a target="_blank" href="http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate">click here</a> and node-validator <a target="_blank" href="https://github.com/chriso/node-validator">click here</a>

So on create and update we can call the `.validate` method on the model and it will return validation errors if any of the validation specs have failed.  We call the validate methods from the movierepository and validation are then passed to the create and modify routes.  The validaton errors are then passed from the route to the views so that the user can view validation errors in the view.  Let's show the create view with validation html.

```html
<form action="/movie/create" method="post">    
    <div>
        <fieldset>
            <legend>Create Movie</legend>
           
           {{#validation}}
            <h4 style="color:red">Validation Error</h4>
           {{/validation}}

            <div class="editor-label">
                <label for="title">Title</label>
            </div>
            <div class="editor-field">
                <input id="title" {{#validation.errors.title}}class="input-validation-error"{{/validation.errors.title}} name="title" type="text" {{#movie}}value="{{title}}"{{/movie}} />
                {{#validation}}<span style="color:red">{{errors.title.type}}</span>{{/validation}}
            </div>

            <div class="editor-label">
                <label for="releasedate">Release Date</label>
            </div>
            <div class="editor-field">
                <input id="releasedate" {{#validation.errors.releasedate}}class="input-validation-error"{{/validation.errors.releasedate}} name="releasedate" type="text" {{#movie}}value="{{releasedate}}"{{/movie}}/>
                {{#validation}}<span style="color:red">{{errors.releasedate.type}}</span>{{/validation}}
            </div>

            <div class="editor-label">
                <label for="genre">Genre</label>
            </div>
            <div class="editor-field">
                <input id="genre" {{#validation.errors.genre}}class="input-validation-error"{{/validation.errors.genre}} name="genre" type="text" {{#movie}}value="{{genre}}"{{/movie}} />
                {{#validation}}<span style="color:red">{{errors.genre.type}}</span>{{/validation}}

            </div>

            <div class="editor-label">
                <label for="price">Price</label>
            </div>
            <div class="editor-field">
                <input id="price" name="price" {{#validation.errors.price}}class="input-validation-error"{{/validation.errors.price}} type="text" {{#movie}}value="{{price}}"{{/movie}}/>
                  {{#validation}}<span style="color:red">{{errors.price.type}}</span>{{/validation}}
            </div>
            
            <div class="editor-label">
                <label for="rating">Rating</label>
            </div>
            <div class="editor-field">
                <input id="rating" name="rating" {{#validation.errors.rating}}class="input-validation-error"{{/validation.errors.rating}} type="text" {{#movie}}value="{{rating}}"{{/movie}} />
                  {{#validation}}<span style="color:red">{{errors.rating.type}}</span>{{/validation}}
                
            </div>

            <p>
                <input type="submit" value="Create" />
            </p>
        </fieldset>
    </div>
</form>

<p>
    <a href="/movies">Back to List</a>
</p>
```

and for the edit view with validation looks very similar

```html
<form action="/movie/edit" method="post">    
    <div>
        <fieldset>
            <legend>Update Movie</legend>

           {{#validation}}
                <h4 style="color:red">Validation Error</h4>
           {{/validation}}
            
            {{#movie}}<input type="hidden" name="id" id="id" value="{{id}}" />{{/movie}}

            <div class="editor-label">
                <label for="title">Title</label>
            </div>
            <div class="editor-field">
                <input id="title"  {{#validation.errors.title}}class="input-validation-error"{{/validation.errors.title}} name="title" type="text" {{#movie}}value="{{title}}"{{/movie}}/>
                 {{#validation}}<span style="color:red">{{errors.title.type}}</span>{{/validation}}
            </div>

            <div class="editor-label">
                <label for="releasedate">Release Date</label>
            </div>
            <div class="editor-field">
                <input id="releasedate" {{#validation.errors.releasedate}}class="input-validation-error"{{/validation.errors.releasedate}} name="releasedate" type="text" {{#movie}}value="{{releasedate}}"{{/movie}} />
                {{#validation}}<span style="color:red">{{errors.releasedate.type}}</span>{{/validation}}
            </div>

            <div class="editor-label">
                <label for="genre">Genre</label>
            </div>
            <div class="editor-field">
                <input id="genre" {{#validation.errors.genre}}class="input-validation-error"{{/validation.errors.genre}} name="genre" type="text" {{#movie}}value="{{genre}}"{{/movie}} />
                  {{#validation}}<span style="color:red">{{errors.genre.type}}</span>{{/validation}}
            </div>

            <div class="editor-label">
                <label for="price">Price</label>
            </div>
            <div class="editor-field">
                <input id="price" {{#validation.errors.price}}class="input-validation-error"{{/validation.errors.price}} name="price" type="text" {{#movie}}value="{{price}}"{{/movie}} />
                {{#validation}}<span style="color:red">{{errors.price.type}}</span>{{/validation}}
            </div>
            
            <div class="editor-label">
                <label for="rating">Rating</label>
            </div>
            <div class="editor-field">
                <input id="rating" {{#validation.errors.rating}}class="input-validation-error"{{/validation.errors.rating}} name="rating" type="text" {{#movie}}value="{{rating}}"{{/movie}} />
                {{#validation}}<span style="color:red">{{errors.rating.message}}</span>{{/validation}}
            </div>

            <p>
                <input type="submit" value="Update" />
            </p>
        </fieldset>
    </div>
</form>

<p>
    <a href="/movies">Back to List</a>
</p>
```
###Movie Details

Add the route to `routes/index.js`: 

```js
    app.get('/movie/details/:id', moviesRoutes.details);
```

Add the details function to the 'routes/movie.js':

```js
exports.details = function(req, res){
    movieRepository.getMovie(req.params.id, function(movie){
        res.render("movie/details", { title: "Details", movie : movie});
    });
}
```

Add the getMovie function to the `models/movierepository.js`:

```js
exports.getMovie = function(id, cb){
    mongoose.connect(config.moviesConnectionString);
    Movie.findOne({ _id : id},
        function(err, doc) {
            mongoose.connection.close();
            if (!err){ 
                cb({
                        id : doc._id,
                        title : doc.title,
                        releasedate : (new Date(doc.releasedate)).toDateString(),
                        genre : doc.genre,
                        price : doc.price,
                        rating: doc.rating
                });
            }
            else { 
                throw err;
            }
        }
    );  
}
```

Add the view `movie/details.hbs` view:

```html
<div>
    <fieldset>
        <legend>Movie Details</legend>
    {{#movie}}
        <div class="editor-label">
            <label for="title">Title:</label>
        </div>
        <div class="editor-field">
            <span>{{title}}</span>
        </div>

        <div class="editor-label">
            <label for="releasedate">Release Date:</label>
        </div>
        <div class="editor-field">
            <label id="releasedate" >{{releasedate}}</label>
        </div>

        <div class="editor-label">
            <label for="genre">Genre:</label>
        </div>
        <div class="editor-field">
            <label id="genre">{{genre}}</label>
        </div>

        <div class="editor-label">
            <label for="price">Price:</label>
        </div>
        <div class="editor-field">
            <label id="price" >{{price}}</label 
        </div>
    {{/movie}}

    </fieldset>
</div>

<p>
    <a href="/movies">Back to Movie List</a>
</p>
```

The details view will render as follows:


<img src="https://raw.github.com/paulallies/expressjsintro/master/tutorial/moviedetails.png" />









