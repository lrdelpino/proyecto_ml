import { NextFunction, Request, Response } from "express";
import { enviroment } from "../config/varEntorno";
const jwt = require('jsonwebtoken');

const secretKey = enviroment.PRIVATE_KEY


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.headers['authorization']?.split(' ')[1];

    if (!jwtToken) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(jwtToken, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.locals.user = decoded;
        next();
    });
}
