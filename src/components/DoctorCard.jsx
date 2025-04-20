import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { MapPin, Star } from "lucide-react";
import { useAppointments } from "@/context/AppointmentContext";

const DoctorCard = ({ doctor }) => {
  const { openBookingModal } = useAppointments();

  return (
    <Card className="doctor-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <img
                src={doctor.photoUrl}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-lg">{doctor.name}</CardTitle>
              <CardDescription>{doctor.specialty}</CardDescription>

              <div className="flex items-center mt-1">
                <Rating
                  rating={doctor.rating}
                  className="custom-class"
                  aria-label={`${doctor.name} rating`}
                />
                <span className="text-sm text-gray-600">{doctor.rating}</span>
              </div>
            </div>
          </div>
          <span
            className={`badge ${
              doctor.availability === "Available"
                ? "badge-available"
                : "badge-busy"
            }`}
            role="status"
            aria-label={`Doctor is ${doctor.availability}`}
          >
            {doctor.availability}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{doctor.about}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span>{doctor.location}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-doctor-primary hover:bg-doctor-secondary"
          onClick={() => openBookingModal(doctor)}
          disabled={doctor.availability === "Busy"}
          aria-label={`Book appointment with ${doctor.name}`}
        >
          {doctor.availability === "Available"
            ? "Book Appointment"
            : "Currently Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
