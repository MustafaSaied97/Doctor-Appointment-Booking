import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AppointmentProvider,
  useAppointments,
} from "@/context/AppointmentContext";
import DoctorList from "@/components/DoctorList.jsx";
import AppointmentList from "@/components/AppointmentList.jsx";
import BookingModal from "@/components/BookingModal.jsx";
import { CalendarCheck, UserRound } from "lucide-react";

const AppContent = () => {
  const { activeTab, setActiveTab } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-doctor-dark">
            <span className="text-doctor-primary">Health</span>Connect
          </h1>
          <p className="text-gray-500 mt-1">
            Find and book appointments with top doctors
          </p>
        </div>
      </header>

      <main className="container">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="doctors" className="flex items-center gap-2">
                <UserRound size={16} />
                <span>Find Doctors</span>
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="flex items-center gap-2"
              >
                <CalendarCheck size={16} />
                <span>My Appointments</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="doctors"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <DoctorList />
          </TabsContent>

          <TabsContent
            value="appointments"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <AppointmentList />
          </TabsContent>
        </Tabs>

        <BookingModal />
      </main>
    </div>
  );
};

const Index = () => (
  <AppointmentProvider>
    <AppContent />
  </AppointmentProvider>
);

export default Index;
