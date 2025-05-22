export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Animal = Cat | Dog;

export type AuthResult = {
  __typename?: 'AuthResult';
  profile: Profile;
  token: Scalars['String']['output'];
};

export type Cat = {
  __typename?: 'Cat';
  age?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID']['output'];
  img?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CustomerMutations = {
  __typename?: 'CustomerMutations';
  add: Customer;
  edit: Customer;
  remove: Scalars['Boolean']['output'];
};

export type CustomerMutationsAddArgs = {
  img?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CustomerMutationsEditArgs = {
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CustomerMutationsRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type Dog = {
  __typename?: 'Dog';
  age?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  customers?: Maybe<CustomerMutations>;
  profile?: Maybe<ProfileMutations>;
};

export type Profile = UserInterface & {
  __typename?: 'Profile';
  about?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  password?: Maybe<ProfilePasswordMutations>;
  signin: AuthResult;
  signup: AuthResult;
  update: Profile;
};

export type ProfileMutationsSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ProfileMutationsSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ProfileMutationsUpdateArgs = {
  input: UpdateProfileInput;
};

export type ProfilePasswordMutations = {
  __typename?: 'ProfilePasswordMutations';
  change: ResetPassword;
};

export type ProfilePasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  animals?: Maybe<Array<Maybe<Animal>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  profile?: Maybe<Profile>;
};

export type QueryAnimalsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type QueryCustomersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = UserInterface & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

export type UserFilters = {
  id: Scalars['ID']['input'];
};

export type UserInterface = {
  about?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signUpDate: Scalars['String']['output'];
};

enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD', // Если не корректный email или пароль
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST', // При регистрации если пользователь уже существует
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED', // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD', // Некорректный старый пароль при попытке его изменить
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD', // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  ERR_NOT_VALID = 'ERR_NOT_VALID', // Не валидный id сущности
  ERR_AUTH = 'ERR_AUTH', // Токен не передан, либо не прошел авторизацию
  ERR_NO_FILES = 'ERR_NO_FILES', // Ошибка при загрузке файлов
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED', // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  ERR_NOT_FOUND = 'ERR_NOT_FOUND', // Сущность не найдена
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR', // Не валидные данные, например, не указано name
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS', // Все GET запросы могут принимать данные запроса в search params в формате { [key: string]: string // Нужно использовать JSON.stringify() }

  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER', // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}

export type ServerErrorItem = {
  extensions: {
    code: ErrorCode;
  };
  name: string;
  fieldName?: string;
  stack: string;
  message: string;
};

export type ServerErrors = {
  errors: ServerErrorItem[];
};

export type Filters = {
  ids?: string[];
  name?: string;
  categoryIds?: string[];
  type?: 'Cost' | 'Profit';
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  date?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type Operation = 'Profit' | 'Cost';

export type OperationParams = {
  id?: string;
  name?: string;
  desc?: string;
  amount?: number;
  date?: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type?: Operation;
  category?: Category;
};

export type CategoryFilters = {
  name?: string;
  ids?: string[];
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  updatedAt?: {
    gte?: string;
    lte?: string;
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type CreateCategoryParams = {
  name: string;
  photo?: string;
};
