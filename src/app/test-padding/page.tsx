/**
 * Test Page for Container Padding Consistency
 * 
 * This page helps verify that all sections have consistent padding/margin
 * across different systems (Windows, Mac) and screen sizes.
 * 
 * What to check:
 * - All colored sections should align perfectly on left and right edges
 * - No horizontal scrollbar should appear
 * - Padding should feel consistent across all sections
 * 
 * To use: Navigate to http://localhost:3000/test-padding
 */

import Link from "next/link";
import { CONTAINER_CLASS, CONTAINER_NARROW_CLASS, CONTAINER_WIDE_CLASS, CONTAINER_FULL_CLASS } from "@/lib/container-utils";

export default function TestPaddingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#135498] to-blue-700 text-white py-20">
        <div className={CONTAINER_CLASS}>
          <h1 className="text-4xl font-bold mb-4">Container Padding Test</h1>
          <p className="text-lg opacity-90">
            This page tests consistent horizontal padding across all sections.
            All colored boxes should align perfectly on both edges.
          </p>
        </div>
      </div>

      {/* Standard Container */}
      <section className="py-16 bg-white">
        <div className={CONTAINER_CLASS}>
          <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">Standard Container (1400px)</h2>
            <p className="text-blue-800">
              This uses <code className="bg-blue-200 px-2 py-1 rounded">CONTAINER_CLASS</code>
            </p>
            <p className="text-sm text-[#135498] mt-2">
              Padding: 24px mobile → 32px tablet → 48px desktop
            </p>
          </div>
        </div>
      </section>

      {/* Narrow Container */}
      <section className="py-16 bg-slate-100">
        <div className={CONTAINER_NARROW_CLASS}>
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Narrow Container (1200px)</h2>
            <p className="text-green-800">
              This uses <code className="bg-green-200 px-2 py-1 rounded">CONTAINER_NARROW_CLASS</code>
            </p>
            <p className="text-sm text-green-700 mt-2">
              Good for text-heavy pages like blogs and documentation
            </p>
          </div>
        </div>
      </section>

      {/* Wide Container */}
      <section className="py-16 bg-white">
        <div className={CONTAINER_WIDE_CLASS}>
          <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Wide Container (1600px)</h2>
            <p className="text-purple-800">
              This uses <code className="bg-purple-200 px-2 py-1 rounded">CONTAINER_WIDE_CLASS</code>
            </p>
            <p className="text-sm text-purple-700 mt-2">
              Good for dashboard-style layouts with lots of data
            </p>
          </div>
        </div>
      </section>

      {/* Full Container */}
      <section className="py-16 bg-slate-100">
        <div className={CONTAINER_FULL_CLASS}>
          <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Full Container (No max-width)</h2>
            <p className="text-orange-800">
              This uses <code className="bg-orange-200 px-2 py-1 rounded">CONTAINER_FULL_CLASS</code>
            </p>
            <p className="text-sm text-orange-700 mt-2">
              Stretches to full width but maintains consistent padding
            </p>
          </div>
        </div>
      </section>

      {/* Alignment Test Grid */}
      <section className="py-16 bg-white">
        <div className={CONTAINER_CLASS}>
          <h2 className="text-2xl font-bold mb-8">Alignment Test Grid</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="bg-gradient-to-br from-blue-500 to-[#135498] text-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold mb-2">Card {num}</h3>
                <p className="text-sm opacity-90">
                  These cards should maintain equal spacing on all screen sizes
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Edge Detection */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className={CONTAINER_CLASS}>
          <div className="flex items-start justify-between">
            {/* Left Edge Marker */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-32 bg-yellow-400"></div>
              <div>
                <p className="text-sm font-bold text-yellow-400">LEFT EDGE</p>
                <p className="text-xs opacity-75">Should align with sections above/below</p>
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center px-4">
              <h2 className="text-2xl font-bold mb-2">Edge Alignment Test</h2>
              <p className="text-sm opacity-90">
                The yellow markers show the container edges. They should align
                perfectly with all sections above.
              </p>
            </div>

            {/* Right Edge Marker */}
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-bold text-yellow-400 text-right">RIGHT EDGE</p>
                <p className="text-xs opacity-75 text-right">Should align with sections above/below</p>
              </div>
              <div className="w-1 h-32 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 bg-white">
        <div className={CONTAINER_CLASS}>
          <div className="bg-slate-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Testing Instructions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">1. Visual Alignment</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>All colored sections should align on left edge</li>
                  <li>All colored sections should align on right edge</li>
                  <li>The yellow edge markers should align with all sections</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">2. Responsive Testing</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Resize browser window from 320px to 2560px</li>
                  <li>Check alignment at: 375px, 768px, 1024px, 1440px, 1920px</li>
                  <li>Padding should scale smoothly (24px → 32px → 48px)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">3. System Testing</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Test on Windows at 100%, 125%, 150% DPI scaling</li>
                  <li>Test on Mac at standard retina resolution</li>
                  <li>Test in Chrome, Firefox, Safari, Edge</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">4. Overflow Check</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>No horizontal scrollbar should appear</li>
                  <li>Content should never extend beyond viewport</li>
                  <li>Open DevTools and check computed styles match expected padding</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#e8f1fa] border-l-4 border-blue-500 rounded">
              <p className="text-sm font-medium text-[#0A2F52]">
                <strong>Pro Tip:</strong> Open browser DevTools, inspect the colored boxes, 
                and verify the computed padding values match: 24px, 32px, or 48px depending 
                on screen size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white text-center">
        <div className={CONTAINER_CLASS}>
          <p className="text-sm opacity-75">
            Test Page • <Link href="/" className="underline hover:opacity-100">Back to Home</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
