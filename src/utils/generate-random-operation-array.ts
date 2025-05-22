import dayjs from 'dayjs';
import { IOperationSummary } from 'src/interfaces/operation-summary.interafce';

export const generateRandomOperationArray = (count: number): IOperationSummary[] => {
  const data: IOperationSummary[] = [];

  for (let i = 0; i < count; i++) {
    const randomDays = Math.floor(Math.random() * i);

    data.push({
      id: Math.round(Math.random() * 10),
      amount: Math.round(Math.random() * 1000),
      category: 'Category ' + Math.floor(Math.random() * 5 + 1),
      title: 'Operation ' + Math.floor(Math.random() * 100),
      description: 'This is a randomly generated operation description.',
      date: dayjs().subtract(randomDays, 'day').format('YYYY-MM-DD'),
    });
  }

  return data;
};
