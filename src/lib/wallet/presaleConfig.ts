export const PRESALE_CHAIN_ID = process.env.NEXT_PUBLIC_PRESALE_CHAIN_ID
  ? Number(process.env.NEXT_PUBLIC_PRESALE_CHAIN_ID)
  : undefined;

export const PRESALE_RECEIVER = (process.env.NEXT_PUBLIC_PRESALE_RECEIVER || '') as `0x${string}` | '';

export const USDT_ADDRESS = (process.env.NEXT_PUBLIC_USDT_ADDRESS || '') as `0x${string}` | '';
export const USDC_ADDRESS = (process.env.NEXT_PUBLIC_USDC_ADDRESS || '') as `0x${string}` | '';

export const DECIMALS: Record<'USDT' | 'USDC', number> = {
  USDT: 6,
  USDC: 6,
};
