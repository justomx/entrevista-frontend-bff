import { type RequestHandler } from 'express'
import ProblemDetail from '../../rfc7807/problem'

const notFoundMiddleware: RequestHandler = (_req, _res, next) => {
  /**
   * Create an instance of ProblemDetail with HTTP status code
   * and detail message.
   */
  const detail = 'Oops, it looks like this endpoint ventured into the universe.'
  const problem = ProblemDetail.forStatusAndDetail(404, detail)

  /**
   * Ensure any remaining middleware are run.
   */
  next(problem)
}

export default notFoundMiddleware
