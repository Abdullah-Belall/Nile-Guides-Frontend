"use client";
import MyButton from "@/app/_components/templates/my-button";
import { VERIFY_EMAIL_REQ } from "@/app/_utils/requests/client-requests-hub";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function VerifyEmailComponent() {
  const params = useParams<any>();
  const router = useRouter();
  const [code1, setCode1] = useState<any>("");
  const [code2, setCode2] = useState<any>("");
  const [code3, setCode3] = useState<any>("");
  const [code4, setCode4] = useState<any>("");
  const [code5, setCode5] = useState<any>("");
  const [code6, setCode6] = useState<any>("");
  const one = useRef<any>();
  const two = useRef<any>();
  const three = useRef<any>();
  const four = useRef<any>();
  const five = useRef<any>();
  const six = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleInp = (e: any) => {
    return e.target.value < 0 || e.target.value > 9 ? "" : e.target.value;
  };
  const handleSend = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    const condition =
      code1 !== "" && code2 !== "" && code3 !== "" && code4 !== "" && code5 !== "" && code6 !== "";
    if (!condition) {
      setErrMessage("Please fill all inputs.");
      return;
    }
    setErrMessage("");
    setLoading(true);
    const verification_code = code1 + code2 + code3 + code4 + code5 + code6;
    const ready = params.verfiyEmail?.split("%40");
    const email = ready[0] + "@" + ready[1];
    const response = await VERIFY_EMAIL_REQ({ email, verification_code });
    if (response?.done) {
      router.push(`/log-in`);
    } else {
      setErrMessage(response?.message as string);
    }
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-12 w-full min-[430px]:w-[430px] px-mainX">
      <div className="relative bg-gradient-to-b from-[#cdbc9a] to-[#AE9460] px-6 pt-10 pb-9 shadow-xl mx-auto w-full rounded-2xl">
        <div className="mx-auto flex w-full flex-col space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-mainlight">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-anotherLight">
              <p>We have sent a code to your email</p>
            </div>
          </div>
          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-6">
                <div className="flex gap-2 flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => {
                        setCode1(handleInp(e));
                        two.current.focus();
                      }}
                      value={code1}
                      ref={one}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => {
                        setCode2(handleInp(e));
                        three.current.focus();
                      }}
                      value={code2}
                      ref={two}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => {
                        setCode3(handleInp(e));
                        four.current.focus();
                      }}
                      value={code3}
                      ref={three}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => {
                        setCode4(handleInp(e));
                        five.current.focus();
                      }}
                      value={code4}
                      ref={four}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => {
                        setCode5(handleInp(e));
                        six.current.focus();
                      }}
                      value={code5}
                      ref={five}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      onChange={(e) => setCode6(handleInp(e))}
                      value={code6}
                      ref={six}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-mainlight focus:border-maindark caret-maindark text-maindark"
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center mx-auto">
                  <MyButton
                    buttonColors="bg-mainlight text-maindark"
                    say="Verify Email"
                    loading={loading}
                    clickFunc={handleSend}
                    vaildationMessage={errMessage}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
