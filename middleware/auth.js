import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader) {
        return res.status(401).json({message: 'Unautorized: no tokin provided'});
    }
    
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({error_message: "Unauthorized"});
    }
}

export default authenticate;
