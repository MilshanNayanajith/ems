import React, { useEffect, useState } from "react";
import Search from "../../components/search/Search";
import { FaPlus } from "react-icons/fa";
import Table from "../../components/table/Table";
import useFetch_GET from "../../services/Get";
import { EmployeeModal } from "../../types/employee";
import EmployeeDetails from "../../components/employee/Employee";
import NewEmployee from "../../components/employee/NewEmployee";

type Props = {};

const Employee = (props: Props) => {
  const [employees, setEmployees] = useState<EmployeeModal[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [employee, setEmployee] = useState<EmployeeModal | null>();
  // Employee Table Header
  const empTableHeader = [
    { name: "Employee No", key: "empNo" },
    { name: "Employee Name", key: "empName" },
    { name: "Department", key: "departmentCode" },
    { name: "Status", key: "isActive" },
  ];
  const {
    isLoading,
    error,
    data: employeeList,
    getData: getEmployee,
  } = useFetch_GET();

  useEffect(() => {
    getEmployee("/api/v1.0/Employees");
  }, [isOpen, trigger]);

  useEffect(() => {
    if (employeeList) setEmployees((prev) => employeeList);
  }, [employeeList]);

  const updateFunc = (emp: EmployeeModal) => {
    setEmployee(prev => emp)
    setEmployees((prevEmployees:any) =>
      prevEmployees.map((employee:EmployeeModal) =>
        employee.empNo === emp.empNo ? emp : employee
      )
    );
  };

  const deleteFunc = (empNo:any) => {
    setEmployee(prev => null);
    const fil = employees?.filter((emp:EmployeeModal) => emp.empNo !== empNo);
    setEmployees((prev) => fil)
  };

  // Search Function
  const searchFunc = (value: any) => {
    if (value !== "") {
      const list: EmployeeModal[] = employeeList;
      const filteredList = list?.filter(
        (item: EmployeeModal) =>
          item?.empName.toLowerCase().includes(value.toLowerCase()) ||
          item?.empNo.toLowerCase().includes(value.toLowerCase()) ||
          (item?.isActive
            ? "active" == value.toLowerCase()
            : "deactive" == value.toLowerCase()) ||
          item?.departmentCode.toLowerCase().includes(value.toLowerCase())
      );
      setEmployees((prev) => filteredList);
    } else {
       setTrigger(prev => !prev);
    }
  };

  // View Details
  const viewEmploye = (item: any) => {
    console.log(item);
    setEmployee((prev) => item);
  };

  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-grow p-6 overflow-scroll">
        <div className="flex flex-col-reverse md:flex-row m md:items-center items-end gap-2 justify-between mb-4">
          {/* Search Component */}
          <Search searchValueFunc={(value: any) => searchFunc(value)} />

          {/* Add Employee Button */}
          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-4 py-2  bg-blue-100 text-blue-600 rounded-full shadow-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200">
            <FaPlus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        {/* Additional Content or Employee List */}
        <div className="">
          {employees && (
            <Table
              headers={empTableHeader}
              items={employees}
              viewFunc={viewEmploye}
            />
          )}
        </div>
      </div>

      {/* Sidebar or Additional Panel */}
      <div className="w-80 hidden md:flex bg-white border-l border-gray-200 shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <p className="text-gray-600">
            Here you can add additional information or controls.
          </p>
        </div>
      </div>

      {/* Employee details view */}
      {employee && (
        <EmployeeDetails employee={employee} closeFunc={() => setEmployee((prev) => null)} updatedFunc={updateFunc} deleteFunc={deleteFunc} />
      )}
      {isOpen && (
        <NewEmployee closeFunc={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Employee;
