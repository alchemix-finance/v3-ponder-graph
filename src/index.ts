import { ponder } from "ponder:registry";
import {
  accrueInterest,
  alchemistMetadata,
  alchemistV3Deposit,
  alchemistV3PositionTransfer,
  alchemistV3Withdraw,
  allocate,
  batchLiquidated,
  burn,
  deallocate,
  forceRepay,
  liquidated,
  mint,
  mytDeposit,
  mytWithdraw,
  positionClaimed,
  positionCreated,
  redemption,
  repay,
  selfLiquidated,
  stats,
  totalAssetsAndSupply,
  transmutermetadata,
} from "ponder:schema";
import { AlchemistV3PositionAbi } from "../abis/AlchemistV3PositionAbi";
import { MYTAbi } from "../abis/MYTAbi";
import { alchemistV3Abi } from "../abis/alchemistV3Abi";
import { transmuterV3Abi } from "../abis/transmuterV3Abi";

ponder.on("alchemistV3:BatchLiquidated", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(batchLiquidated).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          accounts: [...event.args.accounts],
          liquidator: event.args.liquidator,
          amount: event.args.amount,
          feeInYield: event.args.feeInYield,
          feeInETH: event.args.feeInETH,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Burn", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(burn).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          sender: event.args.sender,
          amount: event.args.amount,
          recipientId: event.args.recipientId,
          txHash: event.transaction.hash,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Deposit", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(alchemistV3Deposit).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          amount: event.args.amount,
          recipientId: event.args.recipientId,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:ForceRepay", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(forceRepay).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          accountId: event.args.accountId,
          amount: event.args.amount,
          creditToYield: event.args.creditToYield,
          protocolFeeTotal: event.args.protocolFeeTotal,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Initialized", async ({ event, context }) => {
  const _contractread_79__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "debtToken",
    blockNumber: event.block.number,
  });
  const _contractread_81__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "myt",
    blockNumber: event.block.number,
  });
  const _contractread_82__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "transmuter",
    blockNumber: event.block.number,
  });
  const _contractread_83__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "underlyingToken",
    blockNumber: event.block.number,
  });
  const _typecast_76__result = event.transaction.hash;
  const _typecast_77__result = event.block.timestamp.toString();
  const _strconcat_78__result = `${_typecast_76__result}/${_typecast_77__result}`;
  await context.db
    .insert(alchemistMetadata)
    .values({
      id: _strconcat_78__result,
      chain: context.chain.name,
      address: event.log.address,
      debttoken: _contractread_79__out_param0,
      myt: _contractread_81__out_param0,
      transmuter: _contractread_82__out_param0,
      underlyingtoken: _contractread_83__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      address: event.log.address,
      debttoken: _contractread_79__out_param0,
      myt: _contractread_81__out_param0,
      transmuter: _contractread_82__out_param0,
      underlyingtoken: _contractread_83__out_param0,
    }));
});

ponder.on("alchemistV3:Liquidated", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(liquidated).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          accountId: event.args.accountId,
          liquidator: event.args.liquidator,
          amount: event.args.amount,
          feeInYield: event.args.feeInYield,
          feeInUnderlying: event.args.feeInUnderlying,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Mint", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(mint).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          tokenId: event.args.tokenId,
          amount: event.args.amount,
          recipient: event.args.recipient,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Redemption", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(redemption).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          amount: event.args.amount,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Repay", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(repay).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          sender: event.args.sender,
          amount: event.args.amount,
          recipientId: event.args.recipientId,
          credit: event.args.credit,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:SelfLiquidated", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(selfLiquidated).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          accountId: event.args.accountId,
          amountLiquidated: event.args.amountLiquidated,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("alchemistV3:Withdraw", async ({ event, context }) => {
  const _contractread_43__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalDeposited",
    blockNumber: event.block.number,
  });
  const _contractread_49__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getTotalUnderlyingValue",
    blockNumber: event.block.number,
  });
  const _contractread_103__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "cumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_104__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "getUnrealizedCumulativeEarmarked",
    blockNumber: event.block.number,
  });
  const _contractread_105__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "globalMinimumCollateralization",
    blockNumber: event.block.number,
  });
  const _contractread_106__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalDebt",
    blockNumber: event.block.number,
  });
  const _contractread_107__out_param0 = await context.client.readContract({
    abi: alchemistV3Abi,
    address: event.log.address,
    functionName: "totalSyntheticsIssued",
    blockNumber: event.block.number,
  });
  const _typecast_44__result = event.log.address;
  const _typecast_45__result = event.transaction.hash;
  const _strconcat_46__result = `${_typecast_44__result}/${_typecast_45__result}`;
  const _typecast_47__result = event.block.timestamp.toString();
  const _strconcat_48__result = `${_strconcat_46__result}/${_typecast_47__result}`;
  await context.db
    .insert(stats)
    .values({
      id: _strconcat_48__result,
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    })
    .onConflictDoUpdate((row) => ({
      chain: context.chain.name,
      alchemist: event.log.address,
      myttvl: _contractread_43__out_param0,
      underlyingtvl: _contractread_49__out_param0,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      cumulativeEarmarked: _contractread_103__out_param0,
      unrealizedCumulativeEarmarked: _contractread_104__out_param0,
      globalMinimumCollateralization: _contractread_105__out_param0,
      totalDebt: _contractread_106__out_param0,
      totalSyntheticsIssued: _contractread_107__out_param0,
    }));

  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(alchemistV3Withdraw).values({
          id: __id,
          chain: context.chain.name,
          alchemist: event.log.address,
          amount: event.args.amount,
          tokenId: event.args.tokenId,
          recipient: event.args.recipient,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Abdicate", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Accept", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:AccrueInterest", async ({ event, context }) => {
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(accrueInterest).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          previousTotalAssets: event.args.previousTotalAssets,
          newTotalAssets: event.args.newTotalAssets,
          performanceFeeShares: event.args.performanceFeeShares,
          managementFeeShares: event.args.managementFeeShares,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }

  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Allocate", async ({ event, context }) => {
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(allocate).values({
          id: __id,
          chain: context.chain.name,
          sender: event.args.sender,
          adapter: event.args.adapter,
          assets: event.args.assets,
          ids: [...event.args.ids],
          change: event.args.change,
          myt: event.log.address,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }

  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:AllowanceUpdatedByTransferFrom", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Deallocate", async ({ event, context }) => {
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(deallocate).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          sender: event.args.sender,
          adapter: event.args.adapter,
          assets: event.args.assets,
          ids: [...event.args.ids],
          change: event.args.change,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }

  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:DecreaseAbsoluteCap", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:DecreaseRelativeCap", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:DecreaseTimelock", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Deposit", async ({ event, context }) => {
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(mytDeposit).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          sender: event.args.sender,
          onBehalf: event.args.onBehalf,
          assets: event.args.assets,
          shares: event.args.shares,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }

  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:ForceDeallocate", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:IncreaseAbsoluteCap", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:IncreaseRelativeCap", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:IncreaseTimelock", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Permit", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:RemoveAdapter", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Revoke", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetAdapterRegistry", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetForceDeallocatePenalty", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetLiquidityAdapterAndData", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetManagementFee", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetManagementFeeRecipient", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:SetMaxRate", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Submit", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Transfer", async ({ event, context }) => {
  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:Withdraw", async ({ event, context }) => {
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(mytWithdraw).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          sender: event.args.sender,
          receiver: event.args.receiver,
          onBehalf: event.args.onBehalf,
          assets: event.args.assets,
          shares: event.args.shares,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }

  const _contractread_40__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalAssets",
    blockNumber: event.block.number,
  });
  const _contractread_41__out_param0 = await context.client.readContract({
    abi: MYTAbi,
    address: event.log.address,
    functionName: "totalSupply",
    blockNumber: event.block.number,
  });
  const _typecast_37__result = event.transaction.hash;
  const _typecast_38__result = event.block.timestamp.toString();
  const _strconcat_39__result = `${_typecast_37__result}/${_typecast_38__result}`;
  {
    const __baseId = _strconcat_39__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(totalAssetsAndSupply).values({
          id: __id,
          chain: context.chain.name,
          myt: event.log.address,
          totalAssets: _contractread_40__out_param0,
          totalSupply: _contractread_41__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("MYT:setup", async ({ context }) => {
  // TODO: seed initial state here
});

ponder.on("transmuterV3:AlchemistUpdated", async ({ event, context }) => {
  const _contractread_94__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "alchemist",
    blockNumber: event.block.number,
  });
  const _contractread_95__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "name",
    blockNumber: event.block.number,
  });
  const _contractread_96__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "syntheticToken",
    blockNumber: event.block.number,
  });
  const _typecast_91__result = event.transaction.hash;
  const _typecast_92__result = event.block.timestamp.toString();
  const _strconcat_93__result = `${_typecast_91__result}/${_typecast_92__result}`;
  {
    const __baseId = _strconcat_93__result;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(transmutermetadata).values({
          id: __id,
          chain: context.chain.name,
          alchemist: _contractread_94__out_param0,
          name: _contractread_95__out_param0,
          synthetictoken: _contractread_96__out_param0,
          address: event.log.address,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("transmuterV3:PositionClaimed", async ({ event, context }) => {
  const _contractread_85__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "name",
    blockNumber: event.block.number,
  });
  const _contractread_87__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "alchemist",
    blockNumber: event.block.number,
  });
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(positionClaimed).values({
          id: __id,
          chain: context.chain.name,
          claimer: event.args.claimer,
          amountClaimed: event.args.amountClaimed,
          amountUnclaimed: event.args.amountUnclaimed,
          transmuter: event.log.address,
          name: _contractread_85__out_param0,
          alchemist: _contractread_87__out_param0,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("transmuterV3:PositionCreated", async ({ event, context }) => {
  const _contractread_88__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "alchemist",
    blockNumber: event.block.number,
  });
  const _contractread_89__out_param0 = await context.client.readContract({
    abi: transmuterV3Abi,
    address: event.log.address,
    functionName: "name",
    blockNumber: event.block.number,
  });
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(positionCreated).values({
          id: __id,
          chain: context.chain.name,
          creator: event.args.creator,
          amountStaked: event.args.amountStaked,
          nftId: event.args.nftId,
          alchemist: _contractread_88__out_param0,
          name: _contractread_89__out_param0,
          transmuter: event.log.address,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});

ponder.on("transmuterV3:setup", async ({ context }) => {
  // TODO: seed initial state here
});

ponder.on("AlchemistV3Position:Transfer", async ({ event, context }) => {
  const _contractread_100__out_param0 = await context.client.readContract({
    abi: AlchemistV3PositionAbi,
    address: event.log.address,
    functionName: "alchemist",
    blockNumber: event.block.number,
  });
  const _contractread_101__out_param0 = await context.client.readContract({
    abi: AlchemistV3PositionAbi,
    address: event.log.address,
    functionName: "name",
    blockNumber: event.block.number,
  });
  const _contractread_102__out_param0 = await context.client.readContract({
    abi: AlchemistV3PositionAbi,
    address: event.log.address,
    functionName: "symbol",
    blockNumber: event.block.number,
  });
  {
    const __baseId = event.id;
    for (let __n = 1; ; __n++) {
      const __id = __n === 1 ? __baseId : `${__baseId}_${__n}`;
      try {
        await context.db.insert(alchemistV3PositionTransfer).values({
          id: __id,
          chain: context.chain.name,
          from: event.args.from,
          to: event.args.to,
          tokenId: event.args.tokenId,
          alchemist: _contractread_100__out_param0,
          contract: event.log.address,
          name: _contractread_101__out_param0,
          symbol: _contractread_102__out_param0,
          txHash: event.transaction.hash,
          blockNumber: event.block.number,
          timestamp: event.block.timestamp,
        });
        break;
      } catch (__e) {
        {
          const __cn = (__e as any)?.constructor?.name ?? "";
          const __em = String((__e as any)?.message ?? "");
          const __isUnique =
            __cn === "UniqueConstraintError" ||
            (__e as any)?.code === "23505" ||
            __em.toLowerCase().includes("unique");
          if (__isUnique) continue;
        }
        throw __e;
      }
    }
  }
});
