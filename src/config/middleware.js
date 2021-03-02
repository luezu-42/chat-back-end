const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res, next) => {
    const authToken = req.headers['authorization'];

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

       await jwt.verify(token,process.env.JWTS,(err, data) => {
            if(err){
                console.log(err)
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err:"Token inválido!"});
    } 
}