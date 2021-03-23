const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Token não encontrado' });
    
    jwt.verify(token, process.env.JWTS, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação do token' });
      
      req.userId = decoded.id;
      next();
    });
}

module.exports = verifyJWT