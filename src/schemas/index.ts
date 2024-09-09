import * as Yup from 'yup';
import { basicSalary, dateOfBirth, dateOfJoin, departmentCode, empAddressLine1, empAddressLine2, empAddressLine3, empName, empNo, isActive } from './Schemas';

export const employeeSchema = Yup.object({
    empNo,
    empName,
    empAddressLine1,
    empAddressLine2,
    empAddressLine3,
    departmentCode,
    dateOfJoin,
    dateOfBirth,
    basicSalary,
    isActive,
  });