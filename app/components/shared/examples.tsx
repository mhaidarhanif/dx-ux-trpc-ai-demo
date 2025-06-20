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
  examples: RouterOutputs["greeting"]["getExamples"];
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {examples.length <= 0 && (
        <div className="text-center">No examples found.</div>
      )}

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
