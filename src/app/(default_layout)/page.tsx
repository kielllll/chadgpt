"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineClear } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";

import { ChatMessage } from "~/components";

type Message = {
  id: string;
  name: string;
  message: string;
  picture?: string | undefined;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Partial<Message>[]>([]);

  const send = async () => {
    try {
      setMessages([
        ...messages,
        {
          id: crypto.randomUUID(),
          name: process.env.NEXT_PUBLIC_ADMIN_NAME,
          message,
        },
      ]);
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (res.status === 200) {
        const { response } = await res.json();

        setMessages((curr) => [
          ...curr,
          {
            id: crypto.randomUUID(),
            name: "Chad",
            message: response,
            picture: "https://i.ibb.co/fnJpP03/chad.png",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="desktop:mx-[20.5%] mx-7 flex h-[80vh] max-h-[80vh] flex-col rounded-xl bg-pearl min-[320px]:w-[90vw] md:mx-12 lg:w-[600px]">
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
        <div className="flex flex-1 flex-col overflow-y-scroll p-2">
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
          />
          <button
            onClick={() => {
              send();
              setMessage("");
            }}
            className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-300 active:translate-y-[1px]"
          >
            <BiSend size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
