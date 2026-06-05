import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle2,
  Copy,
  FileText,
  FolderKanban,
  Home,
  Layers3,
  Menu,
  PackageOpen,
  Sparkles,
  SwatchBook
} from "lucide-react";
import styleGuide from "../../client-design-system/style-guide.md?raw";
import {
  catalog,
  components,
  findComponent,
  findMockup,
  mockups,
  titleFromSlug
} from "./discovery";
import { renderComponentExample } from "./examples";

type Route =
  | { kind: "gallery" }
  | { kind: "style-guide" }
  | { kind: "component"; slug: string }
  | { kind: "mockup"; slug: string }
  | { kind: "not-found"; path: string };

function parseRoute(pathname: string): Route {
  if (pathname === "/" || pathname === "") return { kind: "gallery" };
  if (pathname === "/style-guide") return { kind: "style-guide" };

  const componentMatch = pathname.match(/^\/component\/([^/]+)\/?$/);
  if (componentMatch) return { kind: "component", slug: componentMatch[1] };

  const mockupMatch = pathname.match(/^\/mockup\/([^/]+)\/?$/);
  if (mockupMatch) return { kind: "mockup", slug: mockupMatch[1] };

  return { kind: "not-found", path: pathname };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    function onPopState() {
      setRoute(parseRoute(window.location.pathname));
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(href: string) {
    window.history.pushState({}, "", href);
    setRoute(parseRoute(window.location.pathname));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { route, navigate };
}

function Link({ href, children, className, navigate }: { href: string; children: ReactNode; className?: string; navigate: (href: string) => void }) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function slugForRoute(route: Route) {
  if (route.kind === "component" || route.kind === "mockup") return route.slug;
  return route.kind;
}

function getAgentInstruction(route: Route) {
  if (route.kind === "gallery") {
    return "We are working on the design system overview; update client-design-system/catalog.json and client-design-system/style-guide.md.";
  }

  if (route.kind === "style-guide") {
    return "We are working on the design system style guide; edit client-design-system/style-guide.md.";
  }

  if (route.kind === "component") {
    const component = findComponent(route.slug);
    const name = component?.name || titleFromSlug(route.slug);
    const file = component?.file || `client-design-system/components/${name.replace(/\s+/g, "")}.tsx`;
    return `We are working on the reusable component ${name}; edit ${file}.`;
  }

  if (route.kind === "mockup") {
    const mockup = findMockup(route.slug);
    const name = mockup?.name || titleFromSlug(route.slug);
    return `We are working on the mockup ${name}; edit client-design-system/mockups/${route.slug}/src/App.tsx.`;
  }

  return `We are working on the Gallery route ${route.path}; inspect app/src/App.tsx.`;
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function Sidebar({ route, navigate }: { route: Route; navigate: (href: string) => void }) {
  const active = slugForRoute(route);

  const navClass = (isActive: boolean) =>
    `flex items-center justify-between gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-medium transition ${
      isActive
        ? "bg-gallery-text-50 text-white"
        : "text-gallery-text-100 hover:bg-gallery-background-50 hover:text-gallery-text-50"
    }`;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gallery-background-200 bg-white lg:block">
      <div className="sticky top-0 h-screen overflow-y-auto px-3 py-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-md bg-gallery-text-50 text-white">
            <SwatchBook className="size-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold tracking-tight text-gallery-text-50">Design System</p>
            <p className="text-[11px] font-medium text-gallery-text-100">{catalog.name || "Gallery"}</p>
          </div>
        </div>

        <nav className="grid gap-2.5" aria-label="Design system navigation">
          <section>
            <Link href="/" navigate={navigate} className={navClass(route.kind === "gallery")}>
              <span className="inline-flex items-center gap-2"><Home className="size-4" /> Gallery</span>
              <span className="text-xs opacity-70">/</span>
            </Link>
            <Link href="/style-guide" navigate={navigate} className={navClass(route.kind === "style-guide")}>
              <span className="inline-flex items-center gap-2"><FileText className="size-4" /> Style guide</span>
              <span className="text-xs opacity-70">md</span>
            </Link>
          </section>

          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700 hover:bg-gallery-primary-50">
              <span className="inline-flex items-center gap-2"><Layers3 className="size-4" /> Components</span>
              <span>{components.length}</span>
            </summary>
            <div className="mt-1 grid gap-0.5">
              {components.length > 0 ? components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/component/${component.slug}`}
                  navigate={navigate}
                  className={navClass(route.kind === "component" && active === component.slug)}
                >
                  <span>{component.name}</span>
                  {!component.metadata && <span className="rounded bg-gallery-background-100 px-1.5 py-0.5 text-[10px] uppercase">file</span>}
                </Link>
              )) : <EmptyNavItem>No components found</EmptyNavItem>}
            </div>
          </details>

          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700 hover:bg-gallery-primary-50">
              <span className="inline-flex items-center gap-2"><FolderKanban className="size-4" /> Mockups</span>
              <span>{mockups.length}</span>
            </summary>
            <div className="mt-1 grid gap-0.5">
              {mockups.length > 0 ? mockups.map((mockup) => (
                <Link
                  key={mockup.slug}
                  href={`/mockup/${mockup.slug}`}
                  navigate={navigate}
                  className={navClass(route.kind === "mockup" && active === mockup.slug)}
                >
                  <span>{mockup.name}</span>
                  {!mockup.metadata && <span className="rounded bg-gallery-background-100 px-1.5 py-0.5 text-[10px] uppercase">folder</span>}
                </Link>
              )) : <EmptyNavItem>No mockups found</EmptyNavItem>}
            </div>
          </details>
        </nav>
      </div>
    </aside>
  );
}

function EmptyNavItem({ children }: { children: ReactNode }) {
  return <div className="rounded-md px-2 py-1.5 text-[13px] font-medium text-gallery-text-100">{children}</div>;
}

function TopBar({ route }: { route: Route }) {
  const [copied, setCopied] = useState(false);
  const title =
    route.kind === "gallery" ? "Gallery" :
    route.kind === "style-guide" ? "Style guide" :
    route.kind === "component" ? `Component: ${titleFromSlug(route.slug)}` :
    route.kind === "mockup" ? `Mockup: ${titleFromSlug(route.slug)}` :
    "Not found";

  async function handleCopy() {
    await copyTextToClipboard(getAgentInstruction(route));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-gallery-background-200 bg-white/95 backdrop-blur">
      <div className="flex h-12 items-center justify-between gap-2.5 px-3 lg:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <button className="grid size-8 place-items-center rounded-md border border-gallery-background-200 text-gallery-text-100 lg:hidden" type="button" aria-label="Open navigation">
            <Menu className="size-4" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold tracking-tight text-gallery-text-50">{title}</p>
            <p className="truncate text-[11px] font-medium text-gallery-text-100">Designer-facing visual map</p>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-1.5 rounded-md bg-gallery-text-50 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-gallery-text-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gallery-text-50"
          onClick={handleCopy}
          type="button"
        >
          <Copy className="size-4" />
          {copied ? "Copied" : "Copy agent instructions"}
        </button>
      </div>
    </header>
  );
}

function AppShell({ children, route, navigate }: { children: ReactNode; route: Route; navigate: (href: string) => void }) {
  return (
    <div className="min-h-screen bg-gallery-background-50 text-gallery-text-50">
      <div className="flex min-h-screen">
        <Sidebar route={route} navigate={navigate} />
        <div className="min-w-0 flex-1">
          <TopBar route={route} />
          {children}
        </div>
      </div>
    </div>
  );
}

function Page({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children: ReactNode }) {
  return (
    <main className="px-3 py-5 lg:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gallery-text-50 sm:text-3xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-xs leading-5 text-gallery-text-100">{description}</p>}
        </div>
        {children}
      </div>
    </main>
  );
}

function GalleryPage({ navigate }: { navigate: (href: string) => void }) {
  const starterRequests = catalog.starterRequestsForAgents || [];
  const colorTokens = catalog.foundations?.colors || [];

  return (
    <Page
      eyebrow="Gallery"
      title={catalog.name || "Design system Gallery"}
      description="A visual home for designers to inspect the current design-system state, browse reusable items, and open one-off mockups."
    >
      <div className="grid gap-2.5 md:grid-cols-3">
        <MetricCard icon={<Layers3 className="size-4" />} label="Reusable components" value={components.length} />
        <MetricCard icon={<FolderKanban className="size-4" />} label="One-off mockups" value={mockups.length} />
        <MetricCard icon={<BookOpen className="size-4" />} label="Guidance source" value="style-guide.md" />
      </div>

      <section className="mt-5 grid min-w-0 items-start gap-2.5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title="Foundations" icon={<SwatchBook className="size-4" />}>
          {colorTokens.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-2.5">
              {colorTokens.map((color) => (
                <div key={color.token} className="min-w-0 rounded-md border border-gallery-background-200 bg-white p-3">
                  <div className="mb-3 h-10 rounded-md bg-gallery-background-100 ring-1 ring-gallery-background-200" />
                  <p className="truncate font-mono text-xs font-medium text-gallery-text-50">{color.token}</p>
                  <p className="mt-1 text-xs leading-5 text-gallery-text-100">{color.use}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No foundation metadata yet" body="Add color, shape, and density notes to client-design-system/catalog.json." />
          )}
          <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-2.5">
            <InfoLine label="Shape" value={catalog.foundations?.shape || "No shape guidance yet."} />
            <InfoLine label="Density" value={catalog.foundations?.density || "No density guidance yet."} />
          </div>
        </Panel>

        <Panel title="Agent instructions" icon={<FileText className="size-4" />}>
          <p className="text-xs leading-5 text-gallery-text-100">
            The style guide is mostly agent-facing and read-only for designers. It is rendered here for transparency. Repo-level usage docs live in docs/README.md, docs/agent-workflow.md, and docs/designer-workflow.md.
          </p>
          <pre className="mt-3 max-h-56 w-full max-w-full overflow-auto rounded-md bg-gallery-text-50 p-3 text-xs leading-5 text-white"><code>{styleGuide.slice(0, 1400)}{styleGuide.length > 1400 ? "\n…" : ""}</code></pre>
          <Link href="/style-guide" navigate={navigate} className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-gallery-text-50 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-gallery-text-100">
            Open style guide <ArrowRight className="size-4" />
          </Link>
        </Panel>
      </section>

      <InventorySection
        title="Reusable components"
        description="Abstracted items intended to be reused across mockups."
        emptyTitle="No components found"
        emptyBody="Add React components to client-design-system/components/."
      >
        {components.map((component) => (
          <InventoryCard
            key={component.slug}
            title={component.name}
            label="Component"
            body={component.metadata?.useWhen || "Discovered from source. Add catalog metadata for usage guidance."}
            href={`/component/${component.slug}`}
            navigate={navigate}
          />
        ))}
      </InventorySection>

      <InventorySection
        title="One-off mockups"
        description="Disposable design instantiations using local mock data."
        emptyTitle="No mockups found"
        emptyBody="Add a folder under client-design-system/mockups/ or run npm run new-flow <name>."
      >
        {mockups.map((mockup) => (
          <InventoryCard
            key={mockup.slug}
            title={mockup.name}
            label="Mockup"
            body={mockup.purpose || "Discovered from folder structure. Add catalog metadata for purpose and status."}
            href={`/mockup/${mockup.slug}`}
            navigate={navigate}
          />
        ))}
      </InventorySection>

      {starterRequests.length > 0 && (
        <Panel title="Useful designer requests" icon={<Sparkles className="size-4" />} className="mt-5">
          <div className="grid gap-2.5 md:grid-cols-2">
            {starterRequests.map((request) => (
              <div key={request} className="rounded-md border border-gallery-background-200 bg-gallery-background-50 p-3 text-xs font-medium text-gallery-text-100">
                “{request}”
              </div>
            ))}
          </div>
        </Panel>
      )}
    </Page>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-gallery-background-200 bg-white p-3">
      <div className="grid size-8 place-items-center rounded-md bg-gallery-primary-50 text-gallery-primary-700">{icon}</div>
      <p className="mt-3 text-xl font-semibold tracking-tight text-gallery-text-50">{value}</p>
      <p className="mt-1 text-xs font-medium text-gallery-text-100">{label}</p>
    </div>
  );
}

function Panel({ title, icon, children, className = "" }: { title: string; icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 rounded-lg border border-gallery-background-200 bg-white p-3 ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded-md bg-gallery-background-50 text-gallery-primary-700">{icon}</div>
        <h2 className="text-base font-semibold tracking-tight text-gallery-text-50">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gallery-background-200 bg-gallery-background-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700">{label}</p>
      <p className="mt-2 text-xs leading-5 text-gallery-text-100">{value}</p>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-dashed border-gallery-background-200 bg-gallery-background-50 p-4 text-center">
      <PackageOpen className="mx-auto size-8 text-gallery-text-100" />
      <h3 className="mt-3 text-base font-bold text-gallery-text-50">{title}</h3>
      <p className="mt-1 text-xs text-gallery-text-100">{body}</p>
    </div>
  );
}

function InventorySection({ title, description, emptyTitle, emptyBody, children }: { title: string; description: string; emptyTitle: string; emptyBody: string; children: ReactNode[] }) {
  return (
    <section className="mt-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-gallery-text-50">{title}</h2>
        <p className="mt-1 text-xs text-gallery-text-100">{description}</p>
      </div>
      {children.length > 0 ? <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">{children}</div> : <EmptyState title={emptyTitle} body={emptyBody} />}
    </section>
  );
}

function InventoryCard({ title, label, body, href, navigate }: { title: string; label: string; body: string; href: string; navigate: (href: string) => void }) {
  return (
    <Link href={href} navigate={navigate} className="group rounded-lg border border-gallery-background-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-gallery-primary-200">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700">{label}</p>
      <h3 className="mt-2 text-base font-semibold tracking-tight text-gallery-text-50 group-hover:text-gallery-primary-700">{title}</h3>
      <p className="mt-3 min-h-12 text-xs leading-5 text-gallery-text-100">{body}</p>
      <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-gallery-text-50">Open <ArrowRight className="size-4" /></span>
    </Link>
  );
}

function ComponentPage({ slug }: { slug: string }) {
  const component = findComponent(slug);

  if (!component) {
    return <MissingPage eyebrow="Component" title={`No component named ${titleFromSlug(slug)}`} body="Add the component to client-design-system/components/ or update catalog.json." />;
  }

  const metadata = component.metadata;
  const chips = [
    ...(metadata?.variants || []).map((value) => ({ label: "Variant", value })),
    ...(metadata?.states || []).map((value) => ({ label: "State", value })),
    ...(metadata?.sizes || []).map((value) => ({ label: "Size", value })),
    ...(metadata?.parts || []).map((value) => ({ label: "Part", value }))
  ];

  return (
    <Page
      eyebrow="Reusable component"
      title={component.name}
      description={metadata?.useWhen || "This reusable item was discovered from source. Add catalog metadata for usage guidance."}
    >
      <div className="grid gap-3 xl:grid-cols-[1fr_22rem]">
        <section>
          <div className="mb-3 rounded-lg border border-gallery-background-200 bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700">Standard component canvas</p>
            <div className="mt-3">{renderComponentExample(component.slug)}</div>
          </div>
        </section>

        <aside className="grid gap-2.5 content-start">
          <Panel title="Metadata" icon={<Box className="size-4" />}>
            <div className="grid gap-2.5 text-xs">
              <InfoLine label="Source" value={component.file || component.sourcePath || "Unknown source file"} />
              <InfoLine label="Designer prompt" value={metadata?.designerPrompt || "No designer prompt yet. Add one to catalog.json."} />
            </div>
          </Panel>

          <Panel title="Variants and states" icon={<CheckCircle2 className="size-4" />}>
            {chips.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={`${chip.label}-${chip.value}`} className="rounded bg-gallery-background-100 px-2 py-0.5 text-xs font-bold text-gallery-text-100">
                    {chip.label}: {chip.value}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyState title="No variants documented" body="Add variants, states, sizes, or parts to catalog.json." />
            )}
          </Panel>
        </aside>
      </div>
    </Page>
  );
}

function MockupPage({ slug }: { slug: string }) {
  const mockup = findMockup(slug);

  if (!mockup) {
    return <MissingPage eyebrow="Mockup" title={`No mockup named ${titleFromSlug(slug)}`} body="Add a React/TSX mockup folder under client-design-system/mockups/." />;
  }

  const MockupComponent = mockup.Component;

  return (
    <Page
      eyebrow="One-off mockup"
      title={mockup.name}
      description={mockup.purpose || "This mockup was discovered from folder structure. Add catalog metadata to describe its purpose."}
    >
      <div className="rounded-lg border border-gallery-background-200 bg-white p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 border-b border-gallery-background-200 pb-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gallery-primary-700">Standard mockup canvas</p>
            <p className="mt-1 text-xs text-gallery-text-100">Source: client-design-system/mockups/{mockup.slug}/src/App.tsx</p>
          </div>
          <span className="rounded bg-gallery-background-100 px-2 py-0.5 text-xs font-bold text-gallery-text-100">Embedded in Gallery shell</span>
        </div>
        <div className="client-design-canvas overflow-hidden rounded-md border border-gallery-background-200 bg-background-50">
          <MockupComponent />
        </div>
      </div>
    </Page>
  );
}

function StyleGuidePage() {
  return (
    <Page
      eyebrow="Agent-facing instructions"
      title="Style guide"
      description="Rendered from client-design-system/style-guide.md for transparency. Designers can review it, but agents maintain it from project direction."
    >
      <div className="rounded-lg border border-gallery-background-200 bg-white p-3">
        <pre className="overflow-auto whitespace-pre-wrap rounded-md bg-gallery-text-50 p-3 text-xs leading-5 text-white"><code>{styleGuide}</code></pre>
      </div>
    </Page>
  );
}

function MissingPage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <Page eyebrow={eyebrow} title={title} description={body}>
      <EmptyState title="Nothing to render" body="Use the sidebar to open an existing Gallery route." />
    </Page>
  );
}

export default function App() {
  const { route, navigate } = useRoute();

  const content = useMemo(() => {
    switch (route.kind) {
      case "gallery":
        return <GalleryPage navigate={navigate} />;
      case "style-guide":
        return <StyleGuidePage />;
      case "component":
        return <ComponentPage slug={route.slug} />;
      case "mockup":
        return <MockupPage slug={route.slug} />;
      case "not-found":
        return <MissingPage eyebrow="Route" title="Page not found" body={`No Gallery route exists for ${route.path}.`} />;
    }
  }, [route, navigate]);

  return <AppShell route={route} navigate={navigate}>{content}</AppShell>;
}
