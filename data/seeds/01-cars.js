// ESNEK
const defaultCars = [
    {
      vin: 'JH4KA3263KC011910',
      make: 'Acura',
      model: 'Legend',
      mileage: 1989,
      title: 'Az kullanılmış',
      transmission: 'Manuel',
    },
    {
      vin: '1B3BG26P3FX513068',
      make: 'Dodge',
      model: 'Diplomat',
      mileage: 1985,
      title: 'Az kullanılmış',
      transmission: 'otomatik',
    }
  ]

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("cars").truncate(); // delete ile arasındaki fark tüm tabloyu id de dahil siliyo. (reset gibi)
    await knex("cars").insert(defaultCars);
};
//npm install -g knex