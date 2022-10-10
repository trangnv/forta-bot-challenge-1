import {
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

export type HandlerInputs = {
  NETHERMIND_DEPLOY_ADDRESS: string;
  FORTA_CONTRACT_ADDRESS: string;
  CREATE_AGENT_FUNCTION_SIGNATURE: string;
};

export const NETHERMIND_DEPLOY_ADDRESS = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";

export const FORTA_CONTRACT_ADDRESS = "0x61447385b019187daa48e91c55c02af1f1f3f863";

export const CREATE_AGENT_FUNCTION_SIGNATURE =
  "function createAgent(uint256 agentId, address owner, string metadata, uint256[] chainIds)";

export const handlerInputs: HandlerInputs = {
    NETHERMIND_DEPLOY_ADDRESS,
    FORTA_CONTRACT_ADDRESS,
    CREATE_AGENT_FUNCTION_SIGNATURE,
  };

// let findingsCount = 0;

function provideHandleTransaction(): HandleTransaction {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];
    return findings;
  }
}

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  // limiting this agent to emit only 5 findings so that the alert feed is not spammed
  if (findingsCount >= 5) return findings;

  // filter the transaction logs for Tether transfer events
  const tetherTransferEvents = txEvent.filterLog(
    ERC20_TRANSFER_EVENT,
    TETHER_ADDRESS
  );

  tetherTransferEvents.forEach((transferEvent) => {
    // extract transfer event arguments
    const { to, from, value } = transferEvent.args;
    // shift decimals of transfer value
    const normalizedValue = value.div(10 ** TETHER_DECIMALS);

    // if more than 10,000 Tether were transferred, report it
    if (normalizedValue.gt(10000)) {
      findings.push(
        Finding.fromObject({
          name: "High Tether Transfer",
          description: `High amount of USDT transferred: ${normalizedValue}`,
          alertId: "FORTA-1",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          metadata: {
            to,
            from,
          },
        })
      );
      findingsCount++;
    }
  });

  return findings;
};



export default {
  handleTransaction,
  // handleBlock
};
