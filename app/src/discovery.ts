import type { ComponentType } from "react";
import catalogData from "client-design-system/catalog.json";

type CatalogComponent = {
  name: string;
  file?: string;
  useWhen?: string;
  variants?: string[];
  states?: string[];
  sizes?: string[];
  parts?: string[];
  designerPrompt?: string;
};

type CatalogMockup = {
  name: string;
  slug?: string;
  path?: string;
  purpose?: string;
};

type Catalog = {
  name?: string;
  audience?: string;
  howToPreview?: string;
  foundations?: {
    colors?: { token: string; use: string }[];
    shape?: string;
    density?: string;
  };
  components?: CatalogComponent[];
  mockups?: CatalogMockup[];
  starterRequestsForAgents?: string[];
};

export type ComponentEntry = {
  name: string;
  slug: string;
  file?: string;
  sourcePath?: string;
  metadata?: CatalogComponent;
};

export type MockupEntry = {
  name: string;
  slug: string;
  sourcePath: string;
  purpose?: string;
  Component: ComponentType;
  metadata?: CatalogMockup;
};

export const catalog = catalogData as Catalog;

export function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function titleFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const componentModules = import.meta.glob(
  "../../client-design-system/components/*.tsx",
  { eager: true }
);

const mockupModules = import.meta.glob(
  "../../client-design-system/mockups/*/src/App.tsx",
  { eager: true }
) as Record<string, { default?: ComponentType }>;

const sourceComponents = Object.keys(componentModules)
  .filter((path) => !path.endsWith("/index.tsx"))
  .map((sourcePath) => {
    const fileName = sourcePath.split("/").pop() || "component.tsx";
    const name = fileName.replace(/\.tsx$/, "");
    return {
      name,
      slug: slugify(name),
      sourcePath,
      file: `client-design-system/components/${fileName}`
    };
  });

const catalogComponents = catalog.components || [];
const componentMap = new Map<string, ComponentEntry>();

for (const component of sourceComponents) {
  componentMap.set(component.slug, component);
}

for (const metadata of catalogComponents) {
  const slug = slugify(metadata.name);
  const existing = componentMap.get(slug);
  componentMap.set(slug, {
    name: metadata.name,
    slug,
    file: metadata.file || existing?.file,
    sourcePath: existing?.sourcePath,
    metadata
  });
}

export const components = [...componentMap.values()].sort((a, b) =>
  a.name.localeCompare(b.name)
);

const catalogMockups = catalog.mockups || [];

export const mockups: MockupEntry[] = Object.entries(mockupModules)
  .map(([sourcePath, module]) => {
    const match = sourcePath.match(/mockups\/([^/]+)\/src\/App\.tsx$/);
    const slug = match?.[1] || slugify(sourcePath);
    const metadata = catalogMockups.find((item) => (item.slug || slugify(item.name)) === slug);

    return {
      name: metadata?.name || titleFromSlug(slug),
      slug,
      sourcePath,
      purpose: metadata?.purpose,
      Component: module.default || (() => null),
      metadata
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function findComponent(slug: string) {
  return components.find((component) => component.slug === slug);
}

export function findMockup(slug: string) {
  return mockups.find((mockup) => mockup.slug === slug);
}
