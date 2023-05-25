const Product=require('../models/product');

exports.postProduct=async(req,res,next)=>{
    try{
    const product=req.body.product;
    const price =req.body.price;
    const data=await Product.create({
      price:price,
      product:product
    });
    console.log(data);
     res.status(201).json({newProductDetails:data});   
    }
    catch(err){
        res.status(500).json({
          error:err
        });
    };
  }
exports.getProduct=async(req,res,next)=>{
    try{
      const product=await Product.findAll();
      res.status(200).json({allProduct:product});
    }
    catch(err){
      console.log('Get Product is Failing',JSON.stringify(error))
      res.status(500).json({
        error:err
      })
    }
  }


exports.deleteProduct=async(req,res,next)=>{
    try{
      if(req.params.id=='undefined'){
        console.log('ID is missing')
        return res.status(400).json({err:'Id is missing'})
      }
      const pId=req.params.id;
      await Product.destroy({where:{id:pId}});
      res.sendStatus(200);
    }catch(err){
      console.log(err);
      res.status(500).json(err)
    }
  }