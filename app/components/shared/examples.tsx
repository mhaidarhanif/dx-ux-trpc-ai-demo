import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/lib/trpc-client";

export function Examples({
  examples,
}: {
  examples: RouterOutputs["example"]["getExamples"];
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {examples.length <= 0 && <p>No examples found.</p>}

      {examples.length > 0 &&
        examples.map((example) => (
          <li key={example.id}>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-brand text-5xl">
                  {example.name}
                </CardTitle>
                <CardDescription>
                  <p className="break-all text-gray-500 text-xs">
                    {example.id}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {example.items.length > 0 && (
                  <ul className="inline-flex gap-2">
                    {example.items.map((item) => (
                      <li key={item.id}>
                        <Badge variant="secondary">{item.name}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
    </ul>
  );
}
