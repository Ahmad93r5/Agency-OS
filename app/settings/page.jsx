"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import SettingsUI from "@/components/Settings/SettingsUI";

export default function SettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  //  Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiRequest("/profile");
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  //  Auto-dismiss messages (3 seconds)
  useEffect(() => {
    if (profileError || profileSuccess) {
      const t = setTimeout(() => {
        setProfileError(null);
        setProfileSuccess(null);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [profileError, profileSuccess]);

  useEffect(() => {
    if (passwordError || passwordSuccess) {
      const t = setTimeout(() => {
        setPasswordError(null);
        setPasswordSuccess(null);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [passwordError, passwordSuccess]);

  //  Save Profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const data = await apiRequest("/profile", {
        method: "PATCH",
        body: JSON.stringify({ user: { name: user.name, email: user.email } }),
      });
      setUser(data.user);
      setProfileSuccess("Profile updated successfully");
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        setProfileError(err.errors[0]);
      } else {
        setProfileError("Failed to update profile. Please try again.");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  // ✅ Change Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      await apiRequest("/change_password", {
        method: "PATCH",
        body: JSON.stringify(passwordForm),
      });
      setPasswordSuccess("Password updated successfully");
      setPasswordForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        setPasswordError(err.errors[0]);
      } else {
        setPasswordError("Failed to update password. Please try again.");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <SettingsUI
      user={user}
      setUser={setUser}
      handleProfileSubmit={handleProfileSubmit}
      savingProfile={savingProfile}
      profileError={profileError}
      profileSuccess={profileSuccess}
      passwordForm={passwordForm}
      setPasswordForm={setPasswordForm}
      handlePasswordSubmit={handlePasswordSubmit}
      savingPassword={savingPassword}
      passwordError={passwordError}
      passwordSuccess={passwordSuccess}
    />
  );
}