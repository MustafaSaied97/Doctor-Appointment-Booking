import React from "react";
import { useAppointments } from "@/context/AppointmentContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

const AppointmentList = () => {
  const { appointments } = useAppointments();

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-doctor-accent rounded-full flex items-center justify-center mb-4">
          <CalendarIcon size={24} className="text-doctor-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No Appointments Yet</h2>
        <p className="text-gray-500 max-w-md">
          You haven't booked any appointments. Browse our doctors and schedule
          your first appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="overflow-hidden animate-fade-in"
          >
            <CardHeader className="pb-2">
              <div className="flex gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <img
                    src={appointment.doctorPhotoUrl}
                    alt={appointment.doctorName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {appointment.doctorName}
                  </CardTitle>
                  <CardDescription>
                    {appointment.doctorSpecialty}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CalendarIcon
                    size={14}
                    className="mr-2 text-doctor-primary"
                  />
                  <span>{appointment.date}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock size={14} className="mr-2 text-doctor-primary" />
                  <span>{appointment.time}</span>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin size={14} className="mr-2 text-doctor-primary" />
                  <span>{appointment.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
