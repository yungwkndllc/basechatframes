export const basechatABI = [
  { inputs: [], name: "QueueEmpty", type: "error" },
  { inputs: [], name: "QueueFull", type: "error" },
  { inputs: [], name: "QueueOutOfBounds", type: "error" },
  {
    inputs: [{ internalType: "string", name: "message", type: "string" }],
    name: "chat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessages",
    outputs: [
      {
        components: [
          { internalType: "string", name: "message", type: "string" },
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct BaseChat.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
