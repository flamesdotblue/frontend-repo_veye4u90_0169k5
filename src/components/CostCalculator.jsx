import React, { useMemo, useState } from 'react';

function currency(n) {
  const val = isNaN(n) || !isFinite(n) ? 0 : n;
  return val.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
}

export default function CostCalculator() {
  const [inputs, setInputs] = useState({
    hargaSatuan: '',
    kuantitas: '',
    pajakPersen: '11',
    ongkir: '',
    biayaLain: '',
    diskon: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((p) => ({ ...p, [name]: value.replace(/,/g, '') }));
  };

  const result = useMemo(() => {
    const hargaSatuan = parseFloat(inputs.hargaSatuan) || 0;
    const qty = parseFloat(inputs.kuantitas) || 0;
    const pajak = (parseFloat(inputs.pajakPersen) || 0) / 100;
    const ongkir = parseFloat(inputs.ongkir) || 0;
    const biayaLain = parseFloat(inputs.biayaLain) || 0;
    const diskon = parseFloat(inputs.diskon) || 0;

    const subtotal = hargaSatuan * qty;
    const afterDiscount = Math.max(subtotal - diskon, 0);
    const taxAmount = afterDiscount * pajak;
    const total = afterDiscount + taxAmount + ongkir + biayaLain;
    const perUnit = qty > 0 ? total / qty : 0;

    return { subtotal, afterDiscount, taxAmount, total, perUnit };
  }, [inputs]);

  return (
    <section id="calc" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Kalkulator Tarif Biaya</h2>
            <p className="mt-1 text-sm text-slate-600">Hitung total biaya termasuk pajak, ongkir, biaya lain, dan diskon.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Harga Satuan</label>
                <input name="hargaSatuan" type="number" value={inputs.hargaSatuan} onChange={onChange} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Kuantitas</label>
                <input name="kuantitas" type="number" value={inputs.kuantitas} onChange={onChange} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Diskon</label>
                <input name="diskon" type="number" value={inputs.diskon} onChange={onChange} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Pajak (%)</label>
                <input name="pajakPersen" type="number" value={inputs.pajakPersen} onChange={onChange} placeholder="11" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Ongkir</label>
                <input name="ongkir" type="number" value={inputs.ongkir} onChange={onChange} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Biaya Lain</label>
                <input name="biayaLain" type="number" value={inputs.biayaLain} onChange={onChange} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/20 focus:ring" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-medium text-slate-900">{currency(result.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Setelah Diskon</dt>
                <dd className="font-medium text-slate-900">{currency(result.afterDiscount)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Pajak</dt>
                <dd className="font-medium text-slate-900">{currency(result.taxAmount)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Total</dt>
                <dd className="text-lg font-semibold text-emerald-600">{currency(result.total)}</dd>
              </div>
              <div className="mt-2 h-px w-full bg-slate-200" />
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Biaya Per Unit</dt>
                <dd className="font-semibold text-slate-900">{currency(result.perUnit)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
