import FormField from '../components/ui/FormField';

export default function AkadSection({ form, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Akad Nikah</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <FormField
          label="Tanggal Akad"
          type="date"
          value={form.tanggalAkad}
          onChange={(v) => onChange('tanggalAkad', v)}
          required
        />
        <FormField
          label="Waktu Akad"
          type="time"
          value={form.waktuAkad}
          onChange={(v) => onChange('waktuAkad', v)}
          required
        />
        <FormField
          label="Lokasi Akad"
          value={form.lokasiAkad}
          onChange={(v) => onChange('lokasiAkad', v)}
          required
          placeholder="Tempat pelaksanaan akad"
        />
      </div>
    </div>
  );
}