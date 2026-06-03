import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle2,
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

function Sidebar({ route, navigate }: { route: Route; navigate: (href: string) => void }) {
  const active = slugForRoute(route);

  const navClass = (isActive: boolean) =>
    `flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-text-50 text-white shadow-sm"
        : "text-text-100 hover:bg-background-50 hover:text-text-50"
    }`;

  return (
    <aside className="hidden w-80 shrink-0 border-r border-background-200 bg-white lg:block">
      <div className="sticky top-0 h-screen overflow-y-auto px-5 py-6">
        <div className="mb-7 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-text-50 text-white">
            <SwatchBook className="size-5" />
          </div>
          <div>
            <p className="text-sm font-black tracking-tight text-text-50">Design System</p>
            <p className="text-xs font-semibold text-text-100">{catalog.name || "Gallery"}</p>
          </div>
        </div>

        <nav className="grid gap-4" aria-label="Design system navigation">
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
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary-700 hover:bg-primary-50">
              <span className="inline-flex items-center gap-2"><Layers3 className="size-4" /> Components</span>
              <span>{components.length}</span>
            </summary>
            <div className="mt-2 grid gap-1">
              {components.length > 0 ? components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/component/${component.slug}`}
                  navigate={navigate}
                  className={navClass(route.kind === "component" && active === component.slug)}
                >
                  <span>{component.name}</span>
                  {!component.metadata && <span className="rounded bg-background-100 px-1.5 py-0.5 text-[10px] uppercase">file</span>}
                </Link>
              )) : <EmptyNavItem>No components found</EmptyNavItem>}
            </div>
          </details>

          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary-700 hover:bg-primary-50">
              <span className="inline-flex items-center gap-2"><FolderKanban className="size-4" /> Mockups</span>
              <span>{mockups.length}</span>
            </summary>
            <div className="mt-2 grid gap-1">
              {mockups.length > 0 ? mockups.map((mockup) => (
                <Link
                  key={mockup.slug}
                  href={`/mockup/${mockup.slug}`}
                  navigate={navigate}
                  className={navClass(route.kind === "mockup" && active === mockup.slug)}
                >
                  <span>{mockup.name}</span>
                  {!mockup.metadata && <span className="rounded bg-background-100 px-1.5 py-0.5 text-[10px] uppercase">folder</span>}
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
  return <div className="rounded-lg px-3 py-2 text-sm font-semibold text-text-100">{children}</div>;
}

function TopBar({ route, navigate }: { route: Route; navigate: (href: string) => void }) {
  const title =
    route.kind === "gallery" ? "Gallery" :
    route.kind === "style-guide" ? "Style guide" :
    route.kind === "component" ? `Component: ${titleFromSlug(route.slug)}` :
    route.kind === "mockup" ? `Mockup: ${titleFromSlug(route.slug)}` :
    "Not found";

  return (
    <header className="sticky top-0 z-20 border-b border-background-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button className="grid size-10 place-items-center rounded-lg border border-background-200 text-text-100 lg:hidden" type="button" aria-label="Open navigation">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-black tracking-tight text-text-50">{title}</p>
            <p className="truncate text-xs font-semibold text-text-100">Designer-facing visual map</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/" navigate={navigate} className="rounded-lg px-3 py-2 text-sm font-semibold text-text-100 hover:bg-background-50">Gallery</Link>
          <Link href="/style-guide" navigate={navigate} className="rounded-lg px-3 py-2 text-sm font-semibold text-text-100 hover:bg-background-50">Style guide</Link>
        </div>
      </div>
    </header>
  );
}

function AppShell({ children, route, navigate }: { children: ReactNode; route: Route; navigate: (href: string) => void }) {
  return (
    <div className="min-h-screen bg-background-50 text-text-50">
      <div className="flex min-h-screen">
        <Sidebar route={route} navigate={navigate} />
        <div className="min-w-0 flex-1">
          <TopBar route={route} navigate={navigate} />
          {children}
        </div>
      </div>
    </div>
  );
}

function Page({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children: ReactNode }) {
  return (
    <main className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-700">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-text-50 sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-3xl text-base leading-7 text-text-100">{description}</p>}
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
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard icon={<Layers3 className="size-5" />} label="Reusable components" value={components.length} />
        <MetricCard icon={<FolderKanban className="size-5" />} label="One-off mockups" value={mockups.length} />
        <MetricCard icon={<BookOpen className="size-5" />} label="Guidance source" value="style-guide.md" />
      </div>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Foundations" icon={<SwatchBook className="size-5" />}>
          {colorTokens.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {colorTokens.map((color) => (
                <div key={color.token} className="rounded-xl border border-background-200 bg-white p-4">
                  <div className="mb-4 h-16 rounded-lg bg-background-100 ring-1 ring-background-200" />
                  <p className="font-mono text-sm font-bold text-text-50">{color.token}</p>
                  <p className="mt-1 text-sm leading-6 text-text-100">{color.use}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No foundation metadata yet" body="Add color, shape, and density notes to client-design-system/catalog.json." />
          )}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InfoLine label="Shape" value={catalog.foundations?.shape || "No shape guidance yet."} />
            <InfoLine label="Density" value={catalog.foundations?.density || "No density guidance yet."} />
          </div>
        </Panel>

        <Panel title="Agent instructions" icon={<FileText className="size-5" />}>
          <p className="text-sm leading-6 text-text-100">
            The style guide is mostly agent-facing and read-only for designers. It is rendered here for transparency. Repo-level usage docs live in docs/README.md, docs/agent-workflow.md, and docs/designer-workflow.md.
          </p>
          <pre className="mt-4 max-h-56 overflow-auto rounded-xl bg-text-50 p-4 text-xs leading-5 text-white"><code>{styleGuide.slice(0, 1400)}{styleGuide.length > 1400 ? "\n…" : ""}</code></pre>
          <Link href="/style-guide" navigate={navigate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-text-50 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
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
        <Panel title="Useful designer requests" icon={<Sparkles className="size-5" />} className="mt-8">
          <div className="grid gap-3 md:grid-cols-2">
            {starterRequests.map((request) => (
              <div key={request} className="rounded-xl border border-background-200 bg-background-50 p-4 text-sm font-semibold text-text-100">
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
    <div className="rounded-2xl border border-background-200 bg-white p-5 shadow-sm">
      <div className="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-700">{icon}</div>
      <p className="mt-4 text-2xl font-black tracking-tight text-text-50">{value}</p>
      <p className="mt-1 text-sm font-semibold text-text-100">{label}</p>
    </div>
  );
}

function Panel({ title, icon, children, className = "" }: { title: string; icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-background-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-background-50 text-primary-700">{icon}</div>
        <h2 className="text-xl font-black tracking-tight text-text-50">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-background-200 bg-background-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">{label}</p>
      <p className="mt-2 text-sm leading-6 text-text-100">{value}</p>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-background-200 bg-background-50 p-6 text-center">
      <PackageOpen className="mx-auto size-8 text-text-100" />
      <h3 className="mt-3 text-base font-bold text-text-50">{title}</h3>
      <p className="mt-1 text-sm text-text-100">{body}</p>
    </div>
  );
}

function InventorySection({ title, description, emptyTitle, emptyBody, children }: { title: string; description: string; emptyTitle: string; emptyBody: string; children: ReactNode[] }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-black tracking-tight text-text-50">{title}</h2>
        <p className="mt-1 text-sm text-text-100">{description}</p>
      </div>
      {children.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div> : <EmptyState title={emptyTitle} body={emptyBody} />}
    </section>
  );
}

function InventoryCard({ title, label, body, href, navigate }: { title: string; label: string; body: string; href: string; navigate: (href: string) => void }) {
  return (
    <Link href={href} navigate={navigate} className="group rounded-2xl border border-background-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">{label}</p>
      <h3 className="mt-2 text-xl font-black tracking-tight text-text-50 group-hover:text-primary-700">{title}</h3>
      <p className="mt-3 min-h-16 text-sm leading-6 text-text-100">{body}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-text-50">Open <ArrowRight className="size-4" /></span>
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
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <section>
          <div className="mb-4 rounded-2xl border border-background-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">Standard component canvas</p>
            <div className="mt-4">{renderComponentExample(component.slug)}</div>
          </div>
        </section>

        <aside className="grid gap-4 content-start">
          <Panel title="Metadata" icon={<Box className="size-5" />}>
            <div className="grid gap-3 text-sm">
              <InfoLine label="Source" value={component.file || component.sourcePath || "Unknown source file"} />
              <InfoLine label="Designer prompt" value={metadata?.designerPrompt || "No designer prompt yet. Add one to catalog.json."} />
            </div>
          </Panel>

          <Panel title="Variants and states" icon={<CheckCircle2 className="size-5" />}>
            {chips.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={`${chip.label}-${chip.value}`} className="rounded-full bg-background-100 px-3 py-1 text-xs font-bold text-text-100">
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
      <div className="rounded-2xl border border-background-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-background-200 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-700">Standard mockup canvas</p>
            <p className="mt-1 text-sm text-text-100">Source: client-design-system/mockups/{mockup.slug}/src/App.tsx</p>
          </div>
          <span className="rounded-full bg-background-100 px-3 py-1 text-xs font-bold text-text-100">Embedded in Gallery shell</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-background-200 bg-background-50">
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
      <div className="rounded-2xl border border-background-200 bg-white p-5 shadow-sm">
        <pre className="overflow-auto whitespace-pre-wrap rounded-xl bg-text-50 p-5 text-sm leading-6 text-white"><code>{styleGuide}</code></pre>
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
