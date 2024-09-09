import * as Yup from 'yup';
import { differenceInYears } from 'date-fns'; // If you're using date-fns for date calculations

// Helper to check for age > 16
const minAge = 16;
const isOlderThan = (date: Date, age: number) =>
  differenceInYears(new Date(), date) >= age;

export const empNo = Yup.string().required("Employee No is required");
export const empName = Yup.string().required("Employee Name is required");
export const empAddressLine1 = Yup.string().required("Address Line 1 is required");
export const empAddressLine2 = Yup.string().required("Address Line 2 is required");
export const empAddressLine3 = Yup.string();
export const departmentCode = Yup.string().required("Department Code is required");

// Validation for date of joining (no future dates allowed)
export const dateOfJoin = Yup.date()
  .max(new Date(), "Joining Date cannot be in the future")
  .required("Joining Date is required");

// Validation for date of birth (age must be greater than 16)
export const dateOfBirth = Yup.date()
  .test(
    "age",
    `Employee must be at least ${minAge} years old`,
    value => value && isOlderThan(value, minAge)
  )
  .required("Date of Birth is required");

export const basicSalary = Yup.number().required("Basic Salary is required");
export const isActive = Yup.boolean();
