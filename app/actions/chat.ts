"use server";

import { MOCK_DATA } from '@/lib/mock-data';

export async function sendChatMessage(messages: any[]) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set in environment variables");
    }

    const totalOrders = MOCK_DATA.length;
    const completedOrders = MOCK_DATA.filter(o => o.status === 'Completed').length;
    const delayedOrders = MOCK_DATA.filter(o => o.status === 'Delayed').length;
    const inProduction = MOCK_DATA.filter(o => o.status === 'In Production').length;

    const dynamicRAGContext = `
REAL-TIME DATABASE SNAPSHOT:
- Total Manufacturing Orders (MOs): ${totalOrders}
- Completed MOs: ${completedOrders}
- Delayed MOs: ${delayedOrders}
- MOs In Production: ${inProduction}

Recent Orders Sample (Top 3):
${MOCK_DATA.slice(0, 3).map(o => `- ${o.orderNumber}: ${o.productName} (${o.status}), assigned to ${o.assignedOperator}`).join('\n')}
`;

    const systemPrompt = `You are a helpful and intelligent ERP Assistant. 
You have access to the following real-time data:
- Sales: Total Revenue MTD is $1,245,000 (+12% vs last month). Conversion Rate is 4.2% (+0.5% vs last month). Revenue trend for last 7 days is steadily increasing.
- Production: Total Output Units is 12,450 (+4.2% vs target). Active Manufacturing Orders: 24 (3 delayed due to materials). Workstation Efficiency: Assembly Line A 92%, Welding Station 85%, Quality Control 98%.
${dynamicRAGContext}

Based on the user's query, you MUST decide whether to show a specific data visualization dashboard.
If the user asks about sales, revenue, or orders, append the exact tag [DASHBOARD:SALES] at the very end of your response.
If the user asks about production, manufacturing, or output, append the exact tag [DASHBOARD:PRODUCTION] at the very end of your response.
If the user asks for a general overview or summary, append the exact tag [DASHBOARD:OVERVIEW] at the very end of your response.
Otherwise, do not append any tag.

Answer the user's question concisely using the data provided. Do not invent numbers that are not in the data above.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            "messages": [
                { role: "system", content: systemPrompt },
                ...messages.map(m => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                }))
            ],
        })
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    return await response.json();
}
