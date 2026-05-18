const ErrorToast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-500/30 bg-red-950/90 px-5 py-4 text-center text-sm text-red-100 shadow-2xl backdrop-blur-md">
      {message}
    </div>
  );
};

export default ErrorToast;