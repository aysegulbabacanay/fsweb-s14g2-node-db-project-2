const Cars = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try{


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
  }catch(err){
    next(err);
  }
  
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
  const {vin,make,model,mileage}= req.body;
    if(!vin) {
      next({ status:400, message:"vin is missing"});
    } else if (!make) {
        next({ status:400, message:"make is missing"});
      } else  if(!model) {
        next({ status:400, message:"model is missing"});
      } else  if(!mileage) {
        next({ status:400, message:"mileage is missing"});
      }
    // const requiredFields = ["vin", "make", "model", "mileage"];
    // const missingField = requiredFields.find((field) => !req.body[field]);

    // if (missingField) {
    //   next({
    //     status: 400,
    //     message: `${missingField} is missing`,
    //   });
    // }
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
      message: `vin ${vin} already exists`
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