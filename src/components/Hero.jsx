import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/30 to-slate-950/80" />

      <div className="relative mx-auto flex h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-slate-200 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Modern Fintech • Glassmorphic • 3D
        </span>
        <h1 className="mt-2 text-4xl font-[700] tracking-tight text-white sm:text-5xl md:text-6xl">
          Akuntansi Biaya yang Mudah & Elegan
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Hitung tarif biaya, HPP, dan rugi laba secara instan dengan antarmuka yang bersih dan modern.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#calc"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            Mulai Hitung
          </a>
          <a
            href="#features"
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Lihat Fitur
          </a>
        </div>
      </div>
    </section>
  );
}
