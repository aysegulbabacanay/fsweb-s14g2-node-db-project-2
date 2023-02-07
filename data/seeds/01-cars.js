// ESNEK
const defaultCars = [
    {
      vin: '123',
      make: 'Toyata',
      model: 'Corolla',
      mileage: 95000,
      title: 'clean',
      transmission: 'CVT',
    },
    {
      vin: '3162',
      make: 'Audi',
      model: 'A7',
      mileage: 70000,
      title: 'clean',
      transmission: 'manual',
    }
  ]

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("cars").truncate();
    await knex("cars").insert(defaultCars);
};
//npm install -g knex