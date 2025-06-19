import type { RouterOutputs } from "@/lib/trpc-client";
import { Card, CardContent, CardTitle } from "../ui/card";

export function Examples({ examples }: { examples: RouterOutputs["greeting"]["getExamples"] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {examples.length <= 0 && <div className="col-span-full text-center text-gray-500">No examples found.</div>}

      {examples.length > 0 &&
        examples.map((example) => (
          <li key={example.id}>
            <Card className="text-center">
              <CardTitle className="font-brand text-3xl">{example.name}</CardTitle>
              <CardContent>
                <p className="break-all text-gray-500 text-xs">ID: {example.id}</p>
              </CardContent>
            </Card>
          </li>
        ))}
    </ul>
  );
}
