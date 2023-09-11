export async function exponentialBackoff(fn: Function, maxAttempts: number, baseDelayMs: number) {
    let attempts = 0;
    while (attempts < maxAttempts) {
        try {
            return await fn();
        } catch (error) {
            attempts++;
            if (attempts === maxAttempts) {
                throw error;
            }
            const delayMs = baseDelayMs * Math.pow(2, attempts);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}