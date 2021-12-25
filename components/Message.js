import React from "react";
import moment from "moment";

const Message = ({ message: { content, author, timestamp, embeds } }) => {
  return (
    <div className="my-3 select-none">
      <div className="flex gap-x-5">
        <img src={author.avatarURL} className="w-14 h-14 rounded-full" />
        <div className="flex flex-col gap-y-1">
          <span className="flex items-center gap-x-1 text-lg">
            {author.name}
            {author.bot && <BotTag />}
            <span className="text-xs text-gray-500">
              {moment(timestamp).calendar()}
            </span>
          </span>
          {content && <Content content={content} />}
          <div className="flex flex-col">
            {embeds && embeds.map((embed) => <Embed embed={embed} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Embed = ({ embed }) => {
  return (
    <div
      className="bg-embed rounded-sm border-l-4 py-4 px-3 max-w-2xl overflow-hidden flex flex-col gap-y-2 select-text"
      style={{
        borderColor: `${embed.hexColor}`,
      }}
    >
      {embed.title && (
        <h2 className="font-bold">
          {embed.url ? (
            <a
              href={embed.url}
              target="_blank"
              className="text-blue-500 hover:underline hover:cursor-pointer"
            >
              {embed.title}
            </a>
          ) : (
            <>{embed.title}</>
          )}
        </h2>
      )}
      {embed.description && (
        <span className="text-sm font-light select-text">
          {embed.description}
        </span>
      )}
      {embed.fields.length > 0 && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {embed.fields.map((field) => (
            <EmbedField field={field} />
          ))}
        </div>
      )}
      {embed.footer && <EmbedFooter footer={embed.footer} />}
    </div>
  );
};

const EmbedFooter = ({ footer }) => {
  return (
    <div className="text-xs flex items-center gap-x-2">
      <img src={footer.iconURL} className="w-[1.5em] h-[1.5em]" />
      {footer.text}
    </div>
  );
};

const EmbedField = ({ field }) => {
  return (
    <div className={`flex flex-col ${field.inline && "col-span-2"}`}>
      <span className="font-bold">{field.name}</span>
      <span>{field.value}</span>
    </div>
  );
};

const Content = ({ content }) => {
  const format = () => {
    const formattedContent = content.split(" ").map((word) => {
      if (word.startsWith("<") && word.endsWith(">")) {
        return (
          <Mention
            text={word}
            type={word.startsWith("<@&") ? "role" : "other"}
          />
        );
      } else {
        return <span>{word}</span>;
      }
    });

    return (
      <div className="inline-flex gap-1 select-text">{formattedContent}</div>
    );
  };

  return format();
};

const Mention = ({ text, type }) => {
  return (
    <span
      className={`uppercase font-medium ${
        type === "role" ? "bg-green-400" : "bg-blurple"
      } bg-opacity-50 p-1 rounded-md`}
    >
      {text}
    </span>
  );
};

const BotTag = () => {
  return (
    <span className="uppercase text-xs text-white bg-blurple py-0.5 px-1 rounded-md">
      Bot
    </span>
  );
};

export default Message;
