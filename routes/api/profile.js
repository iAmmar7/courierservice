const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateRiderInput = require('../../validation/rider');
const validateVendorInput = require('../../validation/vendor');
const validatePackageInput = require('../../validation/package');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Rider Model
const Rider = require('../../models/Rider');
// Load Vendor Model
const Vendor = require('../../models/Vendor');
// Load Package Model
const Package = require('../../models/Package');


// @route   Get api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   POST api/profile/add-rider
// @desc    Add rider
// @access  Private
router.post(
  '/add-rider',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRiderInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    const riderFields = {};
    riderFields.user = req.user.id;
    if (req.body.name) riderFields.name = req.body.name;
    if (req.body.contact) riderFields.contact = req.body.contact;
    if (req.body.chargesperdelivery) riderFields.chargesperdelivery = req.body.chargesperdelivery;

    if (req.body._id) {
      Rider.findOne({ "_id": req.body._id })
        .then(rider => {
          if (!rider) {
            errors.norider = "There is no Rider with this ID";
            res.status(404).json(errors);
          } else {
            Rider.updateOne({ "_id": req.body._id }, { $set: riderFields })
              .then(res.json(rider))
              .catch(err => console.log(err))
          }
        })
    } else {
      new Rider(riderFields).save()
        .then(rider => res.json(rider))
        .catch(err => console.log(err));
    }
  }
);

// @route   POST api/profile/add-vendor
// @desc    Add vendor
// @access  Private
router.post(
  '/add-vendor',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVendorInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    const vendorFields = {};
    vendorFields.user = req.user.id;
    if (req.body.name) vendorFields.name = req.body.name;
    if (req.body.contact) vendorFields.contact = req.body.contact;
    if (req.body.address) vendorFields.address = req.body.address;

    if (req.body._id) {
      Vendor.findOne({ "_id": req.body._id })
        .then(vendor => {
          if (!vendor) {
            errors.novendor = "There is no Vendor with this ID";
            res.status(404).json(errors);
          } else {
            Vendor.updateOne({ "_id": req.body._id }, { $set: vendorFields })
              .then(res.json(vendor))
              .catch(err => console.log(err))
          }
        })
    } else {
      new Vendor(vendorFields).save()
        .then(vendor => res.json(vendor))
        .catch(err => console.log(err));
    }
  }
);

// @route   POST api/profile/add_package
// @desc    Add or Edit package
// @access  Private
router.post(
  '/add-package',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePackageInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Get Fields
    const packageFields = {};
    packageFields.user = req.user.id;
    if (req.body.customername) packageFields.customername = req.body.customername;
    if (req.body.customerphone) packageFields.customerphone = req.body.customerphone;
    if (req.body.address) packageFields.address = req.body.address;
    if (req.body.cod) packageFields.cod = req.body.cod;
    if (req.body.dc) packageFields.dc = req.body.dc;
    if (req.body.status) packageFields.status = req.body.status;
    if (req.body.arrivaldate) packageFields.arrivaldate = req.body.arrivaldate;
    if (req.body.deliverdate) packageFields.deliverdate = req.body.deliverdate;

    if (req.body.ridername) {
      Rider.findOne({ "name": req.body.ridername })
        .then(rider => {
          if (!rider) {
            errors.norider = "Rider name does not exist";
            res.status(404).json(errors);
          } else {
            packageFields.ridername = req.body.ridername;
          }
        })
    }

    if (req.body.vendorname) {
      Vendor.findOne({ "name": req.body.vendorname })
        .then(vendor => {
          if (!vendor) {
            errors.noVendor = "Vendor name does not exist";
            res.status(404).json(errors);
          } else {
            packageFields.vendorname = req.body.vendorname;

            if (req.body._id) {
              Package.findOne({ "_id": req.body._id })
                .then(package => {
                  if (!package) {
                    errors.nopackage = "There is no Package with this ID";
                    res.status(404).json(errors);
                  } else {
                    Package.updateOne({ "_id": req.body._id }, { $set: packageFields })
                      .then(res.json(package))
                      .catch(err => console.log(err))
                  }
                })
            } else {
              new Package(packageFields).save()
                .then(package => res.json(package))
                .catch(err => console.log(err));
            }
          }
        });
    }
  }
);

// @route   GET api/profile/all_riders
// @desc    Get all riders
// @access  Private
router.get(
  '/all-riders',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Rider.find({ user: req.user.id })
      .then(riders => {
        if (!riders) {
          errors.norider = 'There are no Riders';
          return res.status(404).json(errors);
        }

        res.json(riders);
      })
      .catch(err => res.status(404).json({ rider: 'There are no riders' }));
  })

// @route   GET api/profile/all_vendors
// @desc    Get all vendors
// @access  Private
router.get(
  '/all-vendors',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Vendor.find({ user: req.user.id })
      .then(vendors => {
        if (!vendors) {
          errors.novendor = 'There are no Vendors';
          return res.status(404).json(errors);
        }

        res.json(vendors);
      })
      .catch(err => res.status(404).json({ vendor: 'There are no vendors' }));
  })

// @route   GET api/profile/all_packages
// @desc    Get all packages
// @access  Private
router.get(
  '/all-packages',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Package.find({ user: req.user.id })
      .then(packages => {
        if (!packages) {
          errors.nopackage = 'There are no Packages';
          return res.status(404).json(errors);
        }

        res.json(packages);
      })
      .catch(err => res.status(404).json({ package: 'There are no packages' }));
  })

// @route   DELETE api/profile/all-packages/:pckg_id
// @desc    Delete package
// @access  Private
router.delete(
  '/all-packages/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Package.findById(req.params.id)
          .then(package => {
            if (package.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: "User not authorized" });
            }

            //Delete
            package.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ packagenotfound: "No package found" }));
      })
  });


// @route   Get api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })      //refers to Profile.js model's user id
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
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
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no Profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })    // req.body.handle means only logged in profile
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
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
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (req.body.handle) profileFeilds.handle = req.body.handle;
    if (req.body.company) profileFeilds.company = req.body.company;
    if (req.body.website) profileFeilds.website = req.body.website;
    if (req.body.location) profileFeilds.location = req.body.location;
    if (req.body.bio) profileFeilds.bio = req.body.bio;
    if (req.body.status) profileFeilds.status = req.body.status;
    if (req.body.githubusername) profileFeilds.githubusername = req.body.githubusername;

    // Skills - Split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFeilds.skills = req.body.skills.split(',');    //Comma separted values
    }

    // Socail
    profileFeilds.social = {};
    if (req.body.youtube) profileFeilds.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFeilds.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFeilds.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFeilds.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFeilds.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFeilds },
            { new: true }
          ).then(profile => res.json(profile))
        } else {
          // Create

          // Check if handle exist
          Profile.findOne({ handle: profileFeilds.handle })
            .then(profile => {
              if (profile) {
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
    if (!isValid) {
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
    if (!isValid) {
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