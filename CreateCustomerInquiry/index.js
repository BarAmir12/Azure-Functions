const axios = require('axios');
const Joi = require('joi');

// סכימת הולידציה של התשובה

const responseSchema = Joi.object({
  summary: Joi.string().required(),
  alternatives: Joi.object({
    contradictory: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        link: Joi.string().uri().required()
      })
    ).required(),
  }).required(),
  additionalInfo: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      link: Joi.string().uri().required()
    })
  ).optional()
});

// סכימת הולידציה של הקלט
const inputSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required()
});

module.exports = async function (context, req) {
  // שלב ראשון: ולידציה של הקלט
  const { error, value } = inputSchema.validate(req.body);
  console.log('xxxxxxxxxx')
  if (error) {
    context.res = {
      status: 400,
      body: `The validation error in the input: ${error.details[0].message}`
    };
    return;
  }

  try {
    // שליחת בקשה לשרת חיצוני
    const externalResponse = await axios.post(req.body.link, req.body.title);
    

    // ולידציה של התשובה מהשרת החיצוני
    const { error: responseError, value: validatedResponse } = responseSchema.validate(externalResponse.data);

    if (responseError) {
      context.res = {
        status: 502,
        body: `The validation error in the response: ${responseError.details[0].message}`
      };
      return;
    }

    // החזרת התשובה התקינה ללקוח
    context.res = {
      status: 200,
      body: validatedResponse
    };
  } catch (err) {
    // טיפול בשגיאות שרת
    context.res = {
      status: 500,
      body: `Server error: ${err.message}`
    };
  }
};
