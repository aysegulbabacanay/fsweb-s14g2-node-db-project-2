const Cars = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
    const car = await Cars.getById(req.params.id);

    if (!car) {
    res.status(404).json({
    message: `${req.params.id} kimliğine sahip araba bulunumadı`
        });  
    } 
    else {
      req.car = car;
      next();
    }
  
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    
    const gerekliAlan = ["vin", "make", "model","mileage"];
    const olmayanAlan = gerekliAlan.filter((ind) => !req.body[ind]);

    if (olmayanAlan) {
      res.status(400).json({
        message: `${olmayanAlan} is missing`,
      });
    } 
    else {
      next();
    }
  } catch (error) {
    next(error);
  }
};


const checkVinNumberValid = (req, res, next) => {
  const{vin}=req.body;
  const dogrulama =vinValidator.validate(vin)
  if(!dogrulama){
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  }
  else{
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const { vin } = req.body;
    const number = await db("cars").where("vin",vin).first();

    if (number) {
      res.status(400).json({
      message: `vin ${req.body.vin} already exists`
     });
    } 
    else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};