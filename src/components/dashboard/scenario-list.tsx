import { scenarios } from '@/lib/data/scenarios';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function ScenarioList() {
  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <Link
          key={scenario.id}
          href={`/quiz/${scenario.id}`}
          className="block rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:bg-muted/50"
        >
          <div className="flex items-center p-4">
            <Image
              src={scenario.imageUrl}
              alt={scenario.title}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-cover"
              data-ai-hint={scenario.imageHint}
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold">{scenario.title}</p>
              <p className="text-sm text-muted-foreground">
                {scenario.category}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
}
