import FormField from '../components/ui/FormField';

export default function ResepsiSection({ form, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Resepsi</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <FormField
          label="Tanggal Resepsi"
          type="date"
          value={form.tanggalResepsi}
          onChange={(v) => onChange('tanggalResepsi', v)}
          required
        />
        <FormField
          label="Waktu Resepsi"
          type="time"
          value={form.waktuResepsi}
          onChange={(v) => onChange('waktuResepsi', v)}
          required
        />
        <FormField
          label="Lokasi Resepsi"
          value={form.lokasiResepsi}
          onChange={(v) => onChange('lokasiResepsi', v)}
          required
          placeholder="Tempat pelaksanaan resepsi"
        />
      </div>
    </div>
  );
}