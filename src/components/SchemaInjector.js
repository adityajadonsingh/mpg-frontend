"use client";

import { useMemo } from "react";

export default function SchemaInjector({ schemas }) {
  if (!Array.isArray(schemas) || schemas.length === 0) {
    return null;
  }

  const validSchemas = useMemo(() => {
    return schemas
      .filter(schema => schema?.schema_json)
      .map((schema, idx) => {
        try {
          const jsonString = JSON.stringify(schema.schema_json);
          if (typeof schema.schema_json !== 'object' || schema.schema_json === null) {
            console.warn(`[SchemaInjector] Invalid schema at index ${idx}: not an object`, schema.schema_json);
            return null;
          }
          return { id: idx, json: jsonString };
        } catch (err) {
          console.error(`[SchemaInjector] Failed to stringify schema at index ${idx}:`, err.message, schema.schema_json);
          return null;
        }
      })
      .filter(Boolean);
  }, [schemas]);

  if (validSchemas.length === 0) return null;

  return (
    <>
      {validSchemas.map(({ id, json }) => (
        <script
          key={id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
}