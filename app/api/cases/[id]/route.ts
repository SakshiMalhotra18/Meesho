import { NextResponse } from 'next/server';
import { getCaseById } from '@/data/seed/cases';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) {
    return NextResponse.json({ error: `Case ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(caseData);
}
