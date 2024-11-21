type Params = {
  data: { language?: string | null }[];
  languageCode: string;
};

export const getLocalizedData = ({ data, languageCode }: Params) => {
  const localizedData = data.filter(data => data.language === languageCode);

  return localizedData.length > 0 ? localizedData : data;
};
