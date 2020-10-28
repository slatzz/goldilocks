const router = require('express').Router();
const { db } = require('../db/index.js')

// Signup/Register
router.post('/register', async (req, res) => {
    try {
        //1. Destructure the req.body (name, email, password)
        const { name, email_address, password } = req.body;
        //2. Check if user exists
        console.log(email_address);
        const user = await db.query(`SELECT * FROM users2 WHERE email = $1`, [email_address])
        res.json(user.rows);
        // 2.a. If exists, throw error

        //2.b. If not, bcrypt user's password

        //2.c. Add user to database

        // 3. Generate JWT 

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


router.get('/', (req, res) => {
    res.json({ message: '👽' })
});
module.exports = router;