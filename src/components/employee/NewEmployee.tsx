import { Formik, Field, ErrorMessage, Form } from "formik";
import { employeeSchema } from "../../schemas";
import { EmployeeModal } from "../../types/employee";
import useFetch_POST from "../../services/Post";
import { useEffect } from "react";
import useFetch_GET from "../../services/Get";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux-store/features/custom-alert/customAlert";

type Props = {
  closeFunc: () => void;
};

const NewEmployee = ({ closeFunc }: Props) => {
  const dispatch = useDispatch();
  const { isLoading, error, data, postData } = useFetch_POST();
  const { data: departments, getData: getDepartment } = useFetch_GET();
  const generateUniqueId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const initialValues: EmployeeModal = {
    empNo: generateUniqueId(),
    empName: "",
    empAddressLine1: "",
    empAddressLine2: "",
    empAddressLine3: "",
    departmentCode: "",
    dateOfJoin: new Date().toISOString().substring(0, 10),
    dateOfBirth: new Date().toISOString().substring(0, 10),
    basicSalary: 0,
    isActive: true,
  };

  const handleSubmit = (values: EmployeeModal) => {
    console.log("Employee Submitted: ", values);
    postData("/api/v1.0/Employee", values);
  };
  useEffect(() => {
    getDepartment("/api/v1.0/Departments");
  }, []);

  useEffect(() => {
    if (data) {
      closeFunc();
      dispatch(setAlert({ message: `Employee ${data.empName} is successfuly created.`, type: "success" }));
    }
  }, [data]);

  return (
    <div className="fixed inset-0 p-1 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto shadow-lg transition-transform transform duration-300">
        <h2 className="text-xl font-bold mb-6 text-center">Add New Employee</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={employeeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex gap-2">
                {/* Employee Number */}
                <div className="mb-4">
                  <label
                    htmlFor="empNo"
                    className="block text-sm font-medium mb-1"
                  >
                    Employee No
                  </label>
                  <Field
                    name="empNo"
                    className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Employee No"
                    readOnly
                  />
                  <ErrorMessage
                    name="empNo"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Employee Name */}
                <div className="mb-4">
                  <label
                    htmlFor="empName"
                    className="block text-sm font-medium mb-1"
                  >
                    Employee Name
                  </label>
                  <Field
                    name="empName"
                    className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Employee Name"
                  />
                  <ErrorMessage
                    name="empName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="flex gap-2">
                {["empAddressLine1", "empAddressLine2", "empAddressLine3"].map(
                  (field, index) => (
                    <div className="mb-4" key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium mb-1"
                      >
                        Address Line {index + 1}
                      </label>
                      <Field
                        name={field}
                        className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                        placeholder={`Enter Address Line ${index + 1}`}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Department Code */}
              {departments && (
                <div className="mb-4">
                  <label
                    htmlFor="departmentCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Department Code
                  </label>
                  <Field
                    as="select"
                    name="departmentCode"
                    className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" label="Select department" />
                    {departments.map((dept: any) => (
                      <option
                        key={dept.departmentCode}
                        value={dept.departmentCode}
                      >
                        {dept.departmentName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="departmentCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="dateOfJoin"
                    className="block text-sm font-medium mb-1"
                  >
                    Date of Join
                  </label>
                  <Field
                    name="dateOfJoin"
                    type="date"
                    className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="dateOfJoin"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium mb-1"
                  >
                    Date of Birth
                  </label>
                  <Field
                    name="dateOfBirth"
                    type="date"
                    className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Basic Salary */}
              <div className="mb-4">
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-medium mb-1"
                >
                  Basic Salary
                </label>
                <Field
                  name="basicSalary"
                  type="number"
                  className="w-full md:p-3 p-1 border rounded focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Basic Salary"
                />
                <ErrorMessage
                  name="basicSalary"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Active Status */}
              <div className="mb-4 flex items-center">
                <Field name="isActive" type="checkbox" className="mr-2" />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Is Active?
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeFunc}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isLoading ? "..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewEmployee;
