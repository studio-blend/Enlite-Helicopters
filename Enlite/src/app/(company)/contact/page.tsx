import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | Enlite Helicopters | India's Autonomous Cargo Leader",
  },
  description:
    "Get in touch with Enlite Helicopters for inquiries regarding our autonomous cargo platforms, partnership opportunities, or technical specifications.",
};

export default function ContactPage() {
  return <ContactClient />;
}
