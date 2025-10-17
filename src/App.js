import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing_Page/LandingPage";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import Services from "./Components/Services/Services";
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="Sign_Up" element={<Sign_Up />} />
          <Route path="Login" element={<Login />} />
          <Route path="Services" element={<Services />} />
          <Route path="instant-consultation" element={<InstantConsultation />} />
          <Route path="booking-consultation" element={<BookingConsultation />} />
          <Route path="FindDoctorSearch" element={<FindDoctorSearch />} />
        </Routes>

        <Notification/>
      </BrowserRouter>
    </div>
  );
}

export default App;
