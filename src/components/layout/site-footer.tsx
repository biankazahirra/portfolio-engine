import { Metadata } from "../shared/metadata";
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
          <div>
            <strong>{name}</strong>
            <p className="metadata">{title}</p>
          </div>
          <Metadata>
            © {new Date().getFullYear()} {name}
          </Metadata>
        </div>
      </PageContainer>
    </footer>
  );
}
