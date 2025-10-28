import React, { useMemo, useState } from 'react';

function currency(n) {
  const val = isNaN(n) || !isFinite(n) ? 0 : n;
  return val.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
}

export default function HppCalculator() {
  const [inputs, setInputs] = useState({
    persediaanAwal: '',
    pembelian: '',
    returPembelian: '',
    potonganPembelian: '',
    biayaAngkut: '',
    persediaanAkhir: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((p) => ({ ...p, [name]: value.replace(/,/g, '') }));
  };

  const calc = useMemo(() => {
    const awal = parseFloat(inputs.persediaanAwal) || 0;
    const pembelian = parseFloat(inputs.pembelian) || 0;
    const retur = parseFloat(inputs.returPembelian) || 0;
    const potongan = parseFloat(inputs.potonganPembelian) || 0;
    const angkut = parseFloat(inputs.biayaAngkut) || 0;
    const akhir = parseFloat(inputs.persediaanAkhir) || 0;

    const pembelianBersih = Math.max(pembelian - retur - potongan, 0);
    const hpp = awal + pembelianBersih + angkut - akhir;

    return { pembelianBersih, hpp };
  }, [inputs]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Kalkulator HPP (Harga Pokok Penjualan)</h2>
          <p className="mt-1 text-sm text-slate-600">Gunakan rumus: Persediaan Awal + Pembelian Bersih + Biaya Angkut − Persediaan Akhir.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Persediaan Awal</label>
                <input name="persediaanAwal" type="number" value={inputs.persediaanAwal} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Pembelian</label>
                <input name="pembelian" type="number" value={inputs.pembelian} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Retur Pembelian</label>
                <input name="returPembelian" type="number" value={inputs.returPembelian} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Potongan Pembelian</label>
                <input name="potonganPembelian" type="number" value={inputs.potonganPembelian} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Biaya Angkut</label>
                <input name="biayaAngkut" type="number" value={inputs.biayaAngkut} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Persediaan Akhir</label>
                <input name="persediaanAkhir" type="number" value={inputs.persediaanAkhir} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><dt className="text-slate-600">Pembelian Bersih</dt><dd className="font-medium text-slate-900">{currency(calc.pembelianBersih)}</dd></div>
              <div className="flex items-center justify-between"><dt className="text-slate-600">HPP</dt><dd className="text-lg font-semibold text-emerald-600">{currency(calc.hpp)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
