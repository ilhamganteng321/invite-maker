import { useState } from 'react';

export default function FormField({ label, type = 'text', value, onChange, error, required = false, placeholder, accept }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}{required && ' <span className="text-red-500">*</span>'}{
          ' '
        }
      </label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        accept={accept}
        required={required}
        className={
          'w-full px-3 py-2 border rounded-md text-sm ' +
          (error
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : focused
              ? 'border-indigo-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
        }
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}