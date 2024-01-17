import http from 'node:http'
import ProblemDetail from './problem'

/**
 * Get the problem details which have been defined for an error.
 *
 * @param {Error} error
 * @return {Object} - Problem detail (type, title, status, detail)
 */
export function transformErrorToProblemDetail(error: any): ProblemDetail {
  /**
   * Extract name, message and status (if exists) from error object
   */
  const { name, message, status } = error

  /**
   * Create an instance of Problem Detail.
   * If the error don't contain an HTTP status code, then we'll fall
   * back to a generic 500 (Internal Server Error) status code.
   */
  const problem = ProblemDetail.forStatus(status ?? 500)

  /**
   * If the name extracted from the error object is of type 'string'
   * then we assign the value to the ProblemDetail title, otherwise
   * we assign the name of the HTTP status code.
   */
  if (name != null && typeof name === 'string') {
    problem.title = name
  } else {
    problem.title = http.STATUS_CODES[problem.status]
  }

  /**
   * If the error has a message, we will place this in the detail
   * of the ProblemDetail object
   */
  if (message != null && typeof message === 'string') {
    problem.detail = message
  }

  /** Returns object of ProblemDetail */
  return problem
}
