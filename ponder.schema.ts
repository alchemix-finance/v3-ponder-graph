import { index, onchainTable } from "ponder";

export const alchemistDeposit = onchainTable(
  "alchemistDeposit",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    amount: t.bigint(),
    recipientId: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistBurn = onchainTable(
  "alchemistBurn",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    sender: t.hex(),
    amount: t.bigint(),
    recipientId: t.bigint(),
    txHash: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistBatchLiquidated = onchainTable(
  "alchemistBatchLiquidated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    liquidator: t.hex(),
    amount: t.bigint(),
    feeInYield: t.bigint(),
    feeInETH: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistForceRepay = onchainTable(
  "alchemistForceRepay",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    accountId: t.bigint(),
    amount: t.bigint(),
    creditToYield: t.bigint(),
    protocolFeeTotal: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistLiquidated = onchainTable(
  "alchemistLiquidated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    accountId: t.bigint(),
    liquidator: t.hex(),
    amount: t.bigint(),
    feeInYield: t.bigint(),
    feeInUnderlying: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistMint = onchainTable(
  "alchemistMint",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    tokenId: t.bigint(),
    amount: t.bigint(),
    recipient: t.hex(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistRepay = onchainTable(
  "alchemistRepay",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    sender: t.hex(),
    amount: t.bigint(),
    recipientId: t.bigint(),
    credit: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistRedemption = onchainTable(
  "alchemistRedemption",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    amount: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistSelfLiquidated = onchainTable(
  "alchemistSelfLiquidated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    accountId: t.bigint(),
    amountLiquidated: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistWithdraw = onchainTable(
  "alchemistWithdraw",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    amount: t.bigint(),
    tokenId: t.bigint(),
    recipient: t.hex(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytAccrueInterest = onchainTable(
  "mytAccrueInterest",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    myt: t.hex(),
    previousTotalAssets: t.bigint(),
    newTotalAssets: t.bigint(),
    performanceFeeShares: t.bigint(),
    managementFeeShares: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytAllocate = onchainTable(
  "mytAllocate",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    sender: t.hex(),
    adapter: t.hex(),
    assets: t.bigint(),
    ids: t.hex().array(),
    change: t.bigint(),
    myt: t.hex(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytDeallocate = onchainTable(
  "mytDeallocate",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    myt: t.hex(),
    sender: t.hex(),
    adapter: t.hex(),
    assets: t.bigint(),
    ids: t.hex().array(),
    change: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytDeposit = onchainTable(
  "mytDeposit",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    myt: t.hex(),
    sender: t.hex(),
    onBehalf: t.hex(),
    assets: t.bigint(),
    shares: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytWithdraw = onchainTable(
  "mytWithdraw",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    myt: t.hex(),
    sender: t.hex(),
    receiver: t.hex(),
    onBehalf: t.hex(),
    assets: t.bigint(),
    shares: t.bigint(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytTotalAssetsAndSupply = onchainTable(
  "mytTotalAssetsAndSupply",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    myt: t.hex(),
    totalAssets: t.bigint(),
    totalSupply: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistStat = onchainTable(
  "alchemistStat",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    myttvl: t.bigint(),
    underlyingtvl: t.bigint(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
    cumulativeEarmarked: t.bigint(),
    unrealizedCumulativeEarmarked: t.bigint(),
    globalMinimumCollateralization: t.bigint(),
    totalDebt: t.bigint(),
    totalSyntheticsIssued: t.bigint(),
    txHash: t.hex(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const mytMetadata = onchainTable(
  "mytMetadata",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    asset: t.hex(),
    name: t.text(),
    symbol: t.text(),
    address: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistMetadata = onchainTable(
  "alchemistMetadata",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    address: t.hex(),
    debttoken: t.hex(),
    myt: t.hex(),
    transmuter: t.hex(),
    underlyingtoken: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const transmuterPositionClaimed = onchainTable(
  "transmuterPositionClaimed",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    claimer: t.hex(),
    amountClaimed: t.bigint(),
    amountUnclaimed: t.bigint(),
    transmuter: t.hex(),
    name: t.text(),
    alchemist: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const transmuterPositionCreated = onchainTable(
  "transmuterPositionCreated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    creator: t.hex(),
    amountStaked: t.bigint(),
    nftId: t.bigint(),
    alchemist: t.hex(),
    name: t.text(),
    transmuter: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const transmuterMetadata = onchainTable(
  "transmuterMetadata",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    name: t.text(),
    synthetictoken: t.hex(),
    transmuter: t.hex(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const alchemistV3PositionTransfer = onchainTable(
  "alchemistV3PositionTransfer",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    from: t.hex(),
    to: t.hex(),
    tokenId: t.bigint(),
    alchemist: t.hex(),
    contract: t.text(),
    name: t.text(),
    symbol: t.text(),
    txHash: t.hex(),
    blockNumber: t.bigint(),
    timestamp: t.bigint(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const transmuterStat = onchainTable(
  "transmuterStat",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    depositCap: t.bigint(),
    totalActiveLocked: t.bigint(),
    totalLocked: t.bigint(),
    timestamp: t.bigint(),
    transmuter: t.hex(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const depositCap = onchainTable(
  "depositCap",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    depositCap: t.bigint(),
    alchemist: t.hex(),
    timestamp: t.bigint(),
    blockNumber: t.bigint(),
    txHash: t.hex(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);
