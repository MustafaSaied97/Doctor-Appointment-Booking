export const doctors = [
  {
    id: "1",
    name: "Dr. Emily Johnson",
    photoUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    specialty: "Cardiology",
    rating: 4.8,
    availability: "Available",
    location: "Medical Center, New York",
    about:
      "Dr. Johnson specializes in cardiovascular health with over 10 years of experience in diagnosing and treating heart conditions.",
  },
  {
    id: "2",
    name: "Dr. David Chen",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    specialty: "Dermatology",
    rating: 4.9,
    availability: "Available",
    location: "Skin Care Clinic, Boston",
    about:
      "Dr. Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology.",
  },
  {
    id: "3",
    name: "Dr. Sarah Williams",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "Neurology",
    rating: 4.7,
    availability: "Busy",
    location: "Neuroscience Center, Chicago",
    about:
      "Dr. Williams has extensive experience in treating neurological disorders and is a leading researcher in the field.",
  },
  {
    id: "4",
    name: "Dr. Michael Rodriguez",
    photoUrl: "https://randomuser.me/api/portraits/men/83.jpg",
    specialty: "Pediatrics",
    rating: 4.9,
    availability: "Available",
    location: "Children's Hospital, Los Angeles",
    about:
      "Dr. Rodriguez is dedicated to providing compassionate care for children from infancy through adolescence.",
  },
  {
    id: "5",
    name: "Dr. Jessica Thompson",
    photoUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    specialty: "Orthopedics",
    rating: 4.6,
    availability: "Available",
    location: "Sports Medicine Center, Miami",
    about:
      "Dr. Thompson specializes in sports injuries and joint replacements with a focus on minimally invasive procedures.",
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    photoUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    specialty: "General",
    rating: 4.5,
    availability: "Available",
    location: "Family Practice, Seattle",
    about:
      "Dr. Kim provides comprehensive primary care services for patients of all ages with a holistic approach to health.",
  },
  {
    id: "7",
    name: "Dr. Amanda Garcia",
    photoUrl: "https://randomuser.me/api/portraits/women/60.jpg",
    specialty: "Psychiatry",
    rating: 4.8,
    availability: "Busy",
    location: "Mental Health Clinic, Denver",
    about:
      "Dr. Garcia specializes in mood disorders and anxiety with a patient-centered approach to mental health treatment.",
  },
  {
    id: "8",
    name: "Dr. Thomas Wilson",
    photoUrl: "https://randomuser.me/api/portraits/men/29.jpg",
    specialty: "Ophthalmology",
    rating: 4.7,
    availability: "Available",
    location: "Vision Center, Houston",
    about:
      "Dr. Wilson is an experienced ophthalmologist specializing in cataract surgery and glaucoma management.",
  },
];

export const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General",
  "Psychiatry",
  "Ophthalmology",
];

export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes of ["00", "30"]) {
      const time = `${hour > 12 ? hour - 12 : hour}:${minutes} ${
        hour >= 12 ? "PM" : "AM"
      }`;
      slots.push({
        id: `${hour}-${minutes}`,
        time,
        isAvailable: Math.random() > 0.3, // 70% chance of being available
      });
    }
  }

  return slots;
};

export const initialAppointments = [
  {
    id: "appt-1",
    doctorId: "1",
    doctorName: "Dr. Emily Johnson",
    doctorSpecialty: "Cardiology",
    doctorPhotoUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    location: "Medical Center, New York",
    date: "May 15, 2025",
    time: "10:00 AM",
  },
  {
    id: "appt-2",
    doctorId: "5",
    doctorName: "Dr. Jessica Thompson",
    doctorSpecialty: "Orthopedics",
    doctorPhotoUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    location: "Sports Medicine Center, Miami",
    date: "May 20, 2025",
    time: "2:30 PM",
  },
];
