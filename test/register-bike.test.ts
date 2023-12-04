import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('registers a bike with valid data', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'Bike',
                price: 10,
                description: 'A bike',
                stock: 10
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it('returns 400 when trying to register duplicate bike', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'Bike',
                price: 10,
                description: 'A bike',
                stock: 10
            })
            .expect(201)

        await request(server)
            .post('/api/bikes')
            .send({
                name: 'Bike',
                price: 10,
                description: 'A bike',
                stock: 10
            })
            .expect(400)
    }, 20000)
})