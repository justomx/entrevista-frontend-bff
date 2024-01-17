import http from 'node:http'
import type { Request, ErrorRequestHandler, Response, NextFunction } from 'express'
import ProblemDetail from '../problem'
import { transformErrorToProblemDetail } from '../transform'

/**
 * Send an error response using the problem details format.
 *
 * @see https://tools.ietf.org/html/rfc7807
 *
 * @param {Error} error - Error
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express callback function
 */
const problemDetailMiddleware: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (response.headersSent) {
    next(error)
    return
  }

  /**
   * Set the correct media type for a response containing a
   * JSON formatted problem details object.
   *
   * @see https://tools.ietf.org/html/rfc7807#section-3
   */
  response.set('Content-Type', 'application/problem+json')

  /**
   * Check if the current error is a ProblemDetail instance, otherwise
   * then transform the error into a ProblemDetail object.
   */
  const problem = error instanceof ProblemDetail ? error : transformErrorToProblemDetail(error)

  /**
   * Set the instance from original URL of request.
   */
  problem.instance = request.originalUrl

  /**
   * If the problem detail object doesn't have title, then
   * we assign the name of the HTTP status code.
   */
  if (problem.title == null) {
    problem.title = http.STATUS_CODES[problem.status]
  }

  /** Set timestamp in problem detail object */
  const now = new Date()
  const currentRecord = problem.record
  problem.record = {
    ...currentRecord,
    timestamp: now,
    time: now.getTime(),
  }

  /**
   * Set the response status code and a JSON formatted body
   * containing the problem details.
   */
  response.status(problem.status).json(problem.toDTO())

  /**
   * Ensure any remaining middleware are run.
   */
  next()
}

export default problemDetailMiddleware
