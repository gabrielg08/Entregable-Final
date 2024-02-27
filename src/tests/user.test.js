const request = require("supertest")
const app = require("../app")

const URL_BASE = '/users'
let TOKEN
let userId

const user = {
    firstName: 'Claudia',
    email: 'test@test.com',
    lastName: 'Rivas',
    password: 'test1',
    phone: '+18098098091'
}

beforeAll(async () => {
    const user = {
        email: 'test@test.com',
        password: 'test1'
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)
    
        TOKEN = res.body.token
})

test("GET -> 'URL_BASE', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)
    .get(URL_BASE)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.firstName === user.firstName ", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(user)
   
    userId = res.body.id
        
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("PUT -> 'URL_BASE/:id', should return status code 200, res.body to be defined and res.body.firstName = 'Claudia'", async() =>{
    const res = await request(app)
        .put(`${URL_BASE}/${userId}`)
        .send({firstName: "Claudia"})
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('Claudia')
})