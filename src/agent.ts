import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

export const DEPLOYER_ADDRESS: string =
  "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";
export const FORTA_CONTRACT = "0x61447385B019187daa48e91c55c02AF1F1f3F863";
export const CREATE_AGENT_FUNCTION =
  "function createAgent(uint256 agentId, address owner, string metadata, uint256[] chainIds)";

const handleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  // filter the transaction with filterFunction
  const createAgentTransactions = txEvent.filterFunction(
    CREATE_AGENT_FUNCTION,
    FORTA_CONTRACT
  );

  // loop over all transactions, check if owner is Nethermind
  createAgentTransactions.forEach((transaction) => {
    // transaction.args returns values like arguments of createAgent
    const { agentId, owner, metadata, chainIds } = transaction.args;

    if (owner.toLowerCase() === DEPLOYER_ADDRESS.toLocaleLowerCase()) {
      findings.push(
        Finding.fromObject({
          name: "New bot deployed",
          description: "New bot just deployed by Nethermind team!",
          alertId: "NM",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            agentId: agentId,
            chainIds: chainIds,
            deployer: owner,
          },
        })
      );
    }
  });
  return findings;
};

export default {
  handleTransaction,
};
