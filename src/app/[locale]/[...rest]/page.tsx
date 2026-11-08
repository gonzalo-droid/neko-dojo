import { notFound } from "next/navigation";

// Any unknown path under /es or /en shows the localized 404.
export default function CatchAll() {
  notFound();
}
