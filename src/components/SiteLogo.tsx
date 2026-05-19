import { resolveAssetUrl } from '../utils/assetUrl';

export default function SiteLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <img
      src={resolveAssetUrl('/favicon.svg')}
      alt=""
      className={`shrink-0 rounded-md object-contain transition-transform duration-200 group-hover:scale-[1.03] ${className}`}
      width={32}
      height={32}
    />
  );
}
