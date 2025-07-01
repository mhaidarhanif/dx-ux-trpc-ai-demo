import { href, Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AppRouterOutputs } from "@/modules/trpc/trpc-client";

export function Examples({
  examples,
}: {
  examples: AppRouterOutputs["example"]["getExamples"];
}) {
  if (examples.length <= 0) {
    return <p>No examples found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {examples.map((example) => (
        <li key={example.id}>
          <Link
            className="block"
            prefetch="intent"
            to={href("/examples/:slug", { slug: example.slug })}
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-brand text-5xl">
                  {example.name}
                </CardTitle>
                <CardDescription>
                  <p className="break-all text-xs">{example.id}</p>
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
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Example({
  example,
}: {
  example: AppRouterOutputs["example"]["getExampleSlug"];
}) {
  if (!example) {
    return <p>Example not found.</p>;
  }

  return (
    <div className="flex justify-center">
      <section className="space-y-4">
        <h2 className="font-brand text-5xl">{example.name}</h2>
        <p className="break-all text-xs">{example.id}</p>
        <div>
          {example.items.length > 0 && (
            <ul className="space-y-2">
              {example.items.map((item) => (
                <li key={item.id}>
                  <Badge variant="secondary">{item.name}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
