const catchError = require('../utils/catchError')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async (req, res) => {
    const results = await User.findAll()
    return res.json(results)
})

const create = catchError(async (req, res) => {
    const result = await User.create(req.body)
    return res.status(201).json(result)
})


const remove = catchError(async (req, res) =>{
    const { id } = req.params
    await User.destroy({where:{id}})
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const { id } = req.params
    
    delete req.body.password
    delete req.body.email

    const { password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const body = { ...req.body, password:hashedPassword}

    const user = await User.findByPk(id)
    if(!user) return res.sendStatus(404)

    const userUpdate = await User.update(
        body,
        {
            where: {id}, returning: true
        }
    )
    return res.json(userUpdate)
})

const login = catchError(async (req, res) =>{
    const {email, password} = req.body

    const user = await User.findOne({where: {email}})

    if(!user) return res.status(401).json({error: "Invalid Credentials 🙅🏻‍♂️"})

    console.log(user)
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({error:"Invalid Credential 🙅🏻‍♂️"})

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
    )
        return res.json({user, token})
})
module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}