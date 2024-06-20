/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./basechat";
import { IMAGE_URL, VERCEL_URL } from "@/utils";

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: IMAGE_URL,
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://basescan.org/tx/${ctx.message.transactionId}`}
        >
          View on basescan
        </Button>,
        <Button action="link" target={`https://basechatframes.vercel.app/`}>
          View on BaseChat
        </Button>,
      ],
    };
  }

  return {
    image: IMAGE_URL,
    imageOptions: {
      aspectRatio: "1:1",
    },
    textInput: "enter your message",
    buttons: [
      <Button action="tx" target={`${VERCEL_URL}/basechat/txdata`} post_url="/">
        chat
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
