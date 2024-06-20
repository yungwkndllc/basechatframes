import { NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { basechatABI } from "./contracts/basechat";
import { BASECHAT_ADDRESS } from "@/utils";
import { frames } from "./txdata";
import { transaction } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  // Get the query param of message
  if (!ctx.message?.inputText) {
    return NextResponse.error();
  }

  const calldata = encodeFunctionData({
    abi: basechatABI,
    functionName: "chat",
    args: [ctx.message.inputText],
  });

  return transaction({
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: basechatABI as Abi,
      to: BASECHAT_ADDRESS,
      data: calldata,
    },
  });
});

export const GET = handleRequest;
export const POST = handleRequest;
