'use client';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> with properly escaped JSON.
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
