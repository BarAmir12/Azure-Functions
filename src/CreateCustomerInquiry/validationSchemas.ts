import Joi from 'joi'

// Validation schema for the response
export const responseSchema = Joi.object({
  summary: Joi.string().required(),
  alternatives: Joi.object({
    contradictory: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          link: Joi.string().uri().required(),
        })
      )
      .required(),
  }).required(),
  additionalInfo: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        link: Joi.string().uri().required(),
      })
    )
    .optional(),
})

// Validation schema for the input
export const inputSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required(),
})
