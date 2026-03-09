import ContactForm from "@/components/Contact/ContactFrom";
import MapView from "@/components/Contact/MapView";
import HeaderGenerator from "@/components/ui/HeaderGenerator";
import React from "react";

function page() {
  return (
    <main>
      <HeaderGenerator>Contact</HeaderGenerator>
      <MapView />
      <ContactForm />
    </main>
  );
}

export default page;
