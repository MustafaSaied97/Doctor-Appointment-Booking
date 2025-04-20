import React, { createContext, useContext, useState } from "react";
import { doctors, initialAppointments } from "@/utils/mockData.js";
import { useToast, toast } from "@/hooks/use-toast";

const AppointmentContext = createContext(undefined);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState(false);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      filterSpecialty === "All" || doctor.specialty === filterSpecialty;
    const matchesAvailability =
      !filterAvailability || doctor.availability === "Available";
    return matchesSpecialty && matchesAvailability;
  });

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
    setSelectedTimeSlot(null);
    setSelectedDate(null);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setSelectedDate(null);
  };

  const selectTimeSlot = (slot) => setSelectedTimeSlot(slot);
  const selectDate = (date) => setSelectedDate(date);

  const confirmAppointment = () => {
    if (!selectedDoctor || !selectedTimeSlot || !selectedDate) {
      toast({
        title: "Booking Error",
        description: "Please select a date and time slot",
        variant: "destructive",
      });
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newAppointment = {
      id: `appt-${Date.now()}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorPhotoUrl: selectedDoctor.photoUrl,
      location: selectedDoctor.location,
      date: formattedDate,
      time: selectedTimeSlot.time,
    };

    setAppointments([...appointments, newAppointment]);
    closeBookingModal();

    toast({
      title: "Appointment Confirmed",
      description: `Your appointment with ${selectedDoctor.name} is scheduled for ${formattedDate} at ${selectedTimeSlot.time}`,
    });

    setActiveTab("appointments");
  };

  const value = {
    doctors,
    filteredDoctors,
    appointments,
    selectedDoctor,
    isBookingModalOpen,
    selectedTimeSlot,
    selectedDate,
    activeTab,
    filterSpecialty,
    filterAvailability,
    setFilterSpecialty,
    setFilterAvailability,
    openBookingModal,
    closeBookingModal,
    selectTimeSlot,
    selectDate,
    confirmAppointment,
    setActiveTab,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }
  return context;
}
