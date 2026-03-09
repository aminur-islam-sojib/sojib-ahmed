import { Mail, PhoneCall, CalendarFold, LocationEditIcon } from "lucide-react";
import SocialMedia from "./social-media";

interface userDataType {
  id: number;
  title: string;
  value: string;
  icon: "Mail" | "PhoneCall" | "CalendarFold" | "LocationEditIcon";
}

const userData: userDataType[] = [
  {
    id: 1,
    title: "EMAIL",
    value: "sojibahmed.connect@gmail.com",
    icon: "Mail",
  },
  {
    id: 2,
    title: "PHONE",
    value: "+8801757829428",
    icon: "PhoneCall",
  },
  {
    id: 3,
    title: "BIRTHDAY",
    value: "Feb 20, 2006",
    icon: "CalendarFold",
  },

  {
    id: 4,
    title: "LOCATION",
    value: "Dhaka, Bangladesh",
    icon: "LocationEditIcon",
  },
];

const AsideContactInfo = () => {
  const icons = { Mail, PhoneCall, CalendarFold, LocationEditIcon };

  const handleRedirectLink = (title: string, value: string) => {
    if (title === "email") {
      console.log(value);
      window.open(`mailto:${value}`, "_self");
    } else if (title === "phone") {
      window.open(`tel:${value}`, "_self");
    }
  };

  return (
    <div>
      <div className="mt-5 mb-10 lg:mt-10 lg:block">
        <hr className="border-border" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-1">
        {userData.map(({ id, title, value, icon }) => {
          const Icon = icons[icon];
          return (
            <div key={id} className="min-w-0 group">
              <div className="flex gap-3 ">
                <div className="bgIcon relative flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon
                    color="var(--primary)"
                    className="transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h1 className="text-muted-foreground text-xs">{title}</h1>
                  <p
                    onClick={() =>
                      handleRedirectLink(title.toLowerCase(), value)
                    }
                    className="line-clamp-1 cursor-pointer wrap-break-word text-[15px]"
                    title={value}
                  >
                    {value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 mb-10 lg:mt-10 lg:block">
        <hr />
      </div>
      <SocialMedia />
    </div>
  );
};

export default AsideContactInfo;
