const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate')
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError')



mongoose.connect("mongodb://localhost:27017/camp-finder");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log('database connected')
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', engine);
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

// home page
app.get('/', (req, res ) => {
    res.render('home')
})

// view main campground page INDEX PAGE
app.get('/campgrounds', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}))

// view creating new campground page NEW PAGE
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', wrapAsync(async(req, res, next) => {
    if(!req.body.campground) throw new ExpressError('invalid campground data', 400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

// view individual campground page SHOW PAGE
app.get('/campgrounds/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground});
}))

// view campground edit page EDIT PAGE
app.get('/campgrounds/:id/edit', wrapAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground});
}))

app.put('/campgrounds/:id', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next ) => {
    const {statusCode = 500} = err;
    if(!err.msg) err.msg = "Oh no, something went wrong."
    res.status(statusCode).render('error', {err})
})



app.listen(3000, () => console.log('serving on port 3000'));