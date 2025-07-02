import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    ramping_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, { 'status was 200': (r) => r.status === 200 });
}