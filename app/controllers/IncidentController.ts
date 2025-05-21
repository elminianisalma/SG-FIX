import { backendIncidentService } from '@/lib/backendIncidentService';

export async function POST(req: Request) {
  const body: Incident = await req.json();
  const response = await backendIncidentService.createIncident(body);
  return NextResponse.json({ success: true, data: response });
}
