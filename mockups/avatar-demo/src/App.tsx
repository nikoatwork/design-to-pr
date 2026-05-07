import { Avatar, AvatarGroup } from 'client-design-system/components/tailgrids/core/avatar'

export default function App() {
  const groupData = [
    { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice' },
    { src: 'https://i.pravatar.cc/150?img=2', alt: 'Bob' },
    { src: 'https://i.pravatar.cc/150?img=3', alt: 'Charlie' },
    { src: 'https://i.pravatar.cc/150?img=4', alt: 'Dana' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 gap-12">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Avatar Demo</h1>
        <p className="text-gray-600">
          Using the Tailgrids Avatar component from the client design system.
        </p>

        {/* Single avatars with different sizes */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sizes</h2>
          <div className="flex items-center gap-6 flex-wrap">
            <Avatar size="xs" fallback="XS" />
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
            <Avatar size="xxl" fallback="XX" />
          </div>
        </section>

        {/* With images */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">With Images</h2>
          <div className="flex items-center gap-6 flex-wrap">
            <Avatar size="md" src="https://i.pravatar.cc/150?img=11" alt="User" fallback="U" />
            <Avatar size="lg" src="https://i.pravatar.cc/150?img=12" alt="User" fallback="U" />
            <Avatar size="xl" src="https://i.pravatar.cc/150?img=13" alt="User" fallback="U" />
          </div>
        </section>

        {/* Status indicators */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status Indicators</h2>
          <div className="flex items-center gap-6 flex-wrap">
            <Avatar size="md" fallback="ON" status="online" />
            <Avatar size="md" fallback="OF" status="offline" />
            <Avatar size="md" fallback="BU" status="busy" />
          </div>
        </section>

        {/* With labels */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">With Labels</h2>
          <div className="flex flex-col gap-4">
            <Avatar
              size="md"
              src="https://i.pravatar.cc/150?img=20"
              alt="Jane Doe"
              fallback="JD"
              label={{ title: 'Jane Doe', subtitle: 'Product Designer' }}
            />
            <Avatar
              size="lg"
              src="https://i.pravatar.cc/150?img=25"
              alt="John Smith"
              fallback="JS"
              status="online"
              label={{ title: 'John Smith', subtitle: 'Engineering Lead' }}
            />
          </div>
        </section>

        {/* Avatar group */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Avatar Group</h2>
          <AvatarGroup size="md" data={groupData} />
        </section>
      </div>
    </div>
  )
}
