import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";

const services = [
  "Classic Haircut", "Kids Cut", "Straight Razor Shave",
  "Beard Sculpting", "Signature Design", "Precision Perm", "The Executive",
];

const barbers = ["Any Barber", "Mark Ruddy", "Asa Virgil"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white placeholder-gray-400 outline-none transition focus:border-[#D4A85A]/70 focus:ring-2 focus:ring-[#D4A85A]/40";
const optionClass = "bg-[#111111] text-white";

const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute));
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const BookingModal = ({ isOpen, onClose, onSuccess, onError, selectedService, selectedBarber }) => {
  const datePickerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    barber: "",
    date: new Date(),
    time: "",
    notes: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setForm(prev => ({
        ...prev,
        service: selectedService || prev.service,
        barber: selectedBarber || prev.barber,
        date: prev.date || new Date(),
      }));
    }
  }, [isOpen, selectedService, selectedBarber]);

  // Close DatePicker on focus of any other input/select
  const handleFieldFocus = () => datePickerRef.current?.setOpen(false);

  // Fetch availability and hide past times for today
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!form.date || !form.service) {
        setAvailableTimes([]);
        setForm(prev => ({ ...prev, time: "" }));
        return;
      }

      setLoadingTimes(true);
      setBackendError("");

      
      try {
        const dateStr = [
          form.date.getFullYear(),
          String(form.date.getMonth() + 1).padStart(2, "0"),
          String(form.date.getDate()).padStart(2, "0"),
        ].join("-");
       
        const params = new URLSearchParams({
          date: dateStr,
          service: form.service,
          barber: form.barber || "Any Barber",
        });

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/availability?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch availability");

        let data = await res.json();
        let times = data.availableTimes || [];

        // Hide past times if today
        const now = new Date();
        if (form.date.toDateString() === now.toDateString()) {
          times = times.filter(t => {
            const [h, m] = t.split(":");
            return Number(h) > now.getHours() || (Number(h) === now.getHours() && Number(m) > now.getMinutes());
          });
        }

        setAvailableTimes(times);
        setForm(prev => ({ ...prev, time: "" }));
      } catch (err) {
        console.error(err);
        setBackendError("Unable to fetch times. Try again later.");
        setAvailableTimes([]);
        setForm(prev => ({ ...prev, time: "" }));
      } finally {
        setLoadingTimes(false);
      }
    };

    fetchAvailability();
  }, [form.date, form.service, form.barber]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({
      name: "", email: "", phone: "", service: "", barber: "",
      date: new Date(), time: "", notes: "",
    });
    setAvailableTimes([]);
    setBackendError("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setBackendError("");

    try {
      const localDate = [
        form.date.getFullYear(),
        String(form.date.getMonth() + 1).padStart(2, "0"),
        String(form.date.getDate()).padStart(2, "0"),
      ].join("-");

      const appointmentDate = 
        form.date && form.time
          ? new Date(`${localDate}T${form.time}`)
          : null;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          barber: form.barber || "Any Barber",
          appointmentDate,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 409) setBackendError(errorData.message);
        throw new Error(errorData.message || "Booking failed. Try again.");
      }

      const data = await res.json();
      onSuccess?.(data);
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      onError?.(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onMouseDown={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <motion.div
            onMouseDown={e => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#050505] p-5 text-white shadow-2xl sm:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button type="button" onClick={onClose} aria-label="Close booking form" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-gray-300 transition hover:border-[#D4A85A]/50 hover:text-[#D4A85A]">
              <FiX size={22} />
            </button>

            <div className="pr-12">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#D4A85A]">Appointment Request</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Book Your Appointment</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">Choose your service, barber, date, and time. The shop will confirm your appointment as soon as possible.</p>
            </div>

            {backendError && <p className="text-red-400 mt-4 font-medium">{backendError}</p>}

            <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={form.name} onFocus={handleFieldFocus} onChange={handleChange} required className={inputClass} />
              <input type="email" name="email" placeholder="Email Address" value={form.email} onFocus={handleFieldFocus} onChange={handleChange} required className={inputClass} />
              <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onFocus={handleFieldFocus} onChange={handleChange} required className={inputClass} />

              <select name="service" value={form.service} onFocus={handleFieldFocus} onChange={handleChange} required className={inputClass}>
                <option className={optionClass} value="">Select a Service</option>
                {services.map(s => <option className={optionClass} key={s} value={s}>{s}</option>)}
              </select>

              <select name="barber" value={form.barber} onFocus={handleFieldFocus} onChange={handleChange} className={inputClass}>
                {barbers.map(b => <option className={optionClass} key={b} value={b}>{b}</option>)}
              </select>

              <DatePicker
                ref={datePickerRef}
                selected={form.date}
                onChange={d => setForm({ ...form, date: d })}
                onFocus={handleFieldFocus}
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 21))}
                placeholderText="Select a Date"
                wrapperClassName="w-full"
                calendarClassName="mainstreet-datepicker"
                className={inputClass}
                dateFormat="MMMM d, yyyy"
                required
              />

              <select name="time" value={form.time} onChange={handleChange} required disabled={!form.date || !form.service || loadingTimes} className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}>
                <option className={optionClass} value="">
                  {!form.service ? "Select a service first" : !form.date ? "Select a date first" : loadingTimes ? "Checking availability..." : availableTimes.length === 0 ? "No times available" : "Select a Time"}
                </option>
                {availableTimes.map(t => <option className={optionClass} key={t} value={t}>{formatTime(t)}</option>)}
              </select>

              <textarea name="notes" placeholder="Additional notes, preferred style, or special requests" value={form.notes} onChange={handleChange} rows={4} className={`${inputClass} resize-none sm:col-span-2`} />

              <button type="submit" disabled={loadingTimes} className="mt-2 rounded-xl bg-[#D4A85A] px-6 py-4 font-bold text-black transition hover:bg-[#e4bd72] focus:outline-none focus:ring-2 focus:ring-[#D4A85A] focus:ring-offset-4 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
                {loadingTimes ? "Checking Availability..." : "Request Appointment"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;