export function getAvatarPlaceholderUrl(
  username: string | null,
  styleName?: string
) {
  const url = new URL(
    `https://api.dicebear.com/9.x/${styleName || "shapes"}/svg`
  );
  url.searchParams.append("seed", username || "username");
  return url.toString();
}
