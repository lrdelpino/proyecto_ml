import { NextFunction, Request, Response } from "express";
import { banlist } from "../../banlist";

export function verifyBan(req: Request, res: Response, next: NextFunction) {
    
    // Esta constante se usa cuando se ejecuta una peticion fuera del servidor de node
    // const ipForValidate = req.ip
    
    // Esta variable se usa para las pruebas internas
    const ipForValidate = "200.61.165.201";

    const result = banlist.find(x => x == ipForValidate);

    if(result) {
        return res.status(403).json({ msg: 'Forbidden' });
    } else {
        next()
    }
}