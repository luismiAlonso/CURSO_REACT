import { useState } from 'react';

function useToggle(initialState = false, options = { trueText: 'asc', falseText: 'desc' }) {
  const [value, setValue] = useState(initialState);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  const getText = () => {
    return value ? options.trueText : options.falseText;
  };

  return {
    value,
    toggle,
    getText,
  };
}

export default useToggle;