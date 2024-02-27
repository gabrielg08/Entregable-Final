const catchError = require('../utils/catchError')
const Product = require('../models/Product');
const Category = require('../models/Category');


const getAll = catchError(async (req, res) => {
    const { category } = req.query
    const results = await Product.findAll({
        include: [Category],
        where: { categoryId: category }
    });

    return res.json(results)
})

const create = catchError(async (req, res) => {

    const product = await Product.create(req.body)
    return res.status(201).json(product)
})

const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const user = await Product.findByPk(id)

    if(!user) res.send("Product not found. 🔍").status(404)
    return res.json(user)
})

const remove = catchError(async (req, res) => {
    const { id } = req.params
    const user = await Product.destroy({where: {id}})

    if(!user) res.sendStatus(404)
    return res.send('Product Deleted. 🗑️').status(204)
})

const update = catchError(async(req, res) => {
    const { id } = req.params

    const product = await Product.update(
        req.body,
        {where: {id}, returning:true}
        )
    if(!product[0]===0) return res.sendStatus(404)
    return res.json(product[1][0])
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}