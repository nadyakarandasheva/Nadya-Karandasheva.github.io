import { gql } from '@apollo/client';
import { Mutation, ProfilePasswordMutationsChangeArgs } from 'server.types';
import { get } from 'utils/unchanged';

export type ChangePasswordVars = ProfilePasswordMutationsChangeArgs;
export type ChangePasswordResponse = Pick<Mutation, 'profile'>;
export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    profile {
      password {
        change(input: $input) {
          success
        }
      }
    }
  }
`;

export const extractChangePassword = (data: ChangePasswordResponse): Mutation['profile']['password']['change'] =>
  get(`profile.password.change`, data);
