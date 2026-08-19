import { NextResponse } from 'next/server';

export async function GET() {
  const metrics = {
    automationRate: 76.4,
    humanReviewRate: 23.6,
    avgResolutionTimeMinutes: 4.2,
    baselineResolutionTimeHours: 18,
    falseAccusationRate: 0.2,
    preventedFraudLossINR: 1480000,
  };

  return NextResponse.json(metrics);
}
