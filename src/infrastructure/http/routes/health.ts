import express from 'express'
import { healthcheck } from '../../healthcheck'
import { getLogger } from '../../logger'
import ProblemDetail from '../../rfc7807/problem'

const logger = getLogger()

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
  healthcheck()
    .then((health) => res.status(health.status === 'Up' ? 200 : 500).json(health))
    .catch((err) => {
      logger.error(err)
      throw ProblemDetail.forStatusAndDetail(500, 'Error evaluating healthcheck')
    })
})

export default healthRouter
