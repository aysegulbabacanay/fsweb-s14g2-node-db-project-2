// HOKUS POKUS
const router = require('express').Router();

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');
const carsModel = require("./cars-model");

router.get('/', async(req, res, next) => {
    try{
      const cars = await carsModel.getAll();
      res.status(200).json(cars);
    }
    catch(err){
      next(err);
    }
});

router.get('/:id',checkCarId, async(req, res, next) => {
    try{
      res.status(201).json(req.car);
    }
    catch(err){
      next(err);
    }
});

router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique,async(req,res,next)=>{
  try{
    const newCar = await carsModel.create(req.body);
    res.status(201).json(newCar);
  }
  catch(err){
    next(err);
  }
})

router.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      customMessage: "HATA",
      message: err.message
    });
  });

module.exports = router;