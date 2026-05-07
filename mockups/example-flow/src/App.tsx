export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Example Flow</h1>
        <p className="text-gray-600">
          This is a starter mockup. Replace this content with your flow using
          components from <code>../../client-design-system/components/</code>.
        </p>
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            💡 Run <code>npm run dev example-flow</code> from the repo root to preview.
          </p>
        </div>
      </div>
    </div>
  )
}
