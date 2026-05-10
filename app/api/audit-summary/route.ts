import { NextResponse } from 'next/server';

// DO NOT use 'export default'. Use 'export async function POST'
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tools, totalSavings } = body;

    // This is a mock response since we aren't hitting the real OpenAI API yet
    // This allows your frontend to work perfectly without needing a paid key
    const mockSummary = `Based on your current stack of ${tools.length} tools, you are overspending on seat-based licensing. By migrating to the Credex Credit system, you can reduce your annual overhead from your current levels to an optimized budget, saving $${totalSavings} per year.`;

    return NextResponse.json({ 
      summary: mockSummary 
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" }, 
      { status: 500 }
    );
  }
}