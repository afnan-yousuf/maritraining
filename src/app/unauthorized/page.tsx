export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  );
}