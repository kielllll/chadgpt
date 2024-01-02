"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineClear } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";
import { useAtom } from "jotai";

import { ChatMessage } from "~/components";
import { openAiTokenAtom } from "~/atoms";
import { Input } from "~/components/ui/input";

type Role = "user" | "assistant";

type Message = {
  id: string;
  name: string;
  message: string;
  role: Role;
  picture?: string | undefined;
};

export default function Home() {
  const [openAiToken, setOpenAiToken] = useAtom(openAiTokenAtom);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Partial<Message>[]>([]);

  const send = async () => {
    try {
      const newMessages = [
        ...messages,
        {
          id: crypto.randomUUID(),
          name: process.env.NEXT_PUBLIC_ADMIN_NAME,
          message,
          role: "user" as Role,
        },
      ];
      setMessages(newMessages);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiToken}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages.map(({ role, message }) => ({
            role,
            content: message,
          })),
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 200,
          stream: false,
          n: 1,
        }),
      });

      if (res.status === 200) {
        const response = await res.json();

        setMessages((curr) => [
          ...curr,
          {
            id: crypto.randomUUID(),
            name: "Chad",
            message: response.choices[0].message.content ?? "",
            picture: "https://i.ibb.co/fnJpP03/chad.png",
            role: "assistant" as Role,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-center gap-4 rounded-xl border-gray-50 bg-white p-4 min-[320px]:w-[90vw] lg:w-[600px]">
        <Input
          placeholder="OpenAI Access Token"
          value={openAiToken}
          onChange={(e) => {
            setOpenAiToken(e.target.value);
          }}
        />
      </div>

      <div className="desktop:mx-[20.5%] mx-7 mt-4 flex h-[80vh] max-h-[80vh] flex-col rounded-xl min-[320px]:w-[90vw] md:mx-12 lg:w-[600px]">
        <div className="flex h-[10%] items-center rounded-t-xl border-b-2 bg-gray-200 p-2">
          <div className="flex items-center gap-2">
            <Image
              src="https://i.ibb.co/fnJpP03/chad.png"
              alt="chad"
              height={20}
              width={50}
              className="rounded-full"
            />
            <div>
              <p className="text-xl font-semibold">Chad</p>
              <span className="text-sm text-gray-400">Alpha Bot</span>
            </div>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setMessages([])}
              className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-300 active:translate-y-[1px]"
            >
              <AiOutlineClear size={32} />
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-y-scroll bg-white p-2">
          {messages.length > 0 &&
            messages.map(({ id, name, message, picture }) => (
              <ChatMessage
                key={id}
                name={name}
                message={message}
                picture={picture}
              />
            ))}
        </div>
        <div className="mt-auto flex h-fit items-center gap-2 rounded-b-xl border-t-2 bg-gray-200 p-2">
          <TextareaAutosize
            className="w-full rounded-lg p-2"
            maxLength={250}
            maxRows={4}
            minRows={1}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(ev) => {
              if (message.length !== 0) {
                if (ev.key === "Enter") {
                  if (ev.shiftKey) return;
                  ev.preventDefault();
                  send();
                  setMessage("");
                }
              }
            }}
            disabled={!openAiToken}
          />
          <button
            onClick={() => {
              send();
              setMessage("");
            }}
            className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-300 active:translate-y-[1px]"
            disabled={message.length === 0 || !openAiToken}
          >
            <BiSend size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
