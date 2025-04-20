import React from "react";
import { useAppointments } from "@/context/AppointmentContext";
import DoctorCard from "./DoctorCard";
import FilterBar from "./FilterBar";

const DoctorList = () => {
  const { filteredDoctors } = useAppointments();

  return (
    <div className="w-full">
      <FilterBar />

      {filteredDoctors.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            No doctors match your current filters.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
