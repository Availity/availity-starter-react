import { useMutation } from '@tanstack/react-query';

/**
 * @typedef {Object} RequestPayload
 * @property {string} name
 * @property {string} email
 * @property {string} [message]
 */

/**
 * @typedef {Object} Submission
 * @property {string} id
 * @property {string} status
 * @property {string} submittedAt
 */

// Replace with a real API call (for example, an @availity/api-axios resource).
// A write, so it goes through useMutation, not useQuery.
/**
 * @param {RequestPayload} payload
 * @returns {Promise<Submission>}
 */
const submitRequest = async (payload) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return {
    id: `REF-${payload.name.slice(0, 2).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: 'Received',
    submittedAt: new Date().toLocaleString(),
  };
};

export const useSubmitRequest = () => useMutation({ mutationFn: submitRequest });
