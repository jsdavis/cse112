'use strict';

/* This module is meant to house the functions
 * used by the authorization (auth) API. The
 * actual API is set up in index.js

 Functions:
 authSignup()
 authLogin()
 authResetCredentials()
 */


/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
const Company = require('../../models/Company');

/** **** Company TEMPLATE ROUTES ******/
module.exports.template = {};

/** signup- Used to sign up a user.*/
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.create = function(req, res) {
  const company = new Company();

    // require provided info
  company.name = req.body.company_name;
  company.date=new Date();
    // optinal info
    /* company.expiration_date=req.body.expiration_date;
    company.credit_card_number=req.body.credit_card_number;
    */
  company.save((err, c) => {
    if(err) {
      return res.status(400).json({error: 'Could Not Save'+JSON.stringify(err)});
    }
    return res.status(200).json(showCompanyPublicInfo(c));
  });
};


module.exports.template.updateAdminList = function(req, res) {
  const params = req.body;

  Company.findCompany(params, (err, company) => {
    if(err)
      return res.status(400).json({error: 'Can not Update'});

    company.company_name = params.company_name;
    const index = company.adminUser.indexOf(req.params.userId);
    if(index < 0)
      company.adminUser.push(req.params.userid);


    company.save((err) => {
      if (err)
        return res.status(400).json({error: 'Can not Save'});
      const companyJson = company.toJSON();
      return res.status(200).send(companyJson);
    });
  });
};

/** get All the companies*/
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.getAll = function(req, res) {
  Company.find({},
    {
      credit_card_number: false,
      expiration_date: false,
    }
        , (err, result) => {
          if(err) {
            return res.status(400).json(err);
          }
          return res.status(200).json(result);
        });
};

/** authLogin- logs in a user*/
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.get = function(req, res) {
  Company.findOne({_id: req.params.id}, (err, company) => {
    if(err || !company)
      return res.status(400).json({
        error: 'Could not find company with id ' + req.params.id,
        params: req.params,
        message: err,
      });
    return res.status(200).json(showCompanyPublicInfo(company));
  });
};

/* update the company info */
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.update = function(req, res) {
  Company.findOne({_id: req.params.id}, (err, c) => {
    if(err || !c)
      return res.status(401).json({error: 'Could Not Find'});

        // update email
    if (req.body.email !== undefined)
      c.email = req.body.email;

        // update company name
    if (req.body.name !== undefined)
      c.name = req.body.name;

        // update company's phone number
    if (req.body.phone_number !== undefined)
      c.phone_number = req.body.phone_number;

    c.save((err) => {
      if(err) {
        return res.status(400).json({error: 'Could Not Save'});
      }
      return res.status(200).json(showCompanyPublicInfo(c));
    });
  });
};

/* delete company */
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.delete = function(req, res) {
  Company.findById(req.params.id, (err, c) => {
    if(err)
      res.status(400).json({error: 'Could Not Find'});
    c.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Could Not Save'});
      } else {
        return res.status(200).json(showCompanyPublicInfo(c));
      }
    });
  });
};

/** authResetCredentials- resets a user's credentials*/
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} req
 * @param {TYPE} res
 */
module.exports.template.resetCredentials = function(req, res) {
  Company.findOne({email: req.params.user}, (err, c) => {
    if(err || !c)
      return res.status(400).json({error: 'Could Not Find'});


        // if the user is found but the password is wrong
    if(!c.validPassword(req.body.password))
      return res.status(400).send('loginMessage', 'Oops! Wrong password');
        // update password

        // upadate password
    if (req.body.newpassword !== undefined)
      c.password = c.generateHash(req.body.newpassword);

        // update email
    if (req.body.newemail !== undefined)
      c.email = req.body.newemail;

        // update company name
    if (req.body.new_company_name !== undefined)
      c.company_name = req.body.new_company_name;

        // update company's phone number
    if (req.body.new_company_phone_number !== undefined)
      c.company_phone_number = req.body.new_company_phone_number;

    c.save((err) => {
      if(err) {
        res.status(400).send({error: 'Could Not Save'});
      }
    });
    return res.status(200).json(showCompanyPublicInfo(c));
  });
};

/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} c
 * @return {TYPE} obj
 */
function showCompanyPublicInfo(c) {
  return {
    _id: c._id,
    name: c.name,
    phone_number: c.phone_number,
    date: c.date,
  };
}
