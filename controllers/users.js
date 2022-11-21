let { User } = require("../schemas/user.schema");



exports.getUsers=('/',(req,res,next)=>{
    res.json({success:true,msg:"Show all users"})
    next()
  });
exports.getUser=('/:id',(req,res,next)=>{
    res.json({success:true,msg:`created new ${req.params.id}`})
    next()
  });
  
exports.createUser= ('/:id',async (req,res,next)=>{
    const user= await User.create(req.body)
    res.status(201).json({success:true,data:user})
    next()
  });
  exports.updateUser= ('/:id',async (req,res,next)=>{
    
    res.status(201).json({success:true})
    next()
  });
exports.deleteUser=('/:id',(req,res,next)=>{
    res.status(200).json({success:true,msg:`deleted ${req.params.id}`})
    next()
  });