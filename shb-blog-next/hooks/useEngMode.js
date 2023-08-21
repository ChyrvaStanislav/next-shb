import { useContext, useEffect, useState } from 'react';
import EngModeContext from 'v2_main/context/eng-mode-context/EngModeContext';
import employees from 'v2_main/components/employees-ga-filter/employees';
import { SHB_EMPLOYEES_LAST_NAME_LS_KEY } from 'v2_main/components/employees-ga-filter';
import { getCookie } from 'v2_common/utils/cookieHelper';

const useEngMode = () => {
  const { engMode } = useContext(EngModeContext);
  const [engModeEmail, setEngModeEmail] = useState(null);

  useEffect(() => {
    if (engMode) {
      const employeesLastName = getCookie(SHB_EMPLOYEES_LAST_NAME_LS_KEY);
      const nameRegExp = employeesLastName ? new RegExp(employeesLastName, 'gi') : null;
      const employeesEmail = employees.find(e => (nameRegExp ? nameRegExp.test(e) : false));

      setEngModeEmail(employeesEmail);
    }
  }, [engMode]);

  return { engMode, engModeEmail };
};

export default useEngMode;
