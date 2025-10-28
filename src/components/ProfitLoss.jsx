import React, { useMemo, useState } from 'react';

function currency(n) {
  const val = isNaN(n) || !isFinite(n) ? 0 : n;
  return val.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
}

export default function ProfitLoss() {
  const [inputs, setInputs] = useState({
    pendapatan: '',
    hpp: '',
    biayaOperasional: '',
    pendapatanLain: '',
    biayaLain: '',
    pajakPersen: '22',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((p) => ({ ...p, [name]: value.replace(/,/g, '') }));
  };

  const calc = useMemo(() => {
    const pendapatan = parseFloat(inputs.pendapatan) || 0;
    const hpp = parseFloat(inputs.hpp) || 0;
    const biayaOperasional = parseFloat(inputs.biayaOperasional) || 0;
    const pendapatanLain = parseFloat(inputs.pendapatanLain) || 0;
    const biayaLain = parseFloat(inputs.biayaLain) || 0;
    const pajakRate = (parseFloat(inputs.pajakPersen) || 0) / 100;

    const labaKotor = pendapatan - hpp;
    const labaOperasional = labaKotor - biayaOperasional;
    const labaSebelumPajak = labaOperasional + pendapatanLain - biayaLain;
    const pajak = labaSebelumPajak > 0 ? labaSebelumPajak * pajakRate : 0;
    const labaBersih = labaSebelumPajak - pajak;

    return { labaKotor, labaOperasional, labaSebelumPajak, pajak, labaBersih };
  }, [inputs]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Kalkulator Laba Rugi</h2>
          <p className="mt-1 text-sm text-slate-600">Masukkan pendapatan, HPP, dan biaya-biaya untuk melihat ringkasan laba rugi.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Pendapatan</label>
                <input name="pendapatan" type="number" value={inputs.pendapatan} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">HPP</label>
                <input name="hpp" type="number" value={inputs.hpp} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Biaya Operasional</label>
                <input name="biayaOperasional" type="number" value={inputs.biayaOperasional} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Pendapatan Lain</label>
                <input name="pendapatanLain" type="number" value={inputs.pendapatanLain} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Biaya Lain</label>
                <input name="biayaLain" type="number" value={inputs.biayaLain} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Pajak (%)</label>
                <input name="pajakPersen" type="number" value={inputs.pajakPersen} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><dt className="text-slate-600">Laba Kotor</dt><dd className="font-medium text-slate-900">{currency(calc.labaKotor)}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">Laba Operasional</dt><dd className="font-medium text-slate-900">{currency(calc.labaOperasional)}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">Laba Sebelum Pajak</dt><dd className="font-medium text-slate-900">{currency(calc.labaSebelumPajak)}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">Pajak</dt><dd className="font-medium text-slate-900">{currency(calc.pajak)}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">Laba Bersih</dt><dd className="text-lg font-semibold text-emerald-600">{currency(calc.labaBersih)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
