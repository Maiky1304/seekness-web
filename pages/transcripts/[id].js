import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import moment from "moment";
import Message from "../../components/Message";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TranscriptPage = () => {
  const {
    query: { id },
  } = useRouter();

  const response = useSWR(`/api/chats/${id}`, fetcher);

  if (response.error) {
    return "Error";
  }

  if (!response.data) {
    return "Loading...";
  }

  const {
    content: { data, messages },
  } = response.data;

  return (
    <div className="text-white">
      <header className="bg-blurple p-5 shadow-xl flex justify-between items-center px-10">
        <div>
          <h1 className="text-3xl font-bold">Ticket - {data.channelName}</h1>
          <h2 className="mt-2 flex items-center gap-x-3">
            <img
              className="h-12 w-12 rounded-full"
              src={data.author.avatarURL}
            />
            <h3 className="text-xl font-light">{data.author.name}</h3>
          </h2>
        </div>
        <div>
          <h2 className="text-xl">
            🕒 Created {moment(data.timestamp).fromNow()}
          </h2>
        </div>
      </header>
      <main className="mt-5 px-10 flex flex-col overflow-x-hidden">
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </main>
    </div>
  );
};

export default TranscriptPage;
