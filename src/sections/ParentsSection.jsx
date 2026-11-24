import FormField from '../components/ui/FormField';

export default function ParentsSection({ form, onChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Orang Tua Mempelai</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Ayah Pria"
          value={form.ayahPria}
          onChange={(v) => onChange('ayahPria', v)}
          required
          placeholder="Nama ayah pria"
        />
        <FormField
          label="Ibu Pria"
          value={form.ibuPria}
          onChange={(v) => onChange('ibuPria', v)}
          required
          placeholder="Nama ibu pria"
        />
        <FormField
          label="Ayah Wanita"
          value={form.ayahWanita}
          onChange={(v) => onChange('ayahWanita', v)}
          required
          placeholder="Nama ayah wanita"
        />
        <FormField
          label="Ibu Wanita"
          value={form.ibuWanita}
          onChange={(v) => onChange('ibuWanita', v)}
          required
          placeholder="Nama ibu wanita"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Kata Sambutan</h2>
      <FormField
        label="Kata-kata Sambutan"
        value={form.kataSambutan}
        onChange={(v) => onChange('kataSambutan', v)}
        required
        placeholder="Tulisan sambutan untuk tamu undangan"
      />
    </div>
  );
}