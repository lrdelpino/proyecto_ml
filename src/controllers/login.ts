import { Request, Response } from "express";
import { LoginServices } from "../services/login.service";

export class LoginController {

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const result = await LoginServices.prototype.login(username, password);

            if(result.status == 401) {
                return res.status(401).json(result.msg)
            }

            return res.status(200).json(result.token)
        } catch(error) {

        }
    }
}

