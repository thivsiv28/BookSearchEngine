import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const SAVED_BOOKS = gql`
  query SavedBooks {
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
