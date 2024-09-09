export interface EmployeeModal {
    empNo: string;               // Employee number
    empName: string;             // Employee name
    empAddressLine1: string;     // Address line 1
    empAddressLine2: string;     // Address line 2
    empAddressLine3: string;     // Address line 3
    departmentCode: string;      // Department code
    dateOfJoin: string;          // Date of joining (ISO string format)
    dateOfBirth: string;         // Date of birth (ISO string format)
    basicSalary: number;         // Basic salary
    isActive: boolean;           // Employee active status
  }
  