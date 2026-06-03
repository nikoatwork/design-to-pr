import type { ReactNode } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Input,
  Progress,
  Switch,
  Tabs
} from "client-design-system/components";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Copy,
  FileText,
  Code2,
  Layers3,
  Menu,
  MousePointer2,
  Search,
  Sparkles,
  SwatchBook
} from "lucide-react";

const navigation = [
  {
    title: "Resources",
    links: ["Overview", "Gallery", "Screenshots", "Catalog"]
  },
  {
    title: "Guides",
    links: ["Design workflow", "Agent workflow", "Client setup"]
  },
  {
    title: "Foundations",
    links: ["Layout", "Tones", "Color", "Spacing"]
  },
  {
    title: "Examples",
    links: ["Profile card", "Onboarding card"]
  },
  {
    title: "Components",
    links: ["Avatar", "Badge", "Button", "Card", "Input", "Progress", "Switch", "Tabs"]
  }
];

const colors = [
  { name: "primary.50", className: "bg-primary-50", text: "text-primary-700" },
  { name: "primary.500", className: "bg-primary-500", text: "text-white" },
  { name: "primary.700", className: "bg-primary-700", text: "text-white" },
  { name: "background.50", className: "bg-background-50", text: "text-text-50" },
  { name: "background.100", className: "bg-background-100", text: "text-text-50" },
  { name: "background.200", className: "bg-background-200", text: "text-text-50" },
  { name: "text.50", className: "bg-text-50", text: "text-white" },
  { name: "text.100", className: "bg-text-100", text: "text-white" }
];

const tones = ["neutral", "success", "warning", "danger", "info"] as const;
const buttonVariants = ["primary", "secondary", "ghost", "accent"] as const;

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function avatarSvg(label: string, background: string, foreground: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="${background}"/><text x="60" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${foreground}">${label}</text></svg>`
  )}`;
}

const people = [
  { src: avatarSvg("MR", "#dbeafe", "#1d4ed8"), alt: "Mira" },
  { src: avatarSvg("NO", "#dcfce7", "#047857"), alt: "Noah" },
  { src: avatarSvg("IR", "#fef3c7", "#b45309"), alt: "Iris" }
];

function TopBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-background-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-text-50 text-white">
            <SwatchBook className="size-5" />
          </div>
          <div>
            <p className="text-sm font-black tracking-tight">DESIGN SYSTEM</p>
            <p className="text-xs font-semibold text-text-100">Designer docs</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button size="sm" variant="ghost">Docs</Button>
          <Button size="sm" variant="ghost">Client theme</Button>
          <Button size="sm" variant="ghost">Wireframe</Button>
        </div>

        <button className="hidden h-9 min-w-64 items-center justify-between rounded-lg border border-background-200 bg-background-50 px-3 text-sm font-semibold text-text-100 shadow-sm md:flex">
          <span className="inline-flex items-center gap-2"><Search className="size-4" /> Search components</span>
          <kbd className="rounded bg-white px-1.5 py-0.5 text-xs text-text-100">Ctrl K</kbd>
        </button>

        <IconButton className="md:hidden" aria-label="Open menu">
          <Menu className="size-4" />
        </IconButton>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-background-200 bg-white px-6 py-7 lg:block">
      <div className="sticky top-24 grid gap-7">
        {navigation.map((group) => (
          <nav key={group.title} className="grid gap-2" aria-label={group.title}>
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-primary-600">{group.title}</h2>
            <div className="grid gap-1">
              {group.links.map((link) => (
                <a
                  key={link}
                  className="rounded-md px-2 py-1.5 text-sm font-semibold text-text-100 hover:bg-background-50 hover:text-text-50"
                  href={`#${slug(link)}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
        ))}
      </div>
    </aside>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-background-200 py-10 first:border-t-0 first:pt-0">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-text-50">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PrincipleCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Card>
      <CardContent className="grid gap-3 p-5">
        <div className="grid size-10 place-items-center rounded-lg bg-primary-50 text-primary-700">{icon}</div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm leading-6 text-text-100">{children}</p>
      </CardContent>
    </Card>
  );
}

function Swatch({ name, className, text }: { name: string; className: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-background-200 bg-white shadow-sm">
      <div className={`grid h-24 place-items-end p-3 ${className} ${text}`}>
        <span className="rounded-md bg-black/10 px-2 py-1 text-xs font-bold backdrop-blur-sm">{name}</span>
      </div>
      <div className="p-3 text-sm font-semibold text-text-100">Token sample</div>
    </div>
  );
}

function CodeSample({ children }: { children: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-background-200 bg-text-50 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
        <span>Code</span>
        <span className="inline-flex items-center gap-1"><Copy className="size-3.5" /> Copy</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6"><code>{children}</code></pre>
    </div>
  );
}

function PropsTable({ rows }: { rows: { name: string; type: string; note: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-background-200">
      {rows.map((row) => (
        <div key={row.name} className="grid gap-1 border-b border-background-200 bg-white p-3 last:border-b-0 sm:grid-cols-[9rem_1fr]">
          <div className="font-mono text-sm font-bold text-text-50">{row.name}</div>
          <div>
            <p className="font-mono text-xs font-semibold text-primary-700">{row.type}</p>
            <p className="mt-1 text-sm text-text-100">{row.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComponentDoc({
  name,
  description,
  children,
  guidance,
  props,
  code
}: {
  name: string;
  description: string;
  children: ReactNode;
  guidance: string[];
  props: { name: string; type: string; note: string }[];
  code: string;
}) {
  return (
    <article id={slug(name)} className="scroll-mt-24 border-t border-background-200 py-8 first:border-t-0 first:pt-0">
      <div className="grid gap-6 xl:grid-cols-[1fr_18rem]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-black tracking-tight">{name}</h3>
            <a className="text-sm font-bold text-primary-600 hover:text-primary-700" href={`#${slug(name)}-props`}>Props</a>
          </div>
          <p className="mt-2 max-w-2xl leading-7 text-text-100">{description}</p>
        </div>
        <div className="flex gap-2 xl:justify-end">
          <Button size="sm" variant="secondary" leadingIcon={<Code2 className="size-4" />}>View code</Button>
          <Button size="sm" variant="ghost" leadingIcon={<MousePointer2 className="size-4" />}>Ask agent</Button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-background-200 bg-white p-5 shadow-sm">
        {children}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <h4 className="font-bold">Usage guidance</h4>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm leading-6 text-text-100">
              {guidance.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <div id={`${slug(name)}-props`} className="scroll-mt-24">
          <PropsTable rows={props} />
        </div>
      </div>

      <div className="mt-5">
        <CodeSample>{code}</CodeSample>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-background-50 text-text-50">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
            <section id="overview" className="scroll-mt-24 rounded-2xl border border-background-200 bg-white p-6 shadow-sm sm:p-8">
              <Badge tone="info"><Sparkles className="size-3.5" /> Designer view</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Design System Gallery</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-text-100">
                A Braid-inspired documentation surface for designers and coding agents. It combines a component gallery, foundations, usage guidance, props, and copyable examples in one reviewable place.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button leadingIcon={<Layers3 className="size-4" />} trailingIcon={<ArrowRight className="size-4" />}>Browse components</Button>
                <Button variant="secondary" leadingIcon={<FileText className="size-4" />}>Read guide</Button>
              </div>
            </section>

            <Section id="design-workflow" eyebrow="Guides" title="What makes this approach useful">
              <div className="grid gap-4 md:grid-cols-3">
                <PrincipleCard icon={<BookOpen className="size-5" />} title="Readable to designers">
                  The page explains when to use each piece before showing props or code. This mirrors Braid's preference for APIs and docs that non-developers can understand.
                </PrincipleCard>
                <PrincipleCard icon={<Layers3 className="size-5" />} title="Composable by agents">
                  Components are shown as small pieces first, then as patterns. A coding agent can copy the component language into a focused mockup.
                </PrincipleCard>
                <PrincipleCard icon={<Code2 className="size-5" />} title="No app complexity">
                  This stays separate from product routing, APIs, and auth. The system remains a safe visual sandbox for review.
                </PrincipleCard>
              </div>
            </Section>

            <Section id="layout" eyebrow="Foundations" title="Layout, tones, and color">
              <div className="grid gap-6">
                <Card>
                  <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr]">
                    <div>
                      <h3 className="text-xl font-bold">Layout principle</h3>
                      <p className="mt-2 leading-7 text-text-100">
                        Components should not secretly own surrounding white space. Mockups and layout wrappers decide spacing, alignment, and rhythm so compositions stay predictable.
                      </p>
                    </div>
                    <div className="grid gap-3 rounded-xl bg-background-50 p-4">
                      <div className="rounded-lg bg-white p-3 shadow-sm">Stack: vertical rhythm</div>
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">Inline</div>
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">Spread</div>
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">Tiles</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div id="tones" className="scroll-mt-24 grid gap-3 rounded-2xl border border-background-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold">Tones</h3>
                  <p className="text-sm leading-6 text-text-100">Tones describe meaning before color. Use them for statuses, messages, and action emphasis.</p>
                  <div className="flex flex-wrap gap-3">
                    {tones.map((tone) => <Badge key={tone} tone={tone}>{tone}</Badge>)}
                  </div>
                </div>

                <div id="color" className="scroll-mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {colors.map((color) => <Swatch key={color.name} {...color} />)}
                </div>
              </div>
            </Section>

            <Section id="gallery" eyebrow="Resources" title="Component gallery">
              <div className="grid gap-7">
                <div className="rounded-2xl border border-background-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-sm font-bold text-text-100">Jump to</p>
                  <div className="flex flex-wrap gap-2">
                    {["Avatar", "Badge", "Button", "Card", "Input", "Progress", "Switch", "Tabs"].map((name) => (
                      <a key={name} className="rounded-full bg-background-50 px-3 py-1.5 text-sm font-bold text-text-100 hover:bg-primary-50 hover:text-primary-700" href={`#${slug(name)}`}>{name}</a>
                    ))}
                  </div>
                </div>

                <ComponentDoc
                  name="Button"
                  description="A prominent interactive element for initiating an action. Use variant and size to create action hierarchy."
                  guidance={[
                    "Use one primary button for the main action in a section.",
                    "Use secondary or ghost buttons for alternatives.",
                    "Do not use buttons for navigation when a text link would be clearer."
                  ]}
                  props={[
                    { name: "variant", type: "primary | secondary | ghost | accent", note: "Controls visual prominence and emphasis." },
                    { name: "size", type: "sm | md | lg", note: "Controls control height and padding." },
                    { name: "leadingIcon", type: "ReactNode", note: "Icon before the label." },
                    { name: "trailingIcon", type: "ReactNode", note: "Icon after the label." }
                  ]}
                  code={`<Button trailingIcon={<ArrowRight />}>Continue</Button>`}
                >
                  <div className="grid gap-4">
                    <div className="flex flex-wrap gap-3">
                      {buttonVariants.map((variant) => <Button key={variant} variant={variant}>{variant}</Button>)}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button>
                    </div>
                  </div>
                </ComponentDoc>

                <ComponentDoc
                  name="Badge"
                  description="A compact status, category, priority, or confidence label. Tone should match the meaning of the message."
                  guidance={[
                    "Keep badge labels short.",
                    "Use status tones consistently across mockups.",
                    "Avoid using badges as decorative color accents."
                  ]}
                  props={[
                    { name: "tone", type: "neutral | success | warning | danger | info", note: "Semantic color treatment." },
                    { name: "children", type: "ReactNode", note: "Short visible label." }
                  ]}
                  code={`<Badge tone="success">Ready for review</Badge>`}
                >
                  <div className="flex flex-wrap gap-3">
                    {tones.map((tone) => <Badge key={tone} tone={tone}>{tone === "success" && <CheckCircle2 className="size-3.5" />}{tone}</Badge>)}
                  </div>
                </ComponentDoc>

                <ComponentDoc
                  name="Input"
                  description="A labelled text field for short values such as names, emails, search terms, or project labels."
                  guidance={[
                    "Always keep labels visible.",
                    "Use placeholders as examples, not as instructions.",
                    "Show validation feedback near the field in final mockups."
                  ]}
                  props={[
                    { name: "label", type: "string", note: "Visible field label." },
                    { name: "name", type: "string", note: "Form field name and fallback id." },
                    { name: "placeholder", type: "string", note: "Example value." }
                  ]}
                  code={`<Input label="Project name" name="project" placeholder="Northstar launch" />`}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Project name" name="project" placeholder="Northstar launch" />
                    <Input label="Reviewer email" name="email" placeholder="mira@example.com" />
                  </div>
                </ComponentDoc>

                <ComponentDoc
                  name="Card"
                  description="A surface for grouping one coherent object, workflow, or example. Use cards deliberately rather than wrapping every item."
                  guidance={[
                    "Use cards for focused content groups.",
                    "Avoid nested cards unless there is a clear containment need.",
                    "Pair CardHeader and CardContent for scannable documentation."
                  ]}
                  props={[
                    { name: "className", type: "string", note: "Optional Tailwind classes for layout adjustments." },
                    { name: "children", type: "ReactNode", note: "Grouped content." }
                  ]}
                  code={`<Card>\n  <CardHeader>Title</CardHeader>\n  <CardContent>Content</CardContent>\n</Card>`}
                >
                  <Card className="max-w-xl">
                    <CardHeader><h4 className="font-bold">Review package</h4></CardHeader>
                    <CardContent className="grid gap-3">
                      <p className="text-sm text-text-100">A compact example of card structure.</p>
                      <Progress value={72} />
                    </CardContent>
                  </Card>
                </ComponentDoc>

                <ComponentDoc
                  name="Avatar"
                  description="A person or group identity marker for owners, reviewers, teammates, and collaborators."
                  guidance={[
                    "Use photos when people are recognizable and relevant.",
                    "Use initials when no photo is available.",
                    "Add status only when presence matters to the task."
                  ]}
                  props={[
                    { name: "src", type: "string", note: "Optional image source." },
                    { name: "fallback", type: "string", note: "Initials shown when no image is available." },
                    { name: "status", type: "none | online | offline | busy", note: "Presence indicator." }
                  ]}
                  code={`<Avatar fallback="AR" status="online" label={{ title: "Avery Rhodes" }} />`}
                >
                  <div className="grid gap-6 sm:grid-cols-3">
                    <Avatar fallback="AR" src={avatarSvg("AR", "#dbeafe", "#1d4ed8")} status="online" label={{ title: "Avery Rhodes", subtitle: "Design lead" }} />
                    <Avatar fallback="MK" status="busy" label={{ title: "Mika Kane", subtitle: "Reviewer" }} />
                    <AvatarGroup data={people} />
                  </div>
                </ComponentDoc>

                <ComponentDoc
                  name="Progress"
                  description="A linear completion indicator for setup, onboarding, upload, or review readiness."
                  guidance={[
                    "Use when percent complete is meaningful.",
                    "Pair with a label and numeric value when possible.",
                    "Do not use for unknown duration loading."
                  ]}
                  props={[{ name: "value", type: "number", note: "Clamped between 0 and 100." }]}
                  code={`<Progress value={84} />`}
                >
                  <div className="grid gap-3">
                    <div className="flex justify-between text-sm font-bold text-text-100"><span>Gallery readiness</span><span>84%</span></div>
                    <Progress value={84} />
                  </div>
                </ComponentDoc>

                <ComponentDoc
                  name="Switch"
                  description="An on or off control for a setting that applies immediately."
                  guidance={[
                    "Use for settings, not actions.",
                    "Make the label describe what is enabled.",
                    "Avoid vague labels like On or Off."
                  ]}
                  props={[
                    { name: "checked", type: "boolean", note: "Whether the setting is enabled." },
                    { name: "label", type: "string", note: "Visible setting label." }
                  ]}
                  code={`<Switch checked label="Client-visible" />`}
                >
                  <div className="flex flex-wrap gap-5"><Switch checked label="Client-visible" /><Switch label="Archived" /></div>
                </ComponentDoc>

                <ComponentDoc
                  name="Tabs"
                  description="A compact switcher between a few sibling views inside the same area."
                  guidance={[
                    "Use tabs for closely related views.",
                    "Keep tab labels short.",
                    "Do not use tabs for primary app navigation."
                  ]}
                  props={[{ name: "items", type: "{ label: string; active?: boolean }[]", note: "List of visible tab labels and active state." }]}
                  code={`<Tabs items={[{ label: "Overview", active: true }, { label: "Usage" }]} />`}
                >
                  <Tabs items={[{ label: "Overview", active: true }, { label: "Usage" }, { label: "States" }]} />
                </ComponentDoc>
              </div>
            </Section>

            <Section id="onboarding-card" eyebrow="Examples" title="Composition example">
              <Card className="overflow-hidden">
                <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                  <div>
                    <Badge tone="success"><CheckCircle2 className="size-3.5" /> Ready for review</Badge>
                    <h3 className="mt-4 text-3xl font-black tracking-tight">Client onboarding card</h3>
                    <p className="mt-3 max-w-xl leading-7 text-text-100">A small pattern that combines docs primitives into a focused mockup a designer can review and redirect.</p>
                    <div className="mt-6 flex flex-wrap gap-3"><Button>Preview mockup</Button><Button variant="secondary">Ask agent to remix</Button></div>
                  </div>
                  <div className="grid gap-4 rounded-2xl bg-background-50 p-4">
                    <Input label="Client" name="client" placeholder="Northstar Studio" />
                    <div className="grid gap-2"><div className="flex justify-between text-sm font-bold text-text-100"><span>Setup progress</span><Badge tone="info">3 of 4</Badge></div><Progress value={75} /></div>
                    <Switch checked label="Share with stakeholders" />
                  </div>
                </CardContent>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
