import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

export const DEPLOYER_ADDRESS: string = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";
export const FORTA_PROXY_AGENT_REGISTRY_CORE =
  "0x61447385B019187daa48e91c55c02AF1F1f3F863";
export const CREATE_AGENT_METHOD =
  "function createAgent(uint256 agentId, address owner, string metadata, uint256[] chainIds)";

export const handleTransaction = (
  deployer: string,
  contract: string,
  function_signature: string
): HandleTransaction => {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    //filterFunction with function_signature
    const createAgentTransactions = txEvent.filterFunction(
      function_signature,
      contract
    );

    // loop over all transactions
    createAgentTransactions.forEach((transaction) => {
      const { agentId, owner, metadata, chainIds } = transaction.args;

      if (owner.toLowerCase() === deployer.toLocaleLowerCase()) {
        findings.push(
          Finding.fromObject({
            name: "New bot deployed",
            description: "New bot just deployed by Nethermind team!",
            alertId: "NM",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
          })
        );
      }
    });

    return findings;
  };
};

export default {
  handleTransaction(DEPLOYER_ADDRESS: any, FORTA_PROXY_AGENT_REGISTRY_CORE: any, CREATE_AGENT_METHOD: any) //: providerHandleTransaction(handlerInputs),
};
