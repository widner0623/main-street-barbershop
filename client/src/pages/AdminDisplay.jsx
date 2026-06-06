import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const waitOptions = [0, 10, 20, 30, 45, 60, 90, 120];

const defaultGalleryImages = [
  "/display-gallery/cut1.jpg",
  "/display-gallery/cut2.jpg",
  "/display-gallery/cut3.jpg",
  "/display-gallery/cut4.jpg",
  "/display-gallery/cut5.jpg",
  "/display-gallery/cut6.jpg",
];

const AdminDisplay = () => {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const inputRef = useRef(null);

  const submitPin = async (pinToCheck) => {
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/display-auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin: pinToCheck }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("Invalid PIN. Try again.");
        setPin("");
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }

      setIsUnlocked(true);
    } catch (err) {
      setError("Could not connect to server.");
      setPin("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (pin.length === 4) {
      submitPin(pin);
    }
  };

  useEffect(() => {
    if (!isUnlocked) return;

    fetch(`${API_URL}/api/display`)
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          ...data,
          galleryImages:
            data.galleryImages?.length === 6
              ? data.galleryImages
              : defaultGalleryImages,
        });
      })
      .catch(() => setSaveMessage("Could not load display settings."));
  }, [isUnlocked]);

  const updateField = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const uploadGalleryImage = async (index, file) => {
    if (!file) return;

    setSaveMessage("Uploading image...");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("index", index);

    try {
      const res = await fetch(
        `${API_URL}/api/display/upload-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSaveMessage("Could not upload image.");
        return;
      }

      setSettings((prev) => ({
        ...prev,
        galleryImages: data.galleryImages,
      }));

      setSaveMessage(`Image ${index + 1} updated successfully.`);
    } catch (err) {
      setSaveMessage("Could not connect to server.");
    }
  };

  const saveSettings = async () => {
    setSaveMessage("");

    try {
      const res = await fetch(`${API_URL}/api/display`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveMessage("Could not save changes.");
        return;
      }

      setSettings({
        ...data,
        galleryImages:
          data.galleryImages?.length === 6
            ? data.galleryImages
            : defaultGalleryImages,
      });

      setSaveMessage("Display updated successfully.");
    } catch (err) {
      setSaveMessage("Could not connect to server.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-[#D4A85A]/40 bg-zinc-950 p-8 shadow-2xl"
        >
          <h1 className="text-3xl font-black text-[#D4A85A]">
            Display Admin
          </h1>

          <p className="mt-2 text-gray-300">
            Enter the 4-digit PIN to update the shop display.
          </p>

          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            maxLength="4"
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPin(value);

              if (value.length === 4) {
                submitPin(value);
              }
            }}
            className="mt-8 w-full rounded-xl border border-[#D4A85A]/40 bg-black px-5 py-4 text-center text-4xl tracking-[0.5em] text-white outline-none"
            placeholder="••••"
          />

          {error && <p className="mt-4 text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-[#D4A85A] px-6 py-4 text-xl font-bold text-black"
          >
            Unlock Display Controls
          </button>
        </form>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading display controls...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#D4A85A]">
            Display Controls
          </h1>
          <p className="mt-2 text-gray-300">
            Update the TV display from the tablet.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-[#D4A85A]/30 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-[#D4A85A]">Shop Status</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {["open", "busy", "closed"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateField("shopStatus", status)}
                  className={`rounded-2xl px-6 py-5 text-2xl font-black uppercase ${
                    settings.shopStatus === status
                      ? "bg-[#D4A85A] text-black"
                      : "bg-black text-white border border-[#D4A85A]/30"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#D4A85A]/30 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-[#D4A85A]">Wait Time</h2>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {waitOptions.map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => updateField("waitTime", minutes)}
                  className={`rounded-2xl px-5 py-5 text-2xl font-black ${
                    settings.waitTime === minutes
                      ? "bg-[#D4A85A] text-black"
                      : "bg-black text-white border border-[#D4A85A]/30"
                  }`}
                >
                  {minutes === 0 ? "No Wait" : `${minutes} Min`}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#D4A85A]/30 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-[#D4A85A]">
              Announcement
            </h2>

            <textarea
              value={settings.announcement}
              onChange={(e) => updateField("announcement", e.target.value)}
              className="mt-5 min-h-32 w-full rounded-2xl border border-[#D4A85A]/30 bg-black p-5 text-xl text-white outline-none"
              placeholder="Example: Walk-ins welcome today!"
            />
          </section>

          <section className="rounded-3xl border border-[#D4A85A]/30 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-[#D4A85A]">
              Gift Certificate Text
            </h2>

            <input
              value={settings.giftCertificateText}
              onChange={(e) =>
                updateField("giftCertificateText", e.target.value)
              }
              className="mt-5 w-full rounded-2xl border border-[#D4A85A]/30 bg-black p-5 text-xl text-white outline-none"
              placeholder="Example: Available in any amount"
            />
          </section>

          <section className="rounded-3xl border border-[#D4A85A]/30 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-[#D4A85A]">
              Recent Cuts Images
            </h2>

            <p className="mt-2 text-gray-400">
              Tap Change Image to upload a new haircut photo.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {(settings.galleryImages || defaultGalleryImages).map(
                (image, index) => {
                  const imageSrc = image?.startsWith("/uploads")
                    ? `${API_URL}${image}`
                    : image;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#D4A85A]/20 bg-black p-4"
                    >
                      <p className="mb-3 font-bold text-[#D4A85A]">
                        Image {index + 1}
                      </p>

                      <div className="mb-4 h-40 overflow-hidden rounded-xl bg-zinc-900">
                        {image ? (
                          <img
                            src={imageSrc}
                            alt={`Gallery preview ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-500">
                            No image selected
                          </div>
                        )}
                      </div>

                      <label className="block w-full cursor-pointer rounded-xl bg-[#D4A85A] px-5 py-4 text-center text-lg font-black text-black">
                        Change Image

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            uploadGalleryImage(index, e.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {saveMessage && (
            <p className="rounded-2xl bg-black p-4 text-center text-lg text-[#D4A85A]">
              {saveMessage}
            </p>
          )}

          <button
            onClick={saveSettings}
            className="w-full rounded-2xl bg-[#D4A85A] px-8 py-6 text-2xl font-black text-black"
          >
            Save Display Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDisplay;