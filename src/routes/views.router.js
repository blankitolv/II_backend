import { Router } from "express";
import User from "../models/users.models.js";
import { passportCall, isLoggedIn } from "../middleware/passport.middleware.js";

const router = Router()

router.get('/login', isLoggedIn, (req, res) => {
    const error = req.query.error
    res.render('login', {error})  
})

router.get('/register', (req, res) => {
    const error = req.query.error
    res.render('register', {error})
})

router.get('/current', passportCall('jwt'), async (req, res) => {
    const user = await User.findById(req.user.id).lean()
    res.render('current', {user})
})

export default router