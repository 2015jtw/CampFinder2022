const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema} = require('../schemas')

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// view main campground page INDEX PAGE
router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}))

// view creating new campground page NEW PAGE
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

// creating a new campground
router.post('/', validateCampground, wrapAsync(async(req, res, next) => {
    if(!req.body.campground) throw new ExpressError('invalid campground data', 400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

// view individual campground page SHOW PAGE
router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

// view campground edit page EDIT PAGE
router.get('/:id/edit', wrapAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground});
}))

// updating a campground request
router.put('/:id', validateCampground, wrapAsync(async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));


// deleting a campground request
router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})

module.exports = router;
