// surge-rider: a momentum breakout bot for the agent.fun pump.fun replay (agent-fun/replay/v2).
// The strategy lives in strategy.ts and the SDK shim is the kit's sdk/ts/makefun-bot.ts,
// vendored byte for byte as vendor/makefun-bot.ts. Paper money only: the bot trades
// the replay's paper SOL and never touches real money, real wallets or any network.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
