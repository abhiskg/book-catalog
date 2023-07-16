export const cowLocation = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
] as const;

export const cowBreed = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
] as const;

export const cowLabel = ["for sale", "sold out"] as const;

export const cowCategory = ["Dairy", "Beef", "Dual Purpose"] as const;

export const cowSearchableFields = ["location", "breed", "category"];

export const cowFilterableFields = [
  "searchTerm",
  "location",
  "minPrice",
  "maxPrice",
];
