import supertest from 'supertest'
import { createExpressServer } from '../../src/infrastructure/http/server'
import { Application } from 'express'

// TODO: pending to resolve this integration testing
describe.skip('Make an HTTP request to get health information', () => {
  let server: Application

  beforeAll(async () => {
    server = await createExpressServer({ contextPath: '/' })
  })

  test('all it is OK, must respond 200 OK and the health status is Up', async () => {
    const response = await supertest(server).get('/health')

    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Up')
  })

  test('when ping failed, must respond 500 and health status is Down', async () => {
    const response = await supertest(server).get('/health')

    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Down')
  })
})
