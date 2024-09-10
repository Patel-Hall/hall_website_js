"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [hallInfo, setHallInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [office, setOffice] = useState("");
  const [security, setSecurity] = useState("");
  const [socials, setSocials] = useState([]);

  const fetchHallInfo = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getHallInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        setHallInfo(data.hallInfo);
        setAddress(data.hallInfo.address);
        setOffice(data.hallInfo.officePhone);
        setSecurity(data.hallInfo.securityPhone);
        setSocials(data.hallInfo.socials);
      } else {
        setError(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHallInfo();
  }, []);

  const handleSocialChange = (index, event) => {
    setSocials((prevSocials) =>
      prevSocials.map((social, i) =>
        i === index
          ? { ...social, [event.target.name]: event.target.value }
          : social
      )
    );
  };

  const addSocial = () => {
    setSocials((prevSocials) => [...prevSocials, { socialType: "", url: "" }]);
  };

  const removeSocial = (index) => {
    setSocials((prevSocials) => prevSocials.filter((_, i) => i !== index));
  };

  const handleUpload = async (type, value) => {
    try {
      const res = await fetch("/api/updateHallInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: type, value: value }),
      });

      if (res.ok) {
        fetchHallInfo();
      } else {
        console.log(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !office || !security) {
      setError("All fields are required.");
      return;
    }

    await handleUpload("address", address);
    await handleUpload("officePhone", office);
    await handleUpload("securityPhone", security);
    await handleUpload("socials", socials);
  };

  return (
    <div className="h-screen bg-secondary">
      Edit Contact Information
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error encountered: {error}</p>
        ) : (
          <div className="flex flex-row gap-10 mx-5 mt-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-5"
            >
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form_input w-full"
                placeholder="Address"
              />
              <input
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="form_input w-full"
                type="text"
                placeholder="Office Phone"
              />
              <input
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
                className="form_input w-full"
                type="text"
                placeholder="Security Phone"
              />
              {socials.map((social, index) => {
                return (
                  <div key={index} className="flex flex-row gap-5">
                    <input
                      value={social.socialType.toString()}
                      name="socialType"
                      onChange={(e) => handleSocialChange(index, e)}
                      className="form_input"
                      type="text"
                      placeholder="Social Type"
                    />
                    <input
                      value={social.url.toString()}
                      name="url"
                      onChange={(e) => handleSocialChange(index, e)}
                      className="form_input w-full"
                      type="text"
                      placeholder="Profile Link"
                    />
                    <button
                      className="bg-primary text-secondary font-bold px-6 py-2"
                      type="button"
                      onClick={() => removeSocial(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <button
                className="bg-primary text-secondary font-bold px-6 py-2 w-1/6"
                type="button"
                onClick={addSocial}
              >
                Add Social
              </button>
              <button
                className="bg-primary text-secondary font-bold px-6 py-2"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
);
};

export default page;