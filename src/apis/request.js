const umi = require('umi-request');

const baseUrl = 'https://sheet.best/api/sheets';

export const request = () => {
  return umi.extend({
    prefix: baseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
