# Bot deployment alert

## Description

This bot detects when a forta agent is deployed by Nethermind address
`0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8`

## Supported Chains

- Polygon

## Alerts

- NM-1
  - 

## Test Data

The agent behaviour can be verified with the following transactions:

- [0x009b7838845d55b6200a3d35c41d99d60c14abb2744b11470c5c02a9ce49e051](https://polygonscan.com/tx/0x009b7838845d55b6200a3d35c41d99d60c14abb2744b11470c5c02a9ce49e051)


## Brainstorming
- [Polyscan Nethermind address](https://polygonscan.com/address/0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8): called `createAgent`, `disableAgent`, ... functions of [Forta Agents contract](https://polygonscan.com/address/0x61447385b019187daa48e91c55c02af1f1f3f863)
- check if txEvent = DEPLOYER_ADDRESS (= Nethermind address)

## Pseudo code
- 
