import { Incident } from '../models/Incident';
import { NextResponse } from 'next/server';
import { IncidentService } from '../service/IncidentService';

export async function POST(req: Request) {
  const body: Incident = await req.json();
  const response = await IncidentService.createIncident(body);
  return NextResponse.json({ success: true, data: response });
}
export async function GET() {
  try {
    const incidents = await IncidentService.getAllIncidents(); 
    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Erreur lors de la récupération des incidents:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}