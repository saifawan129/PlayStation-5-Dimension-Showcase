
import React, { useEffect } from 'react';
import '@google/model-viewer';

// Extend JSX namespace to support model-viewer custom element with proper React attributes
// We extend both JSX and React.JSX namespaces to ensure compatibility with various TypeScript and React versions
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        autoplay?: boolean;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        exposure?: string;
        'environment-image'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        style?: React.CSSProperties;
      };
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          autoplay?: boolean;
          'camera-controls'?: boolean;
          'touch-action'?: string;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          exposure?: string;
          'environment-image'?: string;
          ar?: boolean;
          'ar-modes'?: string;
          style?: React.CSSProperties;
        };
      }
    }
  }
}

interface GLBViewerProps {
  src: string;
  poster?: string;
  className?: string;
}

const GLBViewer: React.FC<GLBViewerProps> = ({ src, poster, className }) => {
  return (
    <div className={`container-fluid d-flex justify-content-center align-items-center w-full h-full ${className}`}>
      {/* Centered and responsive wrapper using Bootstrap-like flex behavior */}
      <model-viewer
        src={src}
        poster={poster}
        alt="A 3D model of the PlayStation 5"
        auto-rotate
        autoplay
        camera-controls
        touch-action="pan-y"
        shadow-intensity="2"
        shadow-softness="1"
        exposure="1"
        environment-image="neutral"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '100%', height: '100%', outline: 'none' }}
        className="rounded-3xl"
      >
        <div slot="progress-bar" className="mono text-[10px] text-black/20 absolute top-1/2 left-1/2 -translate-x-1/2 uppercase tracking-widest">
          Syncing Neural Mesh...
        </div>
      </model-viewer>
    </div>
  );
};

export default GLBViewer;
