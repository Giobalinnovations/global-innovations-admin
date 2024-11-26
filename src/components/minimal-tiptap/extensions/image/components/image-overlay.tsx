import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const ImageOverlay = React.memo(() => {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center',
        'absolute inset-0 rounded bg-[var(--mt-overlay)] opacity-100 transition-opacity'
      )}
    >
      <Loader2 className="size-7 animate-spin" />
    </div>
  );
});

ImageOverlay.displayName = 'ImageOverlay';
