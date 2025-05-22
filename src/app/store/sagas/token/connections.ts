import { gql } from '@apollo/client';
import { Query } from 'server.types';
import { get } from 'utils/unchanged';

export type GetProfileResponse = Pick<Query, 'profile'>;
export const GET_PROFILE = gql`
  query getProfile {
    profile {
      about
      email
      id
      name
      signUpDate
    }
  }
`;

export const extractGetProfile = (data: GetProfileResponse): Query['profile'] => get('profile', data);
