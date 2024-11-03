import handleError from './errorHandler'
import sendRequestToExternalServer from './externalRequest'
import { inputSchema, responseSchema } from './validationSchemas'

async function mainHandler(context: any, req: any) {
  const { error, value } = inputSchema.validate(req.body)
  if (error) {
    handleError(context, 400, `Validation error: ${error.details[0].message}`)
    return
  }
  try {
    const externalResponse = await sendRequestToExternalServer(
      req.body.link,
      req.body.title
    )
    const { error: responseError, value: validatedResponse } =
      responseSchema.validate(externalResponse.data)
    if (responseError) {
      handleError(
        context,
        502,
        `Response validation error: ${responseError.details[0].message}`
      )
      return
    }
    context.res = {
      status: 200,
      body: validatedResponse,
    }
  } catch (err) {
    if (err instanceof Error) {
      handleError(context, 500, `Server error: ${err.message}`)
    } else {
      handleError(context, 500, 'Unknown server error')
    }
  }
}
export default mainHandler
