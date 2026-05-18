const BookingSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-8 text-center text-white shadow-2xl">
        <h2 className="text-3xl font-bold text-[#D4A85A]">Request Sent</h2>

        <p className="mt-4 leading-relaxed text-gray-300">
          Your appointment request has been submitted. The shop will confirm
          your booking as soon as possible.
        </p>

        <button
          onClick={onClose}
          className="mt-8 rounded-xl bg-[#D4A85A] px-8 py-3 font-semibold text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;