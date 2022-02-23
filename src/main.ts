import * as fs from 'fs';
import axios from 'axios';
import yargs from 'yargs';

interface Config {
    keys: [string],
    country: string,
    appIds: [string]
}

interface AppInfo {
    [key: string]: any
}

const argv = yargs(process.argv.slice(2)).options({
    i: { type: 'string', demandOption: true }
}).argv;

const loadConfig = (filePath: string) => {
    let rawData = fs.readFileSync(filePath)
    return JSON.parse(rawData.toString())
}

const downloadAppInfo = async (url: string) => {
    return await axios.get(url).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
};

const parseAppInfo = (rawData: any, keys: [string]): any => {
    let result = rawData['results'][0]
    let appInfo: AppInfo = {}
    keys.forEach((key) => {
        appInfo[key] = result[key]
    });
    return appInfo
};

const main = () => {
    (async () => {
        let baseUrl = "https://itunes.apple.com/lookup?id=APP_ID&country=COUNTRY"
        // @ts-ignore
        let config: Config = loadConfig(argv.i)
        let list = []
        for (const id of config.appIds) {
            let appInfo = await downloadAppInfo(baseUrl.replace('APP_ID', id).replace('COUNTRY', config.country))
            let result = parseAppInfo(appInfo, config.keys)
            list.push(result)
        }
        console.table(list);
    })();
};

main();