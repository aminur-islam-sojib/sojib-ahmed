"use client";
import { useState, useRef, useEffect } from "react";

const MapView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="my-5 mt-7" ref={containerRef}>
      <div className="relative w-full h-50 md:h-100 shadow-lg rounded-xl overflow-hidden">
        {isVisible ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29064.83098012039!2d88.95840428716986!3d24.412458685429733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc11714a398415%3A0x4b786d401795f55b!2sNatore!5e0!3m2!1sen!2sbd!4v1759323798595!5m2!1sen!2sbd"
            className="w-full h-full rounded-xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
      </div>
    </section>
  );
};

export default MapView;
