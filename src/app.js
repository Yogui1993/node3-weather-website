const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//-----SETUP PATHS FOR EXPRESS CONFIG---------------
//this public directory will be served by express. In order to get this, it's necessary to set the public directory path with path library
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//-----------------------------------

//----SETUP HANDBARS ENGINE AND VIEWS LOCATION------
//it's very important to set the view engine value, since it's the only way express will get you're trying to refer a template engine
app.set('view engine', 'hbs') //a way to define our template engine to render dinamyc pages from express. Aside from that, all dynamic pages have to be included in a new folder with .hbs extension.
//By default, Express will find a views directory. If we wanna customize the path, we have to proceed as follows
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//--------------------------------------------------

//----SETUP STATIC DIRECTORIES TO SERVE-------------
//a way to customize our express server
app.use(express.static(publicDirectoryPath))
//--------------------------------------------------

//what the server should do when receiving a request
/*app.get('', (req, res) => {
   res.send('<h1>Weather</h1>')
})*/

/*app.get('/help', (req, res) => {
   res.send({
       name:'Andrew',
       age: 27
   })
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Oscar'
    })//it's not mandatory to include the file extension
    //express goes to index and then convert it to html to be rendered to the screen
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Oscar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Leave your question',
        name: 'Oscar'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You must provide an address')
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({ error }) //with return, we print the error and stop the function execution
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            //console.log(location)
            //console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    /* res.send({
         temperature: 25,
         feelslike: 20,
         address: req.query.address
         }
     )*/
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
    //Cannot set headers after they are sent to the client
    //----We can't send responses twice. For that reason, with return in the response we send the response an stop the following code from be executed
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Oscar',
        errorMessage: 'Help article not found'
    })
})

//----MATCH ANYTHING THAT HASN'T BEEN MATCHED SO FAR
//----Express looks for matches, from the top to the botton. For that reason, if nothing validated previously matches, it will return 404 error page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Oscar',
        errorMessage: 'Page not found'
    })
})

//this start up the server
app.listen(port, () => {
    console.log('Server is up on port' + port)
})