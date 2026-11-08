import { Fragment } from "react";

const TOKEN = /(https:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[a-z.]*[a-z])/g;
const IS_URL = /^https:\/\//;
const IS_EMAIL = /^[\w.+-]+@[\w-]+\.[a-z.]*[a-z]$/;

/** Turns emails and https URLs inside plain text into links. */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (IS_URL.test(part))
          return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 [overflow-wrap:anywhere]">{part}</a>;
        if (IS_EMAIL.test(part))
          return <a key={i} href={`mailto:${part}`} className="text-accent underline underline-offset-2">{part}</a>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
