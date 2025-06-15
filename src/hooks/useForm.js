import { useState } from "react";

export const useForm = () => {
  const [formState, setFormState] = useState({});
  const onChangeInput = (field, value) => {
    setFormState({
        ...formState,
        [field]: value,
    });
  };
  return {
    formState,
    onChangeInput,
  };
}
