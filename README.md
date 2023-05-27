# iOS App Info viewer

This tool displays app info about specific iOS apps.

## Setup

```
$ npm i
```

## Running the sample

```
$ npx ts-node src/main.ts -i sample/config.json
┌─────────┬───────────┬──────────────────────────────────┬───────────┬──────────────────┐
│ (index) │  trackId  │            trackName             │  version  │ minimumOsVersion │
├─────────┼───────────┼──────────────────────────────────┼───────────┼──────────────────┤
│    0    │ 284882215 │            'Facebook'            │  '354.0'  │      '12.4'      │
│    1    │ 333903271 │            'Twitter'             │   '9.1'   │      '13.4'      │
│    2    │ 389801252 │           'Instagram'            │  '223.0'  │      '12.0'      │
│    3    │ 544007664 │ 'YouTube: Watch, Listen, Stream' │ '17.07.2' │      '12.0'      │
└─────────┴───────────┴──────────────────────────────────┴───────────┴──────────────────┘
```
