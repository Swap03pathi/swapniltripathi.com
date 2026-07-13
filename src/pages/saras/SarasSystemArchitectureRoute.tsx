import { Navigate, useParams } from 'react-router-dom';
import SarasSystemArchitecturePage from './SarasSystemArchitecturePage';

const VALID = ['realtime-ingestion', 'realtime-execution', 'market-intelligence'] as const;
type SystemId = (typeof VALID)[number];

export default function SarasSystemArchitectureRoute() {
  const { system } = useParams();
  if (!VALID.includes(system as SystemId)) return <Navigate to="/404" replace />;
  return <SarasSystemArchitecturePage system={system as SystemId} />;
}
