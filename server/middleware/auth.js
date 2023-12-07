import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
    try {
        const token = await request.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(
            token,
            `${process.env.JWT_SECRET}`
        );
        const user = await decodedToken;
        request.user = user;
        next();
    } catch (error){
        response.status(401).json({
            error: new Error("Token required!"),
    });
    }
}

export default auth;