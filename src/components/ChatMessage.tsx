import Image from "next/image";

type Message = {
  picture?: string | undefined;
  name: string | undefined;
  message: string | undefined;
};

const ChatMessage = ({ message, name, picture }: Message) => {
  const avatar =
    picture && picture?.length > 0 ? (
      <Image src={picture } alt="avatar" height={40} width={40} />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
        {name?.charAt(0).toUpperCase() ?? "A"}
      </span>
    );

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
        {avatar}
      </div>
      <div className="max-w-full flex-1 break-all">{message}</div>
    </div>
  );
};

export default ChatMessage;
