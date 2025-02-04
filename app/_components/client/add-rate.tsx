"use client";
import { Rating } from "@mui/material";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {
  CLIENT_COLLECTOR_REQ,
  RATE_POST_REQUESTS,
} from "@/app/_utils/requests/client-requests-hub";
import MyButton from "../templates/my-button";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function AddRate({
  postId,
  rate,
  text_,
}: {
  postId: string;
  rate: number;
  text_: string;
}) {
  const [value, setValue] = useState<number | null>(rate / 2);
  const [hover, setHover] = useState(-1);
  const [text, setText] = useState(text_);
  const [loading, setLoading] = useState(false);
  const [vaildationMessage, setVaildationMessage] = useState("");
  const [doneMessage, setDoneMessage] = useState("");

  const handleSend = async () => {
    if (loading) return;
    if ((value as number) <= 0) {
      setVaildationMessage(`Submit a service rating.`);
      return;
    }
    setLoading(true);
    setVaildationMessage(``);
    const data: any = { rate: (value as number) * 2, text };
    if (data.text.length < 1) delete data.text;
    const response = await CLIENT_COLLECTOR_REQ(RATE_POST_REQUESTS, { id: postId, data });
    if (response.done) {
      setDoneMessage(`Your review added successfully.`);
    } else {
      setVaildationMessage(response.message);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center sm:items-start max-w-[600px] mx-auto">
      <div className="w-full flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-maindark mb-3 text-lg">Write a review</h1>
        <Box className={`ml-[70px] sm:ml-0 flex items-center w-[200px] sm:mr-5`}>
          <Rating
            style={{ color: "#eab308" }}
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(_, newValue) => setValue(newValue)}
            onChangeActive={(_, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box className={`text-maindark`} sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : value]}
            </Box>
          )}
        </Box>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your opinion here"
        className={`resize-none mt-1 h-[120px] placeholder:text-maindarkblur p-3 w-full outline-0 rounded-md bg-transparent duration-200 border border-maindarkblur text-maindarkblur`}
      ></textarea>
      <p className={`w-fit text-xs text-green-900 mt-2 mx-auto`}>{doneMessage}</p>
      <MyButton
        buttonColors="bg-transparent hover:bg-maindarkblur text-maindark hover:text-anotherLight border border-maindarkblur duration-200 mx-auto"
        say="Send"
        loading={loading}
        clickFunc={handleSend}
        vaildationMessage={vaildationMessage}
        vaildationMessageWidth="mx-auto"
      />
    </div>
  );
}
