import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

// Wired into Layout.tsx by the orchestrator. Loads only the domAnimation
// feature set (~down from the full motion bundle); therefore all animated
// elements must use m.* from framer-motion — motion.* would silently pull
// the full runtime back in. Non-strict so a stray motion.* still renders.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
