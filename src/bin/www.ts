import http from 'node:http'
import { getLogger } from '../infrastructure/logger'
import { Environment } from '../config/env'
import { appConfig } from '../config'
import { createExpressServer } from '../infrastructure/http/server'

const { port, environment: env, contextPath } = appConfig.server

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  const express = await createExpressServer({ contextPath })

  const httpServer = http.createServer(express)
  httpServer.listen(port)
  httpServer.on('error', onError)
  httpServer.on('listening', onListening)
})()

const logger = getLogger()

function onError(error: any): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(): void {
  let where: string
  if (env === Environment.LOCAL) {
    where = `at http://localhost:${port}`
  } else {
    where = `on port ${port}`
  }
  logger.info({ env, port }, `⚡️ Server is running ${where}`)
}
