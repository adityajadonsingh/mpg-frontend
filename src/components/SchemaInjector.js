"use client";

export default function SchemaInjector({ schemas }) {
  if (!schemas || !schemas.length) return null;
  return (
    <>
      {schemas.map((schema, idx) =>
        schema?.schema_json ? (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.schema_json) }}
          />
        ) : null
      )}
    </>
  );
}