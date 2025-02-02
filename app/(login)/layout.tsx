export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3 !pt-0">
      {children}
    </main>
  );
}
