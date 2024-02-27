const catchError = require('../utils/catchError')
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getAll = catchError(async (req, res) => {
    const userId = req.user.id    
    const results = await Cart.findAll({
        where: { userId },
        include: [{
            model: Product,
            attributes: ["title"]
        }]
    });

    return res.json(results)
})

const create = catchError(async (req, res) => {
    const userId = req.user.id
    const { quantity, productId } = req.body
    const newBody = { userId, quantity, productId}
    const product = await Cart.create(newBody)
    return res.status(201).json(product)
})


const remove = catchError(async (req, res) => {
    const { id } = req.params
    const user = await Cart.destroy({where: {id}})

    if(!user) res.sendStatus(404)
    return res.send('Cart Deleted. 🗑️').status(204)
})

const update = catchError(async(req, res) => {
    const { id } = req.params

    const product = await Cart.update(
        req.body,
        {where: {id}, returning:true}
        )
    if(!product[0]===0) return res.sendStatus(404)
    return res.json(product[1][0])
})


module.exports = {
    getAll,
    create,
    remove,
    update
}