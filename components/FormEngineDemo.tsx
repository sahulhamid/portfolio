"use client";

import { useState } from "react";

type FieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "date";

type FieldSchema = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

const schema: FieldSchema[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Jane Doe" },
  { name: "email", label: "Email Address", type: "text", required: true, placeholder: "jane@example.com" },
  { name: "attendees", label: "Number of Attendees", type: "number", required: true },
  { name: "session", label: "Preferred Session", type: "select", options: ["Morning", "Afternoon", "Evening"] },
  { name: "notes", label: "Notes", type: "textarea", placeholder: "Anything we should know?" },
  { name: "updates", label: "Send me updates by email", type: "checkbox" },
];

type FormValue = string | number | boolean;

function defaultValueFor(field: FieldSchema): FormValue {
  if (field.type === "checkbox") return false;
  if (field.type === "number") return "";
  if (field.type === "select") return field.options?.[0] ?? "";
  return "";
}

export default function FormEngineDemo() {
  const [values, setValues] = useState<Record<string, FormValue>>({});
  const [submitted, setSubmitted] = useState<Record<string, FormValue> | null>(null);

  function valueFor(field: FieldSchema): FormValue {
    return field.name in values ? values[field.name] : defaultValueFor(field);
  }

  function handleChange(name: string, value: FormValue) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setSubmitted(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const collected: Record<string, FormValue> = {};
    for (const field of schema) {
      collected[field.name] = valueFor(field);
    }
    setSubmitted(collected);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 font-mono text-xs text-muted">schema.json</p>
        <pre className="h-96 overflow-auto rounded-xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-muted">rendered form</p>
        <form
          onSubmit={handleSubmit}
          className="flex h-96 flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-surface p-4"
        >
          {schema.map((field) => (
            <label key={field.name} className="flex flex-col gap-1.5 text-sm">
              {field.type !== "checkbox" && (
                <span className="font-medium text-foreground">
                  {field.label}
                  {field.required && <span className="text-accent"> *</span>}
                </span>
              )}

              {field.type === "text" && (
                <input
                  type="text"
                  required={field.required}
                  placeholder={field.placeholder}
                  value={String(valueFor(field))}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  required={field.required}
                  value={String(valueFor(field))}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                />
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  required={field.required}
                  value={String(valueFor(field))}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  required={field.required}
                  placeholder={field.placeholder}
                  value={String(valueFor(field))}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  rows={3}
                  className="resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                />
              )}

              {field.type === "select" && (
                <select
                  required={field.required}
                  value={String(valueFor(field))}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(valueFor(field))}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span className="text-foreground">
                    {field.label}
                    {field.required && <span className="text-accent"> *</span>}
                  </span>
                </span>
              )}
            </label>
          ))}

          <button
            type="submit"
            className="mt-auto w-fit rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Submit
          </button>
        </form>
      </div>

      {submitted && (
        <div className="lg:col-span-2">
          <p className="mb-2 font-mono text-xs text-muted">submitted values</p>
          <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-xs text-foreground">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
