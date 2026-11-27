import { PageContainer } from "./page-container";

interface SiteFooterProps {
  name: string;
  title: string;
}

export function SiteFooter({ name, title }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <PageContainer wide>
        <div className="footer-inner">
          <div className="footer-statement">
            <p className="footer-kicker">Closing statement</p>
            <p className="footer-line">Books closed. Thank you for reading.</p>
          </div>
          <div className="footer-meta">
            <strong>{name}</strong>
            <span className="metadata">{title}</span>
            <span className="metadata">
              © {new Date().getFullYear()} {name}
            </span>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
