import React from "react";
import { specialties } from "@/utils/mockData";
import { useAppointments } from "@/context/AppointmentContext";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FilterBar = () => {
  const {
    filterSpecialty,
    setFilterSpecialty,
    filterAvailability,
    setFilterAvailability,
  } = useAppointments();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-4 rounded-lg bg-white shadow-sm">
      <div className="flex items-center">
        <Filter size={18} className="mr-2 text-doctor-primary" />
        <h2 className="text-lg font-medium">Filter Doctors</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="min-w-[200px]">
          <Select
            value={filterSpecialty}
            onValueChange={(value) => setFilterSpecialty(value)}
            aria-label="Filter by specialty"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="available-only"
            checked={filterAvailability}
            onCheckedChange={setFilterAvailability}
            aria-label="Show only available doctors"
          />
          <Label htmlFor="available-only" className="cursor-pointer">
            Available doctors only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
