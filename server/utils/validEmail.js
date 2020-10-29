module.exports = (req, res, next) => {
    const { name, email, password } = req.body;

    const validEmail = (userEmail) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if (req.path === '/register') {
        if (![name, email, password].every(Boolean)) {
            return res.json('Missing Credentials');
        } else if (!validEmail(email)) {
            return res.json('Invalid Email son');
        }
    } else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.json('Missing Credentials')
        } else if (!validEmail(email)) {
            return res.json('Invalid Email')
        }
    }
    next();
}