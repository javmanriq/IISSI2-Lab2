import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  app.route('/path') //the endpoint path
    .get( //the http verb that we want to be available at the previous path
      EntityController.index) // the function that will attend requests for that http verb and that path
    .post( //we can chain more http verbs for the same endpoint
      EntityController.create) // the function that will attend requests for that http verb and that path
    .put( 
      EntityController.update)
    .delete( 
      EntityController.destroy)
}
export default loadFileRoutes
