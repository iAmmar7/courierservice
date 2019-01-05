const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); 

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

const Rider = require('../../models/Rider');

const Vendor = require('../../models/Vendor');

const Package = require('../../models/Package');


// @route   Get api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => res.json({msg: "Profile Works"}));

// @route   POST api/profile/add_rider
// @desc    Add rider
// @access  Private
router.post(
  '/add_rider',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newRider = new Rider({
      name: req.body.name,
      contact: req.body.contact
    });
    newRider
      .save()
      .then(rider => res.json(rider))
      .catch(err => console.log(err));
  }
);

// @route   POST api/profile/add_vendor
// @desc    Add vendor
// @access  Private
router.post(
  '/add_vendor',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newVendor = new Vendor({
      name: req.body.name,
      contact: req.body.contact
    });
    newVendor
      .save()
      .then(vendor => res.json(vendor))
      .catch(err => console.log(err));
  }
);

// @route   Get api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })      //refers to Profile.js model's user id
    .populate('user', [ 'name', 'avatar' ])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no Profile for this user';
        res.status(404).json(errors)
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', [ 'name', 'avatar' ])
  .then(profiles => {
    if(!profiles) {
      errors.noprofile = 'There are no Profiles';
      return res.status(404).json(errors);
    }

    res.json(profiles);
  })
  .catch(err => res.status(404).json({ profile: 'There are no profiles'}));
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })    // req.body.handle means only logged in profile
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by User ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })    // This will enable to get the profile
  .populate('user', ['name', 'avatar'])            // by any id, not just logged in id.
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json({ profile: 'There is no profile for this user'}));
});

// @route   POST api/profile/add_package
// @desc    Create or Edit package
// @access  Private
router.post(
  '/add_package',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const packageFields = {};
    if(req.body.packageNo) packageFields.packageNo = req.body.packageNo;
    if(req.body.cod) packageFields.cod = req.body.cod;
    if(req.body.dc) packageFields.dc = req.body.dc;
    if(req.body.status) packageFields.status = req.body.status;
    if(req.body.vendorname) {
      Vendor.findOne({ vendor: req.body.vendorname })
        .then(vendor => {
          if(!vendor) {
            res.status(404).json('Vendor name does not exist');
          } else {
            packageFields.vendorname = req.body.vendorname;

            new Package(packageFields).save()
              .then(package => res.json(package))
              .catch(err => console.log(err));
          }
        });
        
    }
  }
);

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if(req.body.handle) profileFeilds.handle = req.body.handle;
    if(req.body.company) profileFeilds.company = req.body.company;
    if(req.body.website) profileFeilds.website = req.body.website;
    if(req.body.location) profileFeilds.location = req.body.location;
    if(req.body.bio) profileFeilds.bio = req.body.bio;
    if(req.body.status) profileFeilds.status = req.body.status;
    if(req.body.githubusername) profileFeilds.githubusername = req.body.githubusername;

    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined') {
      profileFeilds.skills = req.body.skills.split(',');    //Comma separted values
    }

    // Socail
    profileFeilds.social = {};
    if(req.body.youtube) profileFeilds.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFeilds.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFeilds.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFeilds.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFeilds.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFeilds },
            { new: true}
          ).then(profile => res.json(profile))
        } else {
          // Create

          // Check if handle exist
          Profile.findOne({ handle: profileFeilds.handle })
            .then(profile => {
              if(profile) {
                errors.handle = 'That handle already exist';
                res.status(400).json(errors); 
              }

              // Save Profile
              new Profile(profileFeilds).save().then(profile => res.json(profile));
            })
        }
      })
  });

// @route   POST api/profile/experience
// @desc    Add expreince to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if(!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }

        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
  });

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if(!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }

        // Add to exp array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      })
  });

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(errors));
  });

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(errors));
  });

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
      })
  });


module.exports = router;