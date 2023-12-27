import { gql } from '@apollo/client';

export const GENERATE_CERTIFICATE = gql`
  mutation GenerateCertificate(
    $certificate: Certificates!
    $productId: Float!
  ) {
    generateCertificate(certificate: $certificate, productId: $productId) {
      status
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation Mutation(
    $createRecordInput: CreateRecordInput!
  ){
    create(
      createRecordInput: $createRecordInput
  ) {
      id
      phone
      request_date
    }
  }
`;
