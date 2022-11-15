interface IconProps {
  code: string;
  iconText: string;
}

export const IconsMap: IconProps[] = [
  {
    code: "59520",
    iconText: "la-border-style",
  },
  {
    code: "58269",
    iconText: "la-parking",
  },
  {
    code: "58674",
    iconText: "la-utensils",
  },
  {
    code: "61931",
    iconText: "la-wifi",
  },
  {
    code: "61596",
    iconText: "la-clock",
  },
  {
    code: "63448",
    iconText: "la-toilet",
  },
  {
    code: "62157",
    iconText: "la-bath",
  },
  {
    code: "62006",
    iconText: "la-bed",
  },
  {
    code: "59520",
    iconText: "la-stroopwafel",
  },
  {
    code: "61959",
    iconText: "la-bus",
  },
  {
    code: "61684",
    iconText: "la-coffee",
  },
  {
    code: "62767",
    iconText: "la-gas-pump",
  },
  {
    code: "61688",
    iconText: "la-hospital",
  },
  {
    code: "62803",
    iconText: "la-tshirt",
  },
  {
    code: "62725",
    iconText: "la-lock",
  },
  {
    code: "61872",
    iconText: "la-paw",
  },
  {
    code: "62917",
    iconText: "la-swimming-pool",
  },
  {
    code: "62907",
    iconText: "la-spa",
  },
  {
    code: "61852",
    iconText: "la-school",
  },
  {
    code: "59400",
    iconText: "la-building",
  },
  {
    code: "62097",
    iconText: "la-building",
  },
  {
    code: "62763",
    iconText: "la-door-open",
  },
  {
    code: "62682",
    iconText: "la-border-style",
  },
  {
    code: "63357",
    iconText: "la-baby",
  },
  {
    code: "59520",
    iconText: "la-water",
  },
  {
    code: "61882",
    iconText: "la-bus",
  },
  {
    code: "62784",
    iconText: "la-parking",
  },
  {
    code: "63379",
    iconText: "la-thermometer-full",
  },
  {
    code: "61445",
    iconText: "la-border-style",
  },
];

export const getIconTextFromCode = (code: string) => {
  const text = IconsMap.find((icon) => icon.code === code);
  if (text) {
    return text.iconText;
  } else {
    return "la-border-style";
  }
};
