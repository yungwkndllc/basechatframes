"use client";
import Image from "next/image";
import { BASECHAT_ADDRESS } from "@/utils";
import { useWriteContract } from "wagmi";
import { basechatABI } from "../basechat/txdata/contracts/basechat";
import { useState } from "react";

export default function BuyImage() {
  const { writeContract, error } = useWriteContract();

  const [message, setMessage] = useState("");

  const onClickFunction = async () => {
    writeContract({
      abi: basechatABI,
      address: BASECHAT_ADDRESS,
      functionName: "chat",
      args: [message],
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={`/logo.png`}
        className="mt-10"
        alt="chat"
        width={400}
        height={400}
        priority
      />
      <div className="flex mt-4">
        {/* Message input */}
        <input
          className="border border-gray-300 p-2 text-black"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="mr-2 bg-coolGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            onClickFunction();
          }}
        >
          chat
        </button>
      </div>
    </div>
  );
}
