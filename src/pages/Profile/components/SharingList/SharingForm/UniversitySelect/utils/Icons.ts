interface IconProps {
  code: string;
  iconText: string;
}

export const FacilityIconsMap: IconProps[] = [
  {
    code: "58206",
    iconText: "la-snowflake",
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
    code: "59111",
    iconText: "la-wifi",
  },
  {
    code: "60973",
    iconText: "la-clock",
  },
  {
    code: "61118",
    iconText: "la-toilet",
  },
  {
    code: "61119",
    iconText: "la-bath",
  },
  {
    code: "61127",
    iconText: "la-bed",
  },
  {
    code: "61374",
    iconText: "la-stroopwafel",
  },
  {
    code: "61380",
    iconText: "la-bus",
  },
  {
    code: "61813",
    iconText: "la-coffee",
  },
  {
    code: "61820",
    iconText: "la-gas-pump",
  },
  {
    code: "61822",
    iconText: "la-hospital",
  },
  {
    code: "61824",
    iconText: "la-tshirt",
  },
  {
    code: "61847",
    iconText: "la-lock",
  },
  {
    code: "62085",
    iconText: "la-paw",
  },
  {
    code: "62143",
    iconText: "la-swimming-pool",
  },
  {
    code: "62240",
    iconText: "la-spa",
  },
  {
    code: "62268",
    iconText: "la-school",
  },
  {
    code: "62333",
    iconText: "la-building",
  },
  {
    code: "62335",
    iconText: "la-building",
  },
  {
    code: "62673",
    iconText: "la-door-open",
  },
  {
    code: "62682",
    iconText: "la-border-style",
  },
];

export const getIconTextFromCode = (code: string) => {
  const text = FacilityIconsMap.find((icon) => icon.code === code);
  if (text) {
    return text.iconText;
  } else {
    return "la-border-style";
  }
};
