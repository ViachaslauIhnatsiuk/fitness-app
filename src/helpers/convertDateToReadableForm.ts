const convertDateToReadableForm = (date: string) => String(new Date(date)).substring(4, 10);

export { convertDateToReadableForm };
