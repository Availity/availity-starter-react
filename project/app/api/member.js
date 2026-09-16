// Replace this with your actual API call using @availity/api-axios or axios directly.
// Example: import AvApi from '@availity/api-axios';
//          const memberApi = new AvApi({ name: 'members' });
//          export const fetchMember = ({ memberId, zipCode }) => memberApi.get({ memberId, zipCode });

async function stall(stallTime = 3000) {
  await new Promise((resolve) => {
    setTimeout(resolve, stallTime);
  });
}

/**
 * Fetch a member by ID and zip code.
 * Throws if memberId starts with '1' (simulates a server validation error).
 */
export async function fetchMember({ memberId, zipCode }) {
  await stall();
  if (memberId?.startsWith('1')) throw new Error('Member ID cannot start with a 1');
  return {
    memberId,
    zipCode,
    name: 'John Doe',
  };
}
