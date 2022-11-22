let { User } = require("../schemas/user.schema");

const jwt=require('jsonwebtoken');

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
        { expiresIn: "14d" }
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
    const newUser = new User({ username, email,password,});
   
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
        { expiresIn: "1d" }
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
  });
exports.deleteUser=('/logout',async (req,res)=>{
    const authHeaders=req.headers['authorization']
    jwt.sign(authHeaders,'', { expiresIn: 1 } , (logout, err) => {
        if (logout) {
        res.send({msg : 'You have been Logged Out' });
        } else {
        res.send({msg:'Error'});
        }
    })
}); 
  
   
  
  