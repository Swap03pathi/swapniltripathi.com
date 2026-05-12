import { useCallback, useEffect, useRef, useState } from 'react';
import {
  RteExecutionLayer,
  RteInputSources,
} from './RteExecutionLayer';
import { RteConnectorV } from './RtePrimitives';
import type { RteExpandApi } from './RtePrimitives';
import {
  RteFooterTriad,
  RteRedisMongoSync,
  RteRecoveryFlow,
  RteTickProcessing,
  RteWebsocketLifecycle,
} from './RteFlowsBands';

export default function RteArchitectureCanvas() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setExpandedId(null);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const expand: RteExpandApi = { expandedId, toggleExpand };

  return (
    <div ref={rootRef} className="relative pb-16">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <RteInputSources expand={expand} />
      <div className="my-8 flex justify-center">
        <RteConnectorV />
      </div>
      <RteExecutionLayer expand={expand} />

      <div className="my-16 grid gap-10 xl:grid-cols-3">
        <RteTickProcessing />
        <RteRecoveryFlow />
        <RteRedisMongoSync />
      </div>

      <div className="mb-16">
        <RteWebsocketLifecycle />
      </div>

      <RteFooterTriad />
    </div>
  );
}
