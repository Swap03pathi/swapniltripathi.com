import { Navigate, useParams } from 'react-router-dom';
import Seo from '../../components/Seo';
import SarasSystemArchitecturePage from './SarasSystemArchitecturePage';

const VALID = ['realtime-ingestion', 'realtime-execution', 'market-intelligence'] as const;
type SystemId = (typeof VALID)[number];

const META: Record<SystemId, { title: string; description: string }> = {
  'realtime-ingestion': {
    title: 'Realtime Signal Ingestion — Saras Architecture',
    description:
      'How Saras captures trading signals from Telegram, PDFs, YouTube live, X and news — normalized into one execution-ready schema by an LLM pipeline.',
  },
  'realtime-execution': {
    title: 'Realtime Virtual Execution — Saras Architecture',
    description:
      'A stateful WebSocket-driven engine tracking recommendations against live prices with Redis, MongoDB change streams, and automatic recovery.',
  },
  'market-intelligence': {
    title: 'Market Intelligence Engine — Saras Architecture',
    description:
      'Filter first, hydrate last: a Redis sorted-set computation layer for live ranking, filtering, and scoring of continuously mutating market signals.',
  },
};

export default function SarasSystemArchitectureRoute() {
  const { system } = useParams();
  if (!VALID.includes(system as SystemId)) return <Navigate to="/404" replace />;
  const id = system as SystemId;
  return (
    <>
      <Seo title={META[id].title} description={META[id].description} path={`/saras/systems/${id}`} />
      <SarasSystemArchitecturePage system={id} />
    </>
  );
}
