const express=require('express')
const router = express.Router();

const {getUser,createUser,updateUser,deleteUser}=require('../controllers/users')
router.route('/login').get(getUser)
router.route('/signup').post(createUser);
router.route('/logout').post(deleteUser);
router.route('/:id').post(updateUser)

module.exports=router;



