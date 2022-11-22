let { User } = require("../schemas/user.schema");

const jwt=require('jsonwebtoken');

exports.getUsers=('/',(req,res,next)=>{
    res.json({success:true,msg:"Show all users"})
    next()
  });
 exports.getUser=("/login", async (req, res, next) => {
    let { username,email, password } = req.body;
   
    let existingUser;
    try {
      existingUser = await User.findOne({ username:username,email: email });
    } catch(err) {
      const error = new Error(err);
      return next(error);
    }
    if (!existingUser || existingUser.password != password) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error(err);
      return next(error);
    }
   
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
      });
  });

  exports.createUser=("/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
   
    try {
      await newUser.save();
    } catch (err){
      const error = new Error(err);
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        "THisIsTheSuperSEcretkey",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res
      .status(201)
      .json({
        success: true,
        data: { userId: newUser.id,
            email: newUser.email, token: token },
      });
  });
  exports.updateUser= ('/:id',async (req,res)=>{
    
    res.status(201).json({success:true})
    // next()
  });
exports.deleteUser=('/:id',(req,res)=>{
    res.status(200).json({success:true,msg:`deleted ${req.params.id}`})
    // next()
  });
  
   
  // Handling post request
  