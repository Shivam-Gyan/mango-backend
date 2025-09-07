import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const jwtAuthMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is required', success: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: 'Invalid token', success: false });
        }
        console.log('Decoded JWT:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Invalid or expired token', success: false });
    }
};
export default jwtAuthMiddleware;