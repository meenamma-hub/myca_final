import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../services/eventService";
import { registerStudent } from "../../services/registrationService";
import Button from "../../components/common/Button";

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!event) {
    return (
      <div className="p-6">
        Event not found.
      </div>
    );
  }

  const handleRegister = () => {
    if (!currentUser) {
      navigate(`/Signin?redirect=/register/${event.id}`);
      return;
    }

    registerStudent({
      eventId: event.id,
      studentId: currentUser.id,
      eventTitle: event.title,
      society: event.society,
      date: event.date,
      venue: event.venue,
    });

    navigate("/student/registrations");
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">
          Register for {event.title}
        </h1>
        <p className="mt-3 text-gray-600">
          Confirm your registration for this event.
        </p>
        <Button onClick={handleRegister} className="mt-5">
          Confirm Registration
        </Button>
      </div>
    </div>
  );
}

export default Register;
