# iOS App Info viewer

This tool displays app info about specific iOS apps.

## Setup

```
$ npm i
```

```
$ yarn install
```

## Running the sample

This sample code shows information about some well-known apps.

```
$ npm run sample
```

```
$ yarn run sample
```

After running the sample code, you will see the table below.

```
┌─────────┬───────────┬──────────────────────────────────┬───────────┬──────────────────┐
│ (index) │  trackId  │            trackName             │  version  │ minimumOsVersion │
├─────────┼───────────┼──────────────────────────────────┼───────────┼──────────────────┤
│    0    │ 284882215 │            'Facebook'            │  '415.1'  │      '13.4'      │
│    1    │ 333903271 │            'Twitter'             │  '9.59'   │      '15.0'      │
│    2    │ 389801252 │           'Instagram'            │  '284.0'  │      '13.4'      │
│    3    │ 544007664 │ 'YouTube: Watch, Listen, Stream' │ '18.20.3' │      '14.0'      │
└─────────┴───────────┴──────────────────────────────────┴───────────┴──────────────────┘
```

## Print available keys

If you want see entire available keys, use `keys` command.

```
$ npx ts-node src/main.ts keys --file sample/config.json
```
