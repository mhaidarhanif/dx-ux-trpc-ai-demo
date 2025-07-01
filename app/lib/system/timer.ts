const DEFAULT_THRESHOLD = 300;

/**
 * Create Timer Delay
 *
 * Usage:
 * const timer = createTimer()
 * ...
 * await timer.delay()
 *
 * @param customThreshold number in ms
 * @returns
 */
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
