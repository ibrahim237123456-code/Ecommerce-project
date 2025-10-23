const express=require('express');
const { register,login } = require('../services/user.services');
const router= express.Router();
const auth = require('../middlewares/auth.middleware')

router.get('/profile', auth, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

router.get('/', (req,res)=>{
    res.send('Users route working!')
})
router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    const {statusCode,data}=await register({username,email,password});
    res.status(statusCode).send(data)
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, data } = await login({ email, password });
  res.status(statusCode).send(data);
});


module.exports=router