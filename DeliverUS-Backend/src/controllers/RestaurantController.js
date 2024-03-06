import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
  attributes: { exclude: ['userId'] },
  include: [{
    model: Product,
    as: 'products',
    include: { model: ProductCategory, as: 'productCategory' }
  },
  {
    model: RestaurantCategory,
    as: 'restaurantCategory'
  }],
  order: [[{model:Product, as: 'products'}, 'order', 'ASC']],
}
)

const create = async function (req, res) {
  let newRestaurant = Restaurant.build(req.body)
  try {
    newRestaurant = await newRestaurant.save()
    res.json(newRestaurant)
  } catch (err){
    res.status(500).send(err)
  }


}

const show = async function (req, res) {
  try{
    const restaurant = await Restaurant.findByPk(req.params.restaurantId,{
      iclude: [
        {
          model: RestaurantCategory,
          as: 'restaurantCategory'
        }]
    }
    )
    res.json(restaurant)
  } catch(err){
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try{
    await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })
    const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
    res.json(updatedRestaurant)
  } catch(err){
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Restaurant.destroy({ where: { id: req.params.restaurantId } })
    let message = ''
    if (result === 1) {
      message = 'Successfuly deleted restaurant id.' + req.params.restaurantId
    } else {
      message = 'Could not delete restaurant.'
    }
    res.json(message)
  } catch(err){
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
