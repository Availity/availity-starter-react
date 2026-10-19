import { useMutation } from '@tanstack/react-query';
import AvApi from '@availity/api-axios';

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

// Placeholder endpoint. Mocked by Ekko (see config/routes.json and data/submission.json).
// Replace with your real resource. A write, so it goes through useMutation, not useQuery.
/**
 * @param {RequestPayload} payload
 * @returns {Promise<Submission>}
 */
const submitRequest = async (payload) => {
  const submissionApi = new AvApi({ api: false, url: '/cloud/fake/route' });
  const response = await submissionApi.create(payload);
  return response.data;
};

export const useSubmitRequest = () => useMutation({ mutationFn: submitRequest });
