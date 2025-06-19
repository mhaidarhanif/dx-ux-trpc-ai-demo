export const dataExamples = Array.from({ length: 26 }, (_, i) => ({
  slug: String.fromCharCode(97 + i),
  name: `Example ${String.fromCharCode(65 + i)}`,
  items: [
    {
      slug: `item-${String.fromCharCode(97 + i)}`,
      name: `Item ${String.fromCharCode(65 + i)}`,
    },
  ],
}));
