interface RateLimiterOptions {
  maxCalls: number;
  timeWindow: number;
}

export class RateLimiter implements RateLimiterOptions {
  maxCalls: number;
  timeWindow: number;
  calls: number[];

  constructor({ maxCalls = 5, timeWindow = 1000 }: RateLimiterOptions) {
    this.maxCalls = maxCalls; // Max calls allowed
    this.timeWindow = timeWindow; // Time window in ms
    this.calls = []; // Track call timestamps
  }

  canMakeCall() {
    const now = Date.now();
    // Remove old calls outside the time window
    this.calls = this.calls.filter(
      (timestamp) => now - timestamp < this.timeWindow,
    );
    return this.calls.length < this.maxCalls;
  }

  recordCall() {
    this.calls.push(Date.now());
  }

  async execute(apiFunction: () => Promise<any>) {
    if (!this.canMakeCall()) {
      throw new Error("Rate limit exceeded");
    }
    this.recordCall();
    return await apiFunction();
  }
}
