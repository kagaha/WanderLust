const Joi = require('joi');
const categoryOptions = [
    "Trending",
    "Boats",
    "Rooms",
    "Camping",
    "Towers",
    "Beach",
    "Pools",
    "Mountains",
    "castle",
    "Farms",
    "Mountain-city",
  ];
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
        category: Joi
        .array().items(Joi.string()
        .valid(...categoryOptions))
        .required(),
    }).required()
});
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        content:Joi.string().required()
    }).required()
});