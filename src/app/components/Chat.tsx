"use client";

import { useEffect, useRef, useState } from "react";
import { useReadContract } from "wagmi";
import { basechatABI } from "../basechat/txdata/contracts/basechat";
import { BASECHAT_ADDRESS } from "@/utils";

interface ChatMessage {
  message: string;
  sender: string;
  timestamp: number;
}

const ChatScroller: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data } = useReadContract({
    abi: basechatABI,
    address: BASECHAT_ADDRESS,
    functionName: "getMessages",
  });

  // When page loads, fetch messages from the contract
  useEffect(() => {
    if (data) {
      setMessages(
        data.map((d) => {
          return {
            message: d.message,
            sender: d.sender as string,
            timestamp: Number(d.timestamp),
          };
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={scrollerRef}
      className="relative h-80 overflow-y-auto bg-black text-coolGreen border border-4 border-coolGreen rounded-lg p-4"
    >
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <p className="text-xs text-gray-500">
            {new Date(msg.timestamp * 1000).toLocaleTimeString()} - {msg.sender}
          </p>
          <p className="text-2xl">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatScroller;
