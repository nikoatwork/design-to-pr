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
import { ArrowRight, Bell, CheckCircle2, Copy, Settings } from "lucide-react";

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

export function ExampleFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-background-200 bg-background-50 p-5">
      <div className="rounded-xl border border-background-200 bg-white p-5 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function renderComponentExample(slug: string) {
  switch (slug) {
    case "avatar":
      return (
        <ExampleFrame>
          <div className="grid gap-5">
            <Avatar fallback="AR" status="online" label={{ title: "Avery Rhodes", subtitle: "Design lead" }} />
            <div className="flex flex-wrap items-center gap-4">
              <Avatar fallback="XS" size="xs" />
              <Avatar fallback="SM" size="sm" />
              <Avatar fallback="MD" size="md" status="busy" />
              <Avatar fallback="LG" size="lg" status="offline" />
              <AvatarGroup data={people} />
            </div>
          </div>
        </ExampleFrame>
      );
    case "badge":
      return (
        <ExampleFrame>
          <div className="flex flex-wrap gap-3">
            <Badge>Neutral</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="info"><CheckCircle2 className="size-3.5" /> Info</Badge>
          </div>
        </ExampleFrame>
      );
    case "button":
      return (
        <ExampleFrame>
          <div className="flex flex-wrap gap-3">
            <Button trailingIcon={<ArrowRight className="size-4" />}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
            <Button disabled>Disabled</Button>
          </div>
        </ExampleFrame>
      );
    case "card":
      return (
        <ExampleFrame>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-50">Review packet</h3>
              <p className="mt-1 text-sm text-text-100">A focused grouping for one coherent object.</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <Badge tone="info">Draft</Badge>
                <Button size="sm" variant="secondary">Open</Button>
              </div>
            </CardContent>
          </Card>
        </ExampleFrame>
      );
    case "input":
      return (
        <ExampleFrame>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <Input label="Display name" name="displayName" placeholder="Avery Rhodes" />
            <Input label="Email" name="email" placeholder="avery@example.com" />
          </div>
        </ExampleFrame>
      );
    case "progress":
      return (
        <ExampleFrame>
          <div className="grid gap-3">
            <div className="flex items-center justify-between text-sm font-semibold text-text-100">
              <span>Setup progress</span>
              <span>72%</span>
            </div>
            <Progress value={72} />
          </div>
        </ExampleFrame>
      );
    case "switch":
      return (
        <ExampleFrame>
          <div className="flex flex-wrap gap-5">
            <Switch checked label="Enabled" />
            <Switch label="Disabled" />
          </div>
        </ExampleFrame>
      );
    case "tabs":
      return (
        <ExampleFrame>
          <Tabs items={[{ label: "Edit", active: true }, { label: "Preview" }, { label: "Notes" }]} />
        </ExampleFrame>
      );
    case "icon-button":
      return (
        <ExampleFrame>
          <div className="flex gap-3">
            <IconButton aria-label="Copy"><Copy className="size-4" /></IconButton>
            <IconButton aria-label="Settings"><Settings className="size-4" /></IconButton>
            <IconButton aria-label="Notifications"><Bell className="size-4" /></IconButton>
          </div>
        </ExampleFrame>
      );
    default:
      return (
        <ExampleFrame>
          <p className="text-sm text-text-100">
            No starter example has been defined for this component yet. Add one in `app/src/examples.tsx` or update `catalog.json` with guidance.
          </p>
        </ExampleFrame>
      );
  }
}
