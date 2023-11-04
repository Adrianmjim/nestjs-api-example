import envalid from 'envalid';

export type EnvToEnvValidatorEnvalidMap<TData> = {
  [TKey in keyof TData]: envalid.ValidatorSpec<TData[TKey]>;
};
