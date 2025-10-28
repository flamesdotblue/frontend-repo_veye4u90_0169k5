import React from 'react';
import Hero from './components/Hero';
import CostCalculator from './components/CostCalculator';
import HppCalculator from './components/HppCalculator';
import ProfitLoss from './components/ProfitLoss';

function SectionDivider() {
  return <div className="mx-auto h-px w-full max-w-7xl bg-slate-200" />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <Hero />

      <main className="space-y-6">
        <CostCalculator />
        <SectionDivider />
        <HppCalculator />
        <SectionDivider />
        <ProfitLoss />
      </main>

      <footer id="features" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Modern & Clean</h3>
              <p className="mt-2 text-sm text-slate-600">Desain minimalis bertema fintech dengan elemen glassmorphism dan 3D interaktif.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Cepat & Akurat</h3>
              <p className="mt-2 text-sm text-slate-600">Perhitungan biaya, HPP, dan laba rugi dalam hitungan detik.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Ramah Pengguna</h3>
              <p className="mt-2 text-sm text-slate-600">Antarmuka yang rapi, responsif, dan mudah dipahami.</p>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-slate-500">© {new Date().getFullYear()} Akuntansi Biaya • Dibuat dengan cinta</div>
        </div>
      </footer>
    </div>
  );
}
