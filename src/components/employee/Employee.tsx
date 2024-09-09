import React, { useEffect, useState } from "react";
import { EmployeeModal } from "../../types/employee";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { employeeSchema } from "../../schemas";
import useFetch_PUT from "../../services/Put";
import useFetch_DELETE from "../../services/Delete";
import useFetch_GET from "../../services/Get";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux-store/features/custom-alert/customAlert";

type Props = {
  employee: EmployeeModal;
  closeFunc: () => void;
  updatedFunc: (emp: EmployeeModal) => void;
  deleteFunc: (empNo: string) => void;
};

const EmployeeDetails = ({
  employee,
  closeFunc,
  updatedFunc,
  deleteFunc,
}: Props) => {
  const dispatch = useDispatch();
  const initialValues: EmployeeModal = {
    empNo: employee.empNo,
    empName: employee.empName,
    empAddressLine1: employee.empAddressLine1,
    empAddressLine2: employee.empAddressLine2,
    empAddressLine3: employee.empAddressLine3,
    departmentCode: employee.departmentCode,
    dateOfJoin: employee.dateOfJoin?.substring(0, 10) || "",
    dateOfBirth: employee.dateOfBirth?.substring(0, 10) || "",
    basicSalary: employee.basicSalary,
    isActive: employee.isActive,
  };

  const [canEdit, setCanEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { isLoading, error, data, putData } = useFetch_PUT();
  const { data: departments, getData: getDepartment } = useFetch_GET();
  const { deleteData, isLoading: deleteLoading, data: deleted } = useFetch_DELETE();

  const handleSave = (values: EmployeeModal) => {
    putData(`/api/v1.0/Employee`, values);
  };

  const handleDelete = () => {
    deleteData(`/api/v1.0/Employee/${employee.empNo}`);
  };

  useEffect(() => {
    getDepartment("/api/v1.0/Departments");
  }, []);

  useEffect(() => {
    if (data) {
      updatedFunc(data);
      setCanEdit(false);
      dispatch(setAlert({ message: `Employee ${data.empName} is successfuly updated.`, type: "success" }));
    }
  }, [data]);

  useEffect(() => {
    if (deleted) {
      deleteFunc(employee.empNo);
      closeFunc();
      dispatch(setAlert({ message: `Employee ${deleted.empName} is deleted.`, type: "success" }));
    }
  }, [deleted]);

  return (
    <div className="flex flex-col z-40 justify-start overflow-y-auto p-1 md:pt-20 bg-[rgba(0,0,0,0.4)] overflow-x-hidden fixed top-0 right-0 left-0 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-opacity duration-300 ease-out opacity-100">
      <div className="bg-white rounded-md p-5 transform transition-transform duration-300 ease-out translate-y-0">
        {confirmDelete ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg text-blue-900 font-semibold">
              Are you sure you want to delete {employee.empName}?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-50 text-gray-900 py-1 px-3 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-50 text-red-900 py-1 px-3 rounded-md hover:bg-red-100"
              >
                {deleteLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {canEdit ? (
              <Formik
                initialValues={initialValues}
                validationSchema={employeeSchema}
                onSubmit={handleSave}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex gap-2">
                      <div className="mb-4">
                        <label
                          htmlFor="empNo"
                          className="block text-sm font-medium mb-1"
                        >
                          Employee No
                        </label>
                        <Field
                          name="empNo"
                          className="w-full p-3 border rounded"
                          readOnly
                        />
                        <ErrorMessage
                          name="empNo"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="empName"
                          className="block text-sm font-medium mb-1"
                        >
                          Employee Name
                        </label>
                        <Field
                          name="empName"
                          className="w-full p-3 border rounded"
                        />
                        <ErrorMessage
                          name="empName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[
                        "empAddressLine1",
                        "empAddressLine2",
                        "empAddressLine3",
                      ].map((field, index) => (
                        <div className="mb-4" key={field}>
                          <label
                            htmlFor={field}
                            className="block text-sm font-medium mb-1"
                          >
                            Address Line {index + 1}
                          </label>
                          <Field
                            name={field}
                            className="w-full p-3 border rounded"
                          />
                          <ErrorMessage
                            name={field}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      ))}
                    </div>
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
                        className="w-full p-3 border rounded"
                      >
                        <option value="" label="Select department" />
                        {departments?.map((dept: any) => (
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
                          className="w-full p-3 border rounded"
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
                          className="w-full p-3 border rounded"
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
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
                        className="w-full p-3 border rounded"
                      />
                      <ErrorMessage
                        name="basicSalary"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <Field
                        name="isActive"
                        type="checkbox"
                        className="mr-2"
                      />
                      <label
                        htmlFor="isActive"
                        className="text-sm font-medium"
                      >
                        Is Active?
                      </label>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeFunc}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={isSubmitting}
                      >
                        {isLoading ? "..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <div className="flex justify-between">
                  <h3 className="text-blue-900 text-xl font-semibold">
                    {employee.empName}
                  </h3>
                  <IoCloseSharp
                    onClick={closeFunc}
                    className="cursor-pointer text-2xl"
                  />
                </div>
                <p>
                  <strong>Employee No:</strong> {employee.empNo}
                </p>
                <p>
                  <strong>Address:</strong> {employee.empAddressLine1},{" "}
                  {employee.empAddressLine2}, {employee.empAddressLine3}
                </p>
                <p>
                  <strong>Department Code:</strong> {employee.departmentCode}
                </p>
                <p>
                  <strong>Date of Join:</strong> {employee.dateOfJoin}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {employee.dateOfBirth}
                </p>
                <p>
                  <strong>Basic Salary:</strong> {employee.basicSalary}
                </p>
                <p>
                  <strong>Active:</strong> {employee.isActive ? "Yes" : "No"}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 px-4 py-2 text-red-900 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    <MdDelete />
                    Delete
                  </button>
                  <button
                    onClick={() => setCanEdit(true)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    <RiEditCircleFill />
                    Edit
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
