const fs = require('fs-extra');
const mock = require('mock-fs');
import { IdentificationServices } from "../services/identification.service";

mock({
    'banlist.ts': 'export let banlist: string[] = ["192.168.1.1"];', // Una lista de ejemplo con dos IPs
});


describe('deleteIpFromBanlist', () => {
    afterEach(() => {
        mock.restore();
    });

    it('debe eliminar una IP de la lista y actualizar el archivo', async () => {
        const ipToDelete = '192.168.1.1';

        await IdentificationServices.prototype.addIpToBanlist('192.168.1.1');

        const result = await IdentificationServices.prototype.deleteIpFromBanlist(ipToDelete);


        expect(result).toBe(`ip ${ipToDelete} eliminada de la banlist.`);


        const updatedBanlistContent = fs.readFileSync('banlist.ts', 'utf-8');
        const expectedContent = 'export let banlist: string[] = [];';
        expect(updatedBanlistContent).toBe(expectedContent);
    });

    it('debe manejar el caso en el que la IP no existe en la lista', async () => {
        const nonExistentIp = '192.168.1.3';

        const result = await IdentificationServices.prototype.deleteIpFromBanlist(nonExistentIp);

        expect(result).toBe('no se encontró la ip en la banlist.');


        const updatedBanlistContent = fs.readFileSync('banlist.ts', 'utf-8');
        const expectedContent = 'export let banlist: string[] = [];';
        expect(updatedBanlistContent).toBe(expectedContent);
    });
});