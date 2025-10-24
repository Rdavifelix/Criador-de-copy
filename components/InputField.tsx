
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: 'text' | 'textarea';
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, type = 'text' }) => {
  const commonProps = {
    id,
    value,
    onChange,
    placeholder,
    className: "w-full bg-base-200 border-2 border-base-300 rounded-lg p-3 text-content-100 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 ease-in-out outline-none",
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-content-200">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={3}></textarea>
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
};

export default InputField;
