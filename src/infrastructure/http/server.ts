import express, { type Application } from 'express'
import cors from 'cors'
import initApmService from '../apm'

/** Middlewares */
import problemDetailMiddleware from '../rfc7807/middleware'
import notFoundMiddleware from './middlewares/not-found'

/** Routes */
import healthRouter from './routes/health'
import infoRouter from './routes/info'
import { getOrders } from '../../app/orders'

interface Params {
  contextPath: string
}

export async function createExpressServer({ contextPath }: Params): Promise<Application> {
  initApmService()

  const server = express()
  server.disable('x-powered-by')

  server.use(cors())
  server.use(express.json({ limit: '15mb' }))
  server.use(express.urlencoded({ extended: true }))

  // Register administration endpoints
  server.use('/health', healthRouter)
  server.use('/', infoRouter)
  server.use('/info', infoRouter)

  const app = express.Router()
  // Register core endpoint and resources
  // e.g. app.use('/users', userRouter)
  app.get('/order', (req, res) => {
    getOrders(req, res)
      .then(() => null)
      .catch(() => res.status(500))
  })

  server.use(contextPath, app)

  server.use(notFoundMiddleware)
  server.use(problemDetailMiddleware)

  return server
}
