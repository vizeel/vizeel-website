import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface SvgIconProps {
  src: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fillColor?: string;
  backgroundColor?: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function SvgIcon({
  src,
  width = 24,
  height = 24,
  color,
  fillColor,
  backgroundColor,
  className = '',
  alt = 'SVG Icon',
  onClick,
  style,
}: SvgIconProps) {
  const [processedContent, setProcessedContent] = useState<string>('');

  // Use React Query directly for fetching SVG text content
  const { data: rawSvgContent, isLoading, error } = useQuery<string, Error>({
    queryKey: ['svg', src],
    staleTime: 1000 * 60 * 5, // Cache SVGs for 5 minutes
    queryFn: async () => {
      const response = await fetch(src, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }
      
      return response.text();
    },
  });

  useEffect(() => {
    if (!rawSvgContent) {
      setProcessedContent('');
      return;
    }

    let svgText = rawSvgContent;
    
    // Replace template variables with actual values
    svgText = svgText.replace(/\{width\}/g, String(width));
    svgText = svgText.replace(/\{height\}/g, String(height));
    svgText = svgText.replace(/\{className\}/g, className);
    
    // Handle fill color - prioritize fillColor over color
    const finalFillColor = fillColor || color;
    if (finalFillColor) {
      svgText = svgText.replace(/\{fillColor\}/g, finalFillColor);
      // Also try to replace any hardcoded black colors with our fill color
      svgText = svgText.replace(/fill="black"/g, `fill="${finalFillColor}"`);
      svgText = svgText.replace(/fill='black'/g, `fill='${finalFillColor}'`);
    }
    
    if (backgroundColor) {
      svgText = svgText.replace(/\{backgroundColor\}/g, backgroundColor);
    }
    
    setProcessedContent(svgText);
  }, [rawSvgContent, width, height, color, fillColor, backgroundColor, className]);

  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-gray-200 rounded ${className}`}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style 
        }}
      />
    );
  }

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-red-50 text-red-500 text-xs ${className}`}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style 
        }}
        title={error.message}
      >
        Error
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        ...(fillColor && {
          '--svg-fill-color': fillColor,
        } as React.CSSProperties),
      }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: processedContent }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      title={alt}
    />
  );
} 