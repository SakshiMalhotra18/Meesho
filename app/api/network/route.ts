import { NextResponse } from 'next/server';

export async function GET() {
  const hubs = [
    { name: 'Surat', role: 'Origin Hub', anomaly: '0.4%', volume: '48,200', x: 100, y: 220 },
    { name: 'Ahmedabad', role: 'Transit Hub', anomaly: '0.6%', volume: '62,100', x: 220, y: 150 },
    { name: 'Jaipur', role: 'Problem Hub', anomaly: '2.8%', volume: '34,900', x: 380, y: 120, flagged: true },
    { name: 'Delhi', role: 'Destination Hub', anomaly: '0.5%', volume: '91,400', x: 540, y: 90 },
    { name: 'Lucknow', role: 'Regional Hub', anomaly: '0.7%', volume: '29,800', x: 540, y: 220 },
    { name: 'Mumbai', role: 'Major Gateway', anomaly: '0.5%', volume: '112,000', x: 220, y: 320 },
  ];

  return NextResponse.json({ hubs });
}
