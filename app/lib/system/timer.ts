/**
 * Create Timer Delay
 *
 * Usage:
 * timer = createTimer()
 * ...
 * await timer.delay()
 *
 * @param customThreshold number in ms
 * @returns
 */

const DEFAULT_THRESHOLD = 300;

export const createTimer = (customThreshold?: number) => {
  const start = Date.now();
  const threshold = customThreshold ?? DEFAULT_THRESHOLD;

  return {
    delay: async (overrideThreshold?: number) => {
      const effectiveThreshold = overrideThreshold ?? threshold;
      const currentDuration = Date.now() - start;
      const delayDuration = Math.min(
        effectiveThreshold - currentDuration,
        effectiveThreshold
      );
      if (delayDuration > 0) await delay(delayDuration);
    },
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay(ms = DEFAULT_THRESHOLD) {
  await sleep(ms);
}
