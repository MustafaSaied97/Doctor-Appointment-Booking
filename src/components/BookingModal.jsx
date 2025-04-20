import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { generateTimeSlots } from "@/utils/mockData";
import { useAppointments } from "@/context/AppointmentContext";
import { CalendarIcon, Clock } from "lucide-react";

const BookingModal = () => {
  const {
    selectedDoctor,
    isBookingModalOpen,
    closeBookingModal,
    selectTimeSlot,
    selectedTimeSlot,
    selectedDate,
    selectDate,
    confirmAppointment,
  } = useAppointments();

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (isBookingModalOpen) {
      setTimeSlots(generateTimeSlots());
    }
  }, [isBookingModalOpen]);

  if (!selectedDoctor) return null;

  return (
    <Dialog
      open={isBookingModalOpen}
      onOpenChange={(open) => !open && closeBookingModal()}
    >
      <DialogContent
        className="max-w-md md:max-w-lg overflow-y-auto max-h-[90vh]"
        aria-label="Booking appointment"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            Book Appointment with {selectedDoctor.name}
          </DialogTitle>
          <DialogDescription>
            Select a date and time slot below to schedule your appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1 text-gray-700">
              <CalendarIcon size={16} />
              <h3 className="font-medium">Select Date</h3>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={selectDate}
              disabled={{ before: new Date() }}
              className="rounded-md border"
              aria-label="Select appointment date"
            />
          </div>

          {selectedDate && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1 text-gray-700">
                <Clock size={16} />
                <h3 className="font-medium">Select Time</h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.isAvailable && selectTimeSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={`time-slot ${
                      selectedTimeSlot?.id === slot.id
                        ? "time-slot-selected"
                        : ""
                    } ${!slot.isAvailable ? "time-slot-disabled" : ""}`}
                    aria-label={`Time slot ${slot.time}${
                      !slot.isAvailable ? ", unavailable" : ""
                    }`}
                    aria-pressed={selectedTimeSlot?.id === slot.id}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={closeBookingModal}
            className="sm:mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAppointment}
            disabled={!selectedDate || !selectedTimeSlot}
            className="bg-doctor-primary hover:bg-doctor-secondary"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
