const {sequelize} = require('./db')
const { Restaurant, Menu } = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        await Restaurant.bulkCreate(seedRestaurant);
        await Menu.bulkCreate(seedMenu);
    });

    test('can create a Restaurant', async () => {
        const newRestaurant = await Restaurant.create(seedRestaurant[0]);
        expect(newRestaurant.name).toBe(seedRestaurant[0].name);
    });

    test('can create a Menu', async () => {
        const newMenu = await Menu.create({ title: 'New Menu' });
        expect(newMenu.title).toBe('New Menu');
    });

    test('can find Restaurants', async () => {
        const restaurants = await Restaurant.findAll();
        expect(restaurants).toHaveLength(seedRestaurant.length);
    });

    test('can find Menus', async () => {
        const menus = await Menu.findAll();
        expect(menus).toHaveLength(seedMenu.length);
    });

    test('can delete Restaurants', async () => {
        const restaurant = await Restaurant.findOne({ where: { name: seedRestaurant[0].name } });
        await restaurant.destroy();
        const deletedRestaurant = await Restaurant.findOne({ where: { name: seedRestaurant[0].name } });
        expect(deletedRestaurant).toBeNull();
    });
})