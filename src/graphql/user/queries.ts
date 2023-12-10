import { gql } from 'apollo-angular';

export const USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      email
      name
      username
    }
  }
`;
