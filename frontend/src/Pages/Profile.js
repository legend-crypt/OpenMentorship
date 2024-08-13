import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "../utils/axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    first_name: userProfile ? userProfile.first_name : "",
    last_name: userProfile ? userProfile.last_name : "",
    bio: userProfile ? userProfile.bio : "",
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "multipart/form-data",
    },
  };

  useEffect(() => {
    !userProfile &&
      axios
        .get("profile/retrieve/", config)
        .then((response) => {
          if (response.status === 200) {
            setUserProfile(response.data?.data);
            localStorage.setItem(
              "profile",
              JSON.stringify(response.data?.data)
            );
          }
        })
        .catch((error) => {
          toast.error("Failed to retrieve profile", error.message);
        });
  }, [userProfile]);

  const basicValidationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    bio: Yup.string(),
    profile_picture: Yup.mixed(),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("bio", values.bio);
    const fileInput = document.querySelector('input[name="profile_picture"]');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append("profile_picture", fileInput.files[0]);
    }

    try {
      const response = userProfile
        ? await updateProfile(formData)
        : await createProfile(formData);

      if (response.status === 200 || response.status === 201) {
        const updatedProfile = response.data.profile;
        setUserProfile(updatedProfile);
        localStorage.setItem("profile", JSON.stringify(updatedProfile));
        toast.success(
          userProfile
            ? "Profile successfully updated"
            : "Profile successfully created"
        );
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(
        `Failed to ${userProfile ? "update" : "create"} profile: ${
          error.message || "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const createProfile = async (formData) => {
    return await axios.post("profile/create/", formData, config);
  };

  const updateProfile = async (formData) => {
    return await axios.put("profile/update/", formData, config);
  };

  return (
    <>
      <div className="container" id="profile-container">
        {/* Display existing profile information */}
        {userProfile && (
          <div className="profile__info">
            <div className="profile_info--image">
              <img
                src={`${userProfile.profile_picture}`}
                alt="profile"
                className="profile"
              />
            </div>
            <div className="profile_info--text">
              <p>
                First Name: <span>{userProfile.first_name}</span>
              </p>
              <p>
                Last Name: <span>{userProfile.last_name}</span>
              </p>
              {/* Add other profile information here */}
            </div>
          </div>
        )}
        {/* Form for updating profile */}
        <h1 className="form__head--text">
          {userProfile ? "Update Profile" : "Create Profile"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={basicValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <Field
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="form__field"
                />
                <ErrorMessage
                  name="first_name"
                  component="p"
                  className="error"
                />
              </div>
              <div className="field">
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="form__field"
                />
                <ErrorMessage
                  name="last_name"
                  component="p"
                  className="error"
                />
              </div>
              <div className="field">
                <Field
                  name="bio"
                  as="textarea"
                  placeholder="Tell more about yourself"
                  className="form__field"
                  id="textarea"
                />
                <ErrorMessage name="bio" component="p" className="error" />
              </div>
              <div className="field">
                <Field
                  name="profile_picture"
                  type="file"
                  placeholder="Select file"
                  className="form__field"
                />
                <ErrorMessage
                  name="profile_picture"
                  component="p"
                  className="error"
                />
              </div>
              <button
                type="submit"
                id="btn__cta"
                className="form__field"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : userProfile
                  ? "Update Profile"
                  : "Create Profile"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
