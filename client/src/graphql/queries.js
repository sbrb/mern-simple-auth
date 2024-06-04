import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
      name
      email
    }
  }
`;
