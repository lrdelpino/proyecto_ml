import { enviroment } from "../config/varEntorno";
const jwt = require('jsonwebtoken');
import { userData } from "../../login"

const secretKey = enviroment.PRIVATE_KEY

export class LoginServices {

    public async login(username: string, password: string) {
        try {
            const result = userData.find(x => x.username == username && x.password == password)

            if (result) {
                // Crea un token JWT
                const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

                return { status: 200, token: token }
            } else {
                return { status: 401, msg: "Credencial Inválida" }
            }
        } catch(err) {
            throw err
        }
    }

}
