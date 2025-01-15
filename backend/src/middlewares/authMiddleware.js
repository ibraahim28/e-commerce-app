const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const authenticateUser = async (req, res, next) => {
    try {
        const headers = req.headers;
        const token = headers.authorization.split("Bearer ")[1];
        if (!token) return res.status(404).send({success : false, error : 'Token not found'})
            const isVerified = jwt.verify(token, process.env.Secret_Key)
            if (!isVerified) return res.status(401).send({success : false, error : "Invalid Token"})
                const decodedToken = jwt.decode(token, process.env.Secret_Key);
                 req.user = decodedToken;
                 next();
    } catch (error) {
        res.status(500).send({success : false, error : error.message})
    }
}