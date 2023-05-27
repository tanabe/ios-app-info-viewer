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

const BASE_URL = "https://itunes.apple.com/lookup?id=APP_ID&country=COUNTRY"

const defineCommands = () => {
    yargs.command({
        command: 'show',
        describe: 'show app info',
        builder: {
            file: {
                describe: 'config file',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            // @ts-ignore
            let config: Config = loadConfig(argv.file)
            printTable(config)

        }
    })

    yargs.command({
        command: 'keys',
        describe: 'print available keys',
        builder: {
            file: {
                describe: 'config file',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            // @ts-ignore
            let config: Config = loadConfig(argv.file)
            printKeys(config)
        }
    })

    yargs.parse()
}

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
    })
}

const parseAppInfo = (rawData: any, keys: [string]): any => {
    let result = rawData['results'][0]
    let appInfo: AppInfo = {}
    //console.log(Object.keys(result).sort())
    keys.forEach((key) => {
        appInfo[key] = result[key]
    })
    return appInfo
};

const printTable = async (config: Config) => {
    let list = []
    for (const id of config.appIds) {
        let appInfo = await downloadAppInfo(BASE_URL.replace('APP_ID', id).replace('COUNTRY', config.country))
        let result = parseAppInfo(appInfo, config.keys)
        // @ts-ignore
        list.push(result)
    }
    console.table(list)
}

const printKeys = async (config: Config) => {
    let id = config.appIds[0]
    let appInfo = await downloadAppInfo(BASE_URL.replace('APP_ID', id).replace('COUNTRY', config.country))
    let result = appInfo['results'][0]
    console.log(Object.keys(result).sort())
}

const main = () => {
    (async () => {
        defineCommands()
    })()
};

main()
