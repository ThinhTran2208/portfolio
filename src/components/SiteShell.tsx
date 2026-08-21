import Navbar from "./Navbar";
import Footer from "./Footer";
import MouseGlow from "./MouseGlow";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="siteShell">
      <div className="gridBackdrop" />
      <div className="scanlineBackdrop" />
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <MouseGlow />
      <Navbar />
      <main className="pageWrap">{children}</main>
      <Footer />
    </div>
  );
}
