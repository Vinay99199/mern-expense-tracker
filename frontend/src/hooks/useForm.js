import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing form state with auto-focus
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Form submission handler
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  // Auto focus on title input
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(values, setErrors);
  }, [values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    resetForm,
    titleRef
  };
};
