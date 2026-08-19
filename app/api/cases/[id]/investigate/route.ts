import { NextResponse } from 'next/server';
import { runInvestigation } from '@/lib/agents/supervisor';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await runInvestigation(id);

  return NextResponse.json(result);
}
