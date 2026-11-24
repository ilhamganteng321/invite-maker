import FormField from '../components/ui/FormField';
import PhotoUpload from '../components/ui/PhotoUpload';

export default function CoupleSection({ form, onChange }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Nama Pria"
          value={form.namaPria}
          onChange={(v) => onChange('namaPria', v)}
          required
          placeholder="Masukkan nama pria"
        />
        <FormField
          label="Nama Wanita"
          value={form.namaWanita}
          onChange={(v) => onChange('namaWanita', v)}
          required
          placeholder="Masukkan nama wanita"
        />
      </div>

      <FormField
        label="Tanggal Pernikahan"
        type="date"
        value={form.tanggalNikah}
        onChange={(v) => onChange('tanggalNikah', v)}
        required
      />

      <PhotoUpload
        value={form.foto}
        onChange={(v) => onChange('foto', v)}
        required
      />
    </div>
  );
}