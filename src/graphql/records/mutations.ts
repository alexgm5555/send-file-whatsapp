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
    create(createRecordInput: {
      phone: $phone,
      id_role: $id_role,
    }) {
      id
      phone
      request_date
    }
  }
`;
