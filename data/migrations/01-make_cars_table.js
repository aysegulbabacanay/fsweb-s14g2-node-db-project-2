exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTable("cars", tbl=>{
    tbl.increments(); // id için
    tbl.string("vin",17).notNullable().unique();
    tbl.string("make",128).notNullable();
    tbl.string("model").notNullable();
    tbl.integer("mileage").notNullable().unsigned();
    tbl.string("title");
    tbl.string("transmission");
  })
  
};

exports.down = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.dropTableIfExists("cars");
};