/**
 * Возвращает фейковый API.
 * @returns {Promise<void>}
 */
export const getFakeApi = async (): Promise<void> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
  console.log(result);
};

/**
 * Какой-то класс.
 */
export class SomeClass {
  set: Set<number>;
  channel: BroadcastChannel;

  constructor() {
    this.set = new Set([1]);
    this.channel = new BroadcastChannel('test-broadcast-channel');
  }
}

/**
 * Дата.
 */
export type Data = {
  type: 'Money' | 'Percent';
  value: DataValue;
};

/**
 * Значение даты.
 */
export type DataValue = Money | Percent;

/**
 * Тип "Money" .
 */
export type Money = {
  currency: string;
  amount: number;
};

/**
 * Тип "Percent" .
 */
export type Percent = {
  percent: number;
};

/**
 * Получает количество из объекта даты.
 * @param {Data} data - Дата.
 * @returns {number} - Количество.
 */
const getDataAmount = (data: Data): number => {
  switch (data.type) {
    case 'Money':
      return (data.value as Money).amount;

    case 'Percent':
      throw new Error('Percent does not have an amount.');

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: never = data as never;
      throw new Error(`unknown type: ${data.type}`);
    }
  }
};
