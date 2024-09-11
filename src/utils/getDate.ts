export function getDatesItem(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return {
    day,
    month,
    year,
    hour,
    minute,
    formatted: `${day}.${month}.${year}`,
  };
}

export function getAgeAndFormattedDate(timestamp: number): string {
  const birthDate = new Date(timestamp * 1000);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  const day = birthDate.getDate().toString().padStart(2, "0");
  const month = (birthDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = birthDate.getFullYear();

  const formattedBirthDate = `${day}.${month}.${year}`;

  return ` ${age} (${formattedBirthDate})`;
}
