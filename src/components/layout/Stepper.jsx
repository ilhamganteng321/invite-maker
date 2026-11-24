const STEPS = [
  { id: 1, label: 'Data Mempelai' },
  { id: 2, label: 'Sambutan' },
  { id: 3, label: 'Akad' },
  { id: 4, label: 'Resepsi' },
  { id: 5, label: 'Foto' },
  { id: 6, label: 'Review' },
];

export default function Stepper({ activeStep }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                activeStep > step.id
                  ? 'bg-indigo-600 text-white'
                  : activeStep === step.id
                    ? 'bg-indigo-500 text-white ring-2 ring-indigo-200'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.id}
            </div>
            <span className={`text-xs ${
              activeStep >= step.id ? 'font-medium text-gray-700' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-px bg-gray-300 mx-4" />
    </div>
  );
}