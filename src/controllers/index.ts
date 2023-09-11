import { Request, Response } from "express";
import { IdentificationServices } from "../services/identification.service";
const ipAddress = require('ip-address');

export class IpIdentificationController {

    public async getIdIdentification(req: Request, res: Response){
        try {

            // Esta constante se usa cuando se ejecuta una peticion fuera del servidor de node
            // const clientIp = req.ip;

            // Esta variable se usa para las pruebas internas
            const clientIp = "200.61.165.201";

            const result = await IdentificationServices.prototype.ipIdentification(clientIp);

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ msg: "ha ocurrido un error al procesar la peticion", error: error })
        }
    }

    public async addIpToBanlist(req: Request, res: Response) {
        try {

            const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            const ip = req.body.ip;

            if (!ip) {
                return res.status(400).json({ msg: 'la ip no puede estar vacia' });
            }

            if (!ip.match(ipRegex)) {
                return res.status(400).json({ msg: 'La dirección ip no tiene un formato válido' });
            }

            const result = await IdentificationServices.prototype.addIpToBanlist(ip);

            return res.status(200).json({ msg: result })
        } catch(error) {
            return res
                .status(500)
                .json({ msg: 'Ha ocurrido un error al agregar la ip a la banlist', error: error })
        }
    }

    public async deleteIpFromBanlist(req: Request, res: Response) {
        try {

            const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            const ip = req.body.ip;

            if (!ip) {
                return res.status(400).json({ msg: 'la ip no puede estar vacia' });
            }

            if (!ip.match(ipRegex)) {
                return res.status(400).json({ msg: 'La dirección ip no tiene un formato válido' });
            }

            const result = await IdentificationServices.prototype.deleteIpFromBanlist(ip);

            return res.status(200).json({ msg: result})
        } catch(error) {
            return res
                .status(500)
                .json({ msg: 'Ha ocurrido un error al intentar borrar la ip de la banlist', error: error })
        }
    }
}