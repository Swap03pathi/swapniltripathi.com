import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import NotFoundPage from './NotFoundPage';
import { RTE_PROJECT_SLUG } from '../constants/realTimeVirtualExecution';
import { RRIS_PROJECT_SLUG } from '../constants/realtimeRecommendationIngestion';
import { MMIE_PROJECT_SLUG } from '../constants/multidimensionalMarketIntelligence';
import RealTimeVirtualExecutionArchitecturePage from './RealTimeVirtualExecutionArchitecturePage';
import RealtimeRecommendationIngestionArchitecturePage from './RealtimeRecommendationIngestionArchitecturePage';
import MultidimensionalMarketIntelligenceArchitecturePage from './MultidimensionalMarketIntelligenceArchitecturePage';

export default function ProjectArchitecturePage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === RTE_PROJECT_SLUG) {
    return (
      <>
        <Seo
          title="Real-Time Virtual Execution — Architecture Deep Dive"
          description="A persistent WebSocket-driven engine matching live prices against signals — Redis state, Mongo change streams, automatic recovery."
          path={`/project/${slug}/architecture`}
        />
        <RealTimeVirtualExecutionArchitecturePage />
      </>
    );
  }

  if (slug === RRIS_PROJECT_SLUG) {
    return (
      <>
        <Seo
          title="Realtime Recommendation Ingestion — Architecture Deep Dive"
          description="How six noisy sources — Telegram, PDFs, YouTube live, X, news, web search — converge into one execution-ready trade schema via a two-stage LLM pipeline."
          path={`/project/${slug}/architecture`}
        />
        <RealtimeRecommendationIngestionArchitecturePage />
      </>
    );
  }

  if (slug === MMIE_PROJECT_SLUG) {
    return (
      <>
        <Seo
          title="Market Intelligence Engine — Architecture Deep Dive"
          description="Filter first, hydrate last: the Redis sorted-set architecture serving multidimensional, live-ranked market intelligence."
          path={`/project/${slug}/architecture`}
        />
        <MultidimensionalMarketIntelligenceArchitecturePage />
      </>
    );
  }

  // After the purge, only the three real architecture pages exist.
  return <NotFoundPage />;
}
