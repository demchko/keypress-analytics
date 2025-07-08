import { BasicComp } from "@/components/BasicComp";
import { KeypressStats } from "@/stores/KeyPressStore";
import { Metadata } from "next";

async function getInitialStats(): Promise<KeypressStats[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/keypress/stats`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Кешування для SEO
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching initial stats:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getInitialStats();
  const totalPresses = stats.reduce((sum, stat) => sum + stat.count, 0);

  return {
    title: 'Аналітика натискань клавіш | Реальна статистика',
    description: `Переглядайте статистику натискань клавіш в реальному часі. Всього натискань: ${totalPresses}, унікальних клавіш: ${stats.length}`,
    keywords: 'аналітика, клавіши, статистика, реальний час, websocket',
    openGraph: {
      title: 'Аналітика натискань клавіш',
      description: `Статистика натискань клавіш. Всього: ${totalPresses} натискань`,
      type: 'website',
    },
  };
}

export default async function Page() {
  const initialStats = await getInitialStats();

  return <BasicComp initialStats={initialStats} />;
}