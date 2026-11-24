import { useState, useEffect } from 'react';
import { initialForm } from '../data/formDefaults';
import { validateSection, requiredFields } from '../data/validation';
import Header from '../components/layout/Header';
import Stepper from '../components/layout/Stepper';
import NavButtons from '../components/layout/NavButtons';
import CoupleSection from '../sections/CoupleSection';
import ParentsSection from '../sections/ParentsSection';
import AkadSection from '../sections/AkadSection';
import ResepsiSection from '../sections/ResepsiSection';
import ReviewSection from '../sections/ReviewSection';

const SECTIONS = [
  { id: 1, component: CoupleSection, fields: ['namaPria', 'namaWanita', 'tanggalNikah', 'foto'] },
  { id: 2, component: ParentsSection, fields: ['ayahPria', 'ibuPria', 'ayahWanita', 'ibuWanita', 'kataSambutan'] },
  { id: 3, component: AkadSection, fields: ['tanggalAkad', 'waktuAkad', 'lokasiAkad'] },
  { id: 4, component: ResepsiSection, fields: ['tanggalResepsi', 'waktuResepsi', 'lokasiResepsi'] },
  { id: 5, component: null, fields: [] }, // Foto review step
  { id: 6, component: ReviewSection, fields: [] },
];

const STORAGE_KEY = 'undangan-video-draft';

export default function FormPage() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialForm();
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isDrafting, setIsDrafting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Auto-save draft to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('foto', file);
    }
  };

  const currentSection = SECTIONS.find((s) => s.id === activeStep);

  const canPrev = activeStep > 1;
  const canNext = activeStep < SECTIONS.length;
  const isLast = activeStep === SECTIONS.length;

  const validateCurrent = () => {
    if (currentSection.fields.length === 0) return true;
    const result = validateSection(form, currentSection.fields);
    if (!result.isValid) {
      setShowErrors(true);
    }
    return result.isValid;
  };

  const handleNext = () => {
    if (validateCurrent()) {
      setActiveStep((prev) => prev + 1);
      setShowErrors(false);
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
    setShowErrors(false);
  };

  const handleSaveDraft = () => {
    setIsDrafting(true);
    setTimeout(() => {
      setIsDrafting(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateSection(form, requiredFields);
    if (!result.isValid) {
      setShowErrors(true);
      return;
    }
    // Navigate to studio (handled by parent router)
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Header title="Form Undangan Video" />
      <Stepper activeStep={activeStep} />

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentSection.component ? (
          <currentSection.component form={form} onChange={updateField} />
        ) : (
          // Step 5: Foto review
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Foto Mempelai</p>
            {form.foto ? (
              <div>
                <img
                  src={URL.createObjectURL(form.foto)}
                  alt="Foto mempelai"
                  className="max-w-full max-h-64 rounded-lg mx-auto object-cover border border-gray-300"
                />
                <p className="mt-2 text-sm text-gray-500">{form.foto.name}</p>
              </div>
            ) : (
              <p className="text-gray-400">Belum ada foto yang diunggah.</p>
            )}
          </div>
        )}
      </form>

      <NavButtons
        onPrev={handlePrev}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}
        canPrev={canPrev}
        canNext={canNext}
        isDrafting={isDrafting}
        isLast={isLast}
      />

      {showErrors && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
          Harap lengkapi semua field wajib sebelum melanjutkan.
        </div>
      )}
    </div>
  );
}