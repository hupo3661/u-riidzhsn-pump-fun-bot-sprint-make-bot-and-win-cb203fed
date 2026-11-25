# Surge-rider strategy

Paper-money momentum breakout bot for the pump.fun bonding-curve replay
(`agent-fun/replay/v2`). Capital 10 SOL, at most 5 open positions, no shorts,
no leverage, 2-slot latency. Fees: 95 bps protocol + 30 bps creator on each
side, plus 105,000 lamports per transaction.

## Entry

A curve becomes a buy when all of these hold over a 40-slot window:

- at least 800 slots since its `CreateEvent` (fresh curves are mostly bundled
  launches that get dumped);
- real SOL between 1.5 and 70;
- net inflow (buys minus sells) of at least 3 SOL, with at least 5 buys from
  at least 10 distinct wallets;
- price up 4%–120% over the window and within 2% of the window high;
- flow accelerating: second-half net inflow at least the first half's;
- no single wallet behind more than 60% of the window's buy SOL.

## Sizing

First buy 0.10 SOL; adds of 0.15 SOL up to 1.0 SOL total, only while the
price has stepped up from the last buy, the position is not underwater, and
window flow is still at least +0.5 SOL. At most 4 momentum positions at once
(the fifth open-position slot is reserved for guardrail probes); at most 4 SOL
of cost exposed at once.

## Exits (whole position, first trigger wins)

- Stop loss: value below 88% of cost.
- Trailing stop: once value reaches 108% of cost, exit when it falls 25%
  below its peak.
- Fade: net SOL over the last 20 slots below −1.0 SOL.
- One recorded sell of 3 SOL or more on the curve.
- Time: held more than 300 slots and up less than 8%.

Cooldown 200 slots after an exit; at most 2 entries per curve.

## Guardrail pacing

The run must end with round trips of at least 0.01 SOL on at least 20 coins.
When the bot's own fills or coins lag a pace of 25 coins / 240 fills over
4 hours of block time, it opens tiny 0.02 SOL probe round trips on liquid
curves and sells them as soon as the buy lands.

## Determinism

No clock, no randomness. Iteration only over insertion-ordered maps fed by the
batch stream, so two runs on the same replay produce identical action logs.
