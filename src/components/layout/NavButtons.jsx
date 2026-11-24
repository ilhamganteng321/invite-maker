import Button from '../ui/Button';

export default function NavButtons({
  onPrev,
  onNext,
  onSaveDraft,
  canPrev,
  canNext,
  isDrafting = false,
  isLast = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t">
      <Button variant="secondary" onClick={onPrev} disabled={!canPrev}>
        Sebelumnya
      </Button>

      <Button variant="outline" onClick={onSaveDraft} disabled={isDrafting}>
        {isDrafting ? 'Menyimpan...' : 'Simpan Draft'}
      </Button>

      <Button onClick={onNext} disabled={!canNext}>
        {isLast ? 'Selesai & Buka Studio' : 'Lanjutkan'}
      </Button>
    </div>
  );
}