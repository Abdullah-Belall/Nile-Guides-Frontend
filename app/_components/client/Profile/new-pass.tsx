"use client";
import MyButton from "@/app/_components/templates/my-button";
import {
  CLIENT_COLLECTOR_REQ,
  EDIT_USER_DATA_REQ,
} from "@/app/_utils/requests/client-requests-hub";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPasswordComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vaildationMessage, setVaildationMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const vaildationChecker = () => {
    const isPasswordValid =
      /[A-Z]/.test(password) && /[@$%!&*]/.test(password) && password.length > 8;
    if (!isPasswordValid) {
      setVaildationMessage(
        `Password must have at least one big, at least on of this signs @$%!&* and more than 8 character.`
      );
      return false;
    }
    if (password !== confirmPassword) {
      setVaildationMessage("Password and confirm password aren't match.");
      return false;
    }
    return true;
  };
  const handleSend = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    if (!vaildationChecker()) {
      return;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(EDIT_USER_DATA_REQ, { password });
    if (response?.done) {
      setVaildationMessage(``);
      router.replace("/");
    } else {
      if (response.status === 401) {
        router.replace("/log-in");
      } else {
        setVaildationMessage(response?.message as string);
      }
    }
    setLoading(false);
  };
  return (
    <div className="w-full px-mainX">
      <div className="relative flex flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-gradient-to-b from-[#cdbc9a] to-[#AE9460] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-mainlight">
                <p>New Password</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-anotherLight">
                <p>
                  Do not give your password to anyone, not even the admin if they ask you for it.
                </p>
              </div>
              <form className="flex flex-col gap-3 w-full">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                  className={`placeholder:text-sm placeholder:text-secdark p-3 w-full outline-none rounded-lg border border-gray-200 text-sm bg-mainlight focus:border-maindark caret-maindark text-maindark`}
                />
                <input
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Enter confirm password"
                  className={`placeholder:text-sm placeholder:text-secdark p-3 w-full outline-none rounded-lg border border-gray-200 text-sm bg-mainlight focus:border-maindark caret-maindark text-maindark`}
                />
                <MyButton
                  buttonColors="bg-mainlight text-maindark w-[180px] mx-auto"
                  say="Change Password"
                  loading={loading}
                  clickFunc={handleSend}
                  vaildationMessage={vaildationMessage}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
