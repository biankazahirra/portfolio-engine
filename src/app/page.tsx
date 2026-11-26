import { portfolioConfig } from "@/config/portfolio.config";
import { parsePortfolioConfig } from "@/lib/validation/portfolio-schema";
import { EditorialTemplate } from "@/templates/editorial/editorial-template";

export default function Page() {
  const config = parsePortfolioConfig(portfolioConfig);
  return <EditorialTemplate config={config} />;
}
