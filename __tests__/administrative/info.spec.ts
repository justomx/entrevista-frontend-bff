import supertest from 'supertest'
import { createExpressServer } from '../../src/infrastructure/http/server'
import { Application } from 'express'

describe('make an HTTP request to get app info', () => {
  let server: Application

  beforeAll(async () => {
    server = await createExpressServer({ contextPath: '/' })
  })

  test('must respond with 200 OK and name property has app name', async () => {
    const response = await supertest(server).get('/info')

    expect(response.status).toBe(200)
    expect(response.get('Content-Type')).toContain('application/json')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('author')
    expect(response.body).toHaveProperty('version')
    expect(response.body).toHaveProperty('keywords')
    expect(response.body).toHaveProperty('environment')
  })
})
