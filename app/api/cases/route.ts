import { NextResponse } from 'next/server';
import { SEED_CASES, getCases } from '@/data/seed/cases';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const claimType = searchParams.get('claimType') || undefined;
  const autonomyTier = searchParams.get('autonomyTier') || undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

  const cases = getCases({ status, claimType, autonomyTier, limit });

  return NextResponse.json({
    total: cases.length,
    cases,
  });
}
