const axios = require('axios');
const fs = require('fs');
import { banlist } from "../../banlist";
import { enviroment } from "../config/varEntorno";


export class IdentificationServices {

    async ipIdentification(clientIp: string) {
        try {
            const accessKeyIapi = enviroment.ACCESS_KEY_IAPI;
            const accessKeyExchangeRate = enviroment.ACCESS_KEY_EXCHANGERATE;

            let apiUrl = `http://api.ipapi.com/${clientIp}?access_key=${accessKeyIapi}`;

            const countryApi = await axios.get(apiUrl, { responseType: 'json' });

            apiUrl = `https://restcountries.com/v3.1/alpha/${countryApi.data.country_code}`;

            const countryCurrencies = await axios.get(apiUrl, { responseType: 'json' });

            const currenciesKey = Object.keys(countryCurrencies.data[0].currencies)[0];

            apiUrl = `https://v6.exchangerate-api.com/v6/${accessKeyExchangeRate}/latest/${currenciesKey}`;

            const currenciesComparison = await axios.get(apiUrl, { ResponseType: 'json' });

            const result = {
                country_name: countryApi.data.country_name,
                country_iso: countryApi.data.country_code,
                EUR_conversion: currenciesComparison.data.conversion_rates.EUR,
                USD_conversion: currenciesComparison.data.conversion_rates.USD
            }

            return result
        } catch (err) {
            throw err
        }
    }

    async addIpToBanlist(ip: string) {
        try {

            const archivoIPs = 'banlist.ts';

            const bannedsIps = banlist;

            if (!bannedsIps.includes(ip)) {

                bannedsIps.push(ip);
                const updatedBanlistContent = `export let banlist: string[] = ${JSON.stringify(bannedsIps)};`;
                fs.writeFileSync(archivoIPs, updatedBanlistContent);

                return `la ip ${ip} fue agregada a la banlist`
            } else {
                return 'La ip ya existe en la banlist'
            }
        } catch (err) {
            throw err
        }
    }

    async deleteIpFromBanlist(ip: string) {
        try {
            const archivoIPs = 'banlist.ts';

            const bannedsIps = banlist;

            const index = bannedsIps.indexOf(ip);
            if (index !== -1) {
                banlist.splice(index, 1);
            } else {
                return `no se encontró la ip en la banlist.`;
            }

            const updatedBanlistContent = `export let banlist: string[] = ${JSON.stringify(banlist)};`;

            fs.writeFileSync(archivoIPs, updatedBanlistContent);

            return `ip ${ip} eliminada de la banlist.`;
        } catch (err) {
            throw err;
        }
    }
}
