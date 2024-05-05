import { createContext } from "react";

const CheckedContext = createContext({
    checked: false,
    handleChange: () => {}
  });

export default CheckedContext