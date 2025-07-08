import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/keypress/stats`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }

        const stats = await response.json();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json([], { status: 500 });
    }
}