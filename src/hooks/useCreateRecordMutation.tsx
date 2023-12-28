import { useMutation } from '@apollo/client';
import { CREATE_RECORD } from '../graphql/mutations';

const useCreateRecordMutation = () => {

  const [mutate] = useMutation(
    CREATE_RECORD,
    {
      errorPolicy: 'all',
      onError(err) {
        const error = `${err}`.split(':').reverse()[0];
        if (error === ' Failed to fetch') {
          console.log(error);
        }
      },
    },
  );

  const createRecord = async (phoneNumber: String) => {
    try {
      const result = await mutate({
        variables: {
          createRecordInput: {
            phone: phoneNumber,
          },
        },
      });

      // Aquí puedes manejar la respuesta de la mutación si es necesario
      console.log(result);
    } catch (error) {
      console.error(error);
      // Puedes lanzar una excepción o manejar el error de alguna otra manera
    }
  };

  return { createRecord };
};

export default useCreateRecordMutation;
