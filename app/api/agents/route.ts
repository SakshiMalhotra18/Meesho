import { NextResponse } from 'next/server';

export async function GET() {
  const agents = [
    { id: 'mira', name: 'Mira', role: 'Supervisor Agent', status: 'idle' },
    { id: 'tara', name: 'Tara', role: 'Evidence Agent', status: 'idle' },
    { id: 'raahi', name: 'Raahi', role: 'Logistics Agent', status: 'idle' },
    { id: 'kavach', name: 'Kavach', role: 'Risk Agent', status: 'idle' },
    { id: 'niti', name: 'Niti', role: 'Policy Agent', status: 'idle' },
    { id: 'samadhan', name: 'Samadhan', role: 'Resolution Agent', status: 'idle' },
  ];

  return NextResponse.json({ agents });
}
