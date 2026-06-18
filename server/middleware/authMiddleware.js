import User from "../models/User.js";
export const protect = async (req, res, next) => {
    try {
         
        const { userId } = req.auth();
        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}