type Params = {
  data: { language?: string | null }[];
  languageCode: string;
};

export const getLocalizedData = ({ data, languageCode }: Params) => {
  const localizedData = data.filter(data => data.language === languageCode);
  const defaultData = data.filter(data => !data.language);

  return localizedData.length > 0 ? localizedData : defaultData;
};
