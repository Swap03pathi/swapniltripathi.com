import { useParams } from 'react-router-dom';
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
    return <RealTimeVirtualExecutionArchitecturePage />;
  }

  if (slug === RRIS_PROJECT_SLUG) {
    return <RealtimeRecommendationIngestionArchitecturePage />;
  }

  if (slug === MMIE_PROJECT_SLUG) {
    return <MultidimensionalMarketIntelligenceArchitecturePage />;
  }

  return <NotFoundPage />;
}
