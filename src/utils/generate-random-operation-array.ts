import { IOperationSummaryProps } from "src/features/operationSummary/OperationSummary";

export const generateRandomOperationArray = (count: number): IOperationSummaryProps[] => {

  const data: IOperationSummaryProps[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      amount: (Math.random() * 1000),
      category: "Category " + Math.floor(Math.random() * 5 + 1),
      title: "Operation " + Math.floor(Math.random() * 100),
      description: "This is a randomly generated operation description.",
    })
  }

  return data;
};