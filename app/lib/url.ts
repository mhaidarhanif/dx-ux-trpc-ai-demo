export function getPathname(request: Request): string {
  return new URL(request.url).pathname;
}
