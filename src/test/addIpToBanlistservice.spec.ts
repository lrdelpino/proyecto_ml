// Importa las dependencias necesarias
const fs = require('fs');
const mock = require('mock-fs');
import { IdentificationServices } from "../services/identification.service";
import { banlist } from "../../banlist";

// Configura el sistema de archivos simulado
mock({
  'banlist.ts': 'export let banlist: string[] = [];',
});

describe('addIpToBanlist', () => {
  afterEach(() => {
    mock.restore();
  });

  it('debe agregar una IP a la lista de bloqueados y actualizar el archivo', async () => {
    const ip = '192.168.1.1';

    const result = await IdentificationServices.prototype.addIpToBanlist(ip);

    // Verifica si la función retorna el mensaje correcto
    expect(result).toBe(`la ip ${ip} fue agregada a la banlist`);

    // Verifica si el archivo 'banlist.ts' se actualiza correctamente
    const updatedBanlistContent = fs.readFileSync('banlist.ts', 'utf-8');
    const expectedContent = 'export let banlist: string[] = ["192.168.1.1"];';
    expect(updatedBanlistContent).toBe(expectedContent);
  });

  it('debe manejar el caso en el que la IP ya existe en la lista', async () => {
    const existingIp = '192.168.1.1';
    fs.writeFileSync('banlist.ts', `export let banlist: string[] = ["${existingIp}"];`);

    const result = await IdentificationServices.prototype.addIpToBanlist(existingIp);

    expect(result).toBe('La ip ya existe en la banlist');

    const updatedBanlistContent = fs.readFileSync('banlist.ts', 'utf-8');
    const expectedContent = `export let banlist: string[] = ["${existingIp}"];`;
    expect(updatedBanlistContent).toBe(expectedContent);
    IdentificationServices.prototype.deleteIpFromBanlist('192.168.1.1')
  });

  it('debe manejar errores de escritura de archivos', async () => {
    mock({
      'banlist.ts': mock.file({
        content: 'export let banlist: string[] = [];',
        mode: 0o444, 
      }),
    });

    const ip = '192.168.1.3';

    await expect(IdentificationServices.prototype.addIpToBanlist(ip)).rejects.toThrowError();
  });
});
