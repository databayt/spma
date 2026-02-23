export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr">
      <div className="container">
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
}
