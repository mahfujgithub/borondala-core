import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handlePrismaClientValidationError = (
  error: Prisma.PrismaClientValidationError,
) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: error.message || 'Invalid input data',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handlePrismaClientValidationError;
