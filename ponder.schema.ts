import { index, onchainTable } from "ponder";

export const alchemistV3Deposit = onchainTable(
  "alchemistV3Deposit",
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

export const burn = onchainTable(
  "burn",
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

export const batchLiquidated = onchainTable(
  "batchLiquidated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    accounts: t.bigint().array(),
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

export const forceRepay = onchainTable(
  "forceRepay",
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

export const liquidated = onchainTable(
  "liquidated",
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

export const mint = onchainTable(
  "mint",
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

export const repay = onchainTable(
  "repay",
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

export const redemption = onchainTable(
  "redemption",
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

export const selfLiquidated = onchainTable(
  "selfLiquidated",
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

export const alchemistV3Withdraw = onchainTable(
  "alchemistV3Withdraw",
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

export const accrueInterest = onchainTable(
  "accrueInterest",
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

export const allocate = onchainTable(
  "allocate",
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

export const deallocate = onchainTable(
  "deallocate",
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

export const totalAssetsAndSupply = onchainTable(
  "totalAssetsAndSupply",
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

export const stats = onchainTable(
  "stats",
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
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const metadata = onchainTable(
  "metadata",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    asset: t.hex(),
    name: t.text(),
    symbol: t.text(),
    address: t.hex(),
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
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const positionClaimed = onchainTable(
  "positionClaimed",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    claimer: t.hex(),
    amountClaimed: t.bigint(),
    amountUnclaimed: t.bigint(),
    transmuter: t.hex(),
    name: t.text(),
    alchemist: t.hex(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const positionCreated = onchainTable(
  "positionCreated",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    creator: t.hex(),
    amountStaked: t.bigint(),
    nftId: t.bigint(),
    alchemist: t.hex(),
    name: t.text(),
    transmuter: t.hex(),
  }),
  (table) => ({
    chainIdx: index().on(table.chain),
  }),
);

export const transmutermetadata = onchainTable(
  "transmutermetadata",
  (t) => ({
    id: t.text().primaryKey(),
    chain: t.text().notNull(),
    alchemist: t.hex(),
    name: t.text(),
    synthetictoken: t.hex(),
    address: t.hex(),
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
