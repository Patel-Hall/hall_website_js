"use client";
import { emptyProfileImageUrl } from "@/public/variables";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";

const EditProfileForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    instiEmail: "",
    rollNo: "",
    roomNo: "",
    facebookProfile: "",
    linkedinProfile: "",
    contact: "",
  });
  const [patelian, setPatelian] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [session]);

  const getUserDetails = async () => {
    console.log(session?.user?.email);
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const data = await response.json();
      console.log(data.patelian.instiEmail);

      if (response.ok) {
        setPatelian(data.patelian);
        setFormData({
          name: data.patelian.name,
          instiEmail: data.patelian.instiEmail,
          rollNo: data.patelian.rollNo,
          roomNo: data.patelian.roomNo,
          facebookProfile: data.patelian.facebookProfile,
          linkedinProfile: data.patelian.linkedinProfile,
          contact: data.patelian.contact,
        });
        setError(false);
      } else {
        console.log(data);
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name) {
      setSubmitError("Name field cannot be empty.");
      return;
    }

    await handleUpload("name", formData.name);
    await handleUpload("instiEmail", formData.instiEmail);
    await handleUpload("rollNo", formData.rollNo);
    await handleUpload("roomNo", formData.roomNo);
    await handleUpload("facebookProfile", formData.facebookProfile);
    await handleUpload("linkedinProfile", formData.linkedinProfile);
    await handleUpload("contact", formData.contact);
  };

  const handleUpload = async (field: string, value: string) => {
    try {
      const res = await fetch("/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: field, value: value }),
      });

      if (res.ok) {
        getUserDetails();
      } else {
        console.log(res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error Encountered</p>
      ) : (
        <div className="p-10 border-primary border-4 bg-white flex flex-row gap-5 shadow-lg rounded-lg">
          <div>
            <div className="bg-primary py-3 px-2">
              <CldImage
                src={
                  patelian.profileImageUrl
                    ? patelian.profileImageUrl
                    : emptyProfileImageUrl
                }
                alt="Patelian Profile Photo"
                className="w-auto"
                width={200}
                height={200}
                crop="auto"
              />
            </div>
            <CldUploadWidget
              options={{
                cropping: true,
                croppingAspectRatio: 1,
                showSkipCropButton: false,
              }}
              uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PROFILE_PRESET
              }
              onSuccess={(result: any) =>
                handleUpload("profileImageUrl", result?.info?.public_id)
              }
            >
              {({ open }) => {
                return (
                  <button
                    className="bg-primary mt-2 rounded-md p-1 text-white"
                    onClick={() => open()}
                  >
                    Upload Photo
                  </button>
                );
              }}
            </CldUploadWidget>
            {submitError && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 round mt-2">
                {submitError}
              </div>
            )}
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <input
                onChange={handleChange}
                value={formData.name}
                className="login_form_input"
                type="text"
                name="name"
                placeholder="Full Name*"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                value={formData.instiEmail}
                type="email"
                name="instiEmail"
                placeholder="Institute Email"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                value={formData.rollNo}
                type="text"
                name="rollNo"
                placeholder="Roll No"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                value={formData.roomNo}
                type="text"
                name="roomNo"
                placeholder="Room No"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                type="text"
                value={formData.facebookProfile}
                name="facebookProfile"
                placeholder="Facebook Profile"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                type="text"
                value={formData.linkedinProfile}
                name="linkedinProfile"
                placeholder="Linkedin Profile"
              />
              <input
                onChange={handleChange}
                className="login_form_input"
                type="text"
                value={formData.contact}
                name="contact"
                placeholder="Contact"
              />
              <button className="bg-primary text-white font-bold px-6 py-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
