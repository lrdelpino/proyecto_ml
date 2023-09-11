import { enviroment } from "../config/varEntorno";
import { IdentificationServices } from "../services/identification.service";
const mock = require('mock-fs');


const accessKeyIapi = enviroment.ACCESS_KEY_IAPI;
const accessKeyExchangeRate = enviroment.ACCESS_KEY_EXCHANGERATE;

describe('ipIdentification', () => {
    afterEach(() => {
        mock.restore();
    });

    it('debe devolver datos de identificación de IP correctamente', async () => {
        
        const result = await IdentificationServices.prototype.ipIdentification("200.61.165.201");

        expect(result.country_name).toEqual('Argentina');
        expect(result.country_iso).toEqual('AR')
    });

    it('debe manejar errores de red correctamente', async () => {
        // Configura el mock para simular un error de red

        // Asegúrate de que la función arroje un error en caso de una solicitud fallida
        await expect(IdentificationServices.prototype.ipIdentification("")).rejects.toThrowError();
    });
});
