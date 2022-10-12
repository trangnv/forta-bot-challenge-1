import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
  ethers,
} from "forta-agent";
import agent, {
  DEPLOYER_ADDRESS,
  FORTA_CONTRACT,
  CREATE_AGENT_FUNCTION,
} from "./agent";

describe("Bot deployment detection", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("returns empty findings if there are no bot deployment", async () => {
      mockTxEvent.filterFunction = jest.fn().mockReturnValue([]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(1);
      expect(mockTxEvent.filterFunction).toHaveBeenCalledWith(
        CREATE_AGENT_FUNCTION,
        FORTA_CONTRACT
      );
    });

    // it("returns a finding if there is a Tether transfer over 10,000", async () => {
    //   const mockBotCreationEvent = {
    //     args: {
    //       from: "0xabc",
    //       to: "0xdef",
    //       value: ethers.BigNumber.from("20000000000"), //20k with 6 decimals
    //     },
    //   };
    //   mockTxEvent.filterLog = jest
    //     .fn()
    //     .mockReturnValue([mockTetherTransferEvent]);

    //   const findings = await handleTransaction(mockTxEvent);

    //   const normalizedValue = mockTetherTransferEvent.args.value.div(
    //     10 ** TETHER_DECIMALS
    //   );
    //   expect(findings).toStrictEqual([
    //     Finding.fromObject({
    //       name: "High Tether Transfer",
    //       description: `High amount of USDT transferred: ${normalizedValue}`,
    //       alertId: "FORTA-1",
    //       severity: FindingSeverity.Low,
    //       type: FindingType.Info,
    //       metadata: {
    //         to: mockTetherTransferEvent.args.to,
    //         from: mockTetherTransferEvent.args.from,
    //       },
    //     }),
    //   ]);
    //   expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    //   expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
    //     ERC20_TRANSFER_EVENT,
    //     TETHER_ADDRESS
    //   );
    // });
  });
});
