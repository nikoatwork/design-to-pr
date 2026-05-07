import { Avatar, AvatarGroup } from "client-design-system/components/tailgrids/core/avatar";
import { Badge } from "client-design-system/components/tailgrids/core/badge";
import { Button } from "client-design-system/components/tailgrids/core/button";
import { Card, CardContent } from "client-design-system/components/tailgrids/core/card";
import { Input } from "client-design-system/components/tailgrids/core/input";
import { IconButton, Tabs } from "client-design-system/components/tailgrids/core/tabs";
import {
  ArrowUpRight,
  Bell,
  CircleDollarSign,
  Search,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const approvers = [
  { src: "https://i.pravatar.cc/150?img=32", alt: "Mara" },
  { src: "https://i.pravatar.cc/150?img=47", alt: "Owen" },
  { src: "https://i.pravatar.cc/150?img=56", alt: "Priya" }
];

const metrics = [
  { label: "Operating balance", value: "$8.42M", badge: "+12.4%", tone: "success" as const },
  { label: "Pending review", value: "$186K", badge: "1 wire", tone: "warning" as const },
  { label: "Risk score", value: "98.2", badge: "Clear", tone: "info" as const }
];

export default function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f7fb] p-5 text-text-50">
      <Card className="w-full max-w-5xl overflow-hidden">
        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="grid content-between gap-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid size-11 place-items-center rounded-lg bg-slate-950 text-white">
                  <CircleDollarSign className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-50">LedgerVault</p>
                  <p className="text-sm text-text-100">Treasury control surface</p>
                </div>
                <Badge className="ml-auto" tone="success">
                  <ShieldCheck className="size-3.5" />
                  Live sync
                </Badge>
              </div>

              <div>
                <h1 className="max-w-xl text-3xl font-bold tracking-normal text-text-50 sm:text-4xl">
                  Fintech components, composed into one crisp client-ready mockup.
                </h1>
                <p className="mt-3 max-w-lg text-base leading-7 text-text-100">
                  A compact preview using the client design system: cards, badges,
                  buttons, inputs, tabs, avatars, and real dashboard data patterns.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div className="rounded-lg border border-background-200 bg-background-50 p-4" key={metric.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase text-text-100">{metric.label}</p>
                    <Badge tone={metric.tone}>{metric.badge}</Badge>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-text-50">{metric.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 rounded-lg border border-background-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <Tabs
                items={[
                  { label: "Today", active: true },
                  { label: "Week" },
                  { label: "Month" }
                ]}
              />
              <IconButton aria-label="Open notifications">
                <Bell className="size-4" />
              </IconButton>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input aria-label="Search accounts" className="pl-9" placeholder="Search accounts or vendors" />
            </div>

            <div className="rounded-lg bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">Approval queue</p>
                  <p className="mt-1 text-2xl font-bold">$186,000</p>
                </div>
                <Badge tone="warning">New beneficiary</Badge>
              </div>
              <div className="mt-6 flex items-end gap-2">
                {[38, 54, 46, 72, 64, 88, 102].map((height, index) => (
                  <div className="flex flex-1 items-end" key={`${height}-${index}`}>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-emerald-400 to-cyan-300"
                      style={{ height }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-background-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <Avatar
                fallback="MJ"
                src="https://i.pravatar.cc/150?img=28"
                status="online"
                label={{ title: "Mara Jensen", subtitle: "Controller" }}
              />
              <AvatarGroup data={approvers} size="sm" />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button variant="secondary">Review wire</Button>
              <Button trailingIcon={<ArrowUpRight className="size-4" />} variant="accent">
                Approve
              </Button>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700">
              <Sparkles className="size-4" />
              Built from reusable client components, no product logic attached.
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
