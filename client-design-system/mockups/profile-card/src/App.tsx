import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Progress,
  Switch,
  Tabs
} from "client-design-system/components";
import { ArrowRight, CheckCircle2, Mail, UserRound } from "lucide-react";

const steps = [
  { label: "Profile", done: true },
  { label: "Preferences", done: true },
  { label: "Invite", done: false }
];

export default function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-background-50 p-5 text-text-50">
      <Card className="w-full max-w-xl overflow-hidden">
        <CardContent className="grid gap-6 p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                fallback="AR"
                src="https://i.pravatar.cc/150?img=49"
                status="online"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold">Avery Rhodes</h1>
                  <Badge tone="success">
                    <CheckCircle2 className="size-3.5" />
                    Verified
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-text-100">Design lead at Northstar Studio</p>
              </div>
            </div>

            <Tabs
              items={[
                { label: "Edit", active: true },
                { label: "Preview" }
              ]}
            />
          </div>

          <div className="grid gap-3 rounded-lg border border-background-200 bg-background-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-text-100">Onboarding progress</p>
              <Badge tone="info">72%</Badge>
            </div>
            <Progress value={72} />
            <div className="grid gap-2 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-text-100"
                  key={step.label}
                >
                  <span
                    className={`size-2 rounded-full ${
                      step.done ? "bg-emerald-500" : "bg-background-200"
                    }`}
                  />
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Display name"
              name="displayName"
              placeholder="Avery Rhodes"
            />
            <Input
              label="Email"
              name="email"
              placeholder="avery@northstar.studio"
            />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-background-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Share progress with the client</p>
              <p className="mt-1 text-sm text-text-100">Keeps reviewers in the loop while the mockup evolves.</p>
            </div>
            <Switch checked label="Enabled" />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <Button leadingIcon={<UserRound className="size-4" />} variant="secondary">
              View profile
            </Button>
            <Button leadingIcon={<Mail className="size-4" />} variant="secondary">
              Invite
            </Button>
            <Button trailingIcon={<ArrowRight className="size-4" />}>Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
