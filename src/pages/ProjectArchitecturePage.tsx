import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { RTE_PROJECT_SLUG } from '../constants/realTimeVirtualExecution';
import RealTimeVirtualExecutionArchitecturePage from './RealTimeVirtualExecutionArchitecturePage';

export default function ProjectArchitecturePage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug !== RTE_PROJECT_SLUG) {
    return (
      <div className="relative z-10 min-h-[55vh] pt-24 pb-16 px-6">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-accent/45">
            Architecture
          </p>
          <h1 className="text-lg font-semibold text-white">Coming soon</h1>
          <p className="mt-3 text-sm text-white/40">
            A dedicated architecture walkthrough is not available for this
            project.
          </p>
          <Link
            to={`/project/${slug ?? ''}`}
            className="mt-8 inline-block text-sm text-accent hover:underline"
          >
            ← Back to project
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <RealTimeVirtualExecutionArchitecturePage />;
}
