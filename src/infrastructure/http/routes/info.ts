import express from 'express'
import { getPackageInfo } from '../../../config/metadata'
import { getLogger } from '../../logger'
import { getEnvironment } from '../../../config/env'

const infoRouter = express.Router()
const logger = getLogger()

infoRouter.get('/', (_, res) => {
  const environment = getEnvironment()
  getPackageInfo()
    .then((metadata) =>
      res.json({
        ...metadata,
        environment,
      }),
    )
    .catch((err) => {
      logger.error(err)
    })
})

export default infoRouter
