import { toast } from 'sonner';
import PropTypes from 'prop-types';

import { AUTH_API_KEY } from 'src/config-global';

// eslint-disable-next-line import/extensions
import axios from './axios.js';

export const AxiosComponent = async ({ method, url, data = null, callback, showMsg = false }) => {
  const config = {
    method,
    url,
    data: data || undefined,
    headers: {
      'Api-Key': AUTH_API_KEY,
    },
  };

  let res;
  try {
    res = await axios(config);
    if (res.data.status) {
      callback(true, res.data);
    } else {
      callback(false, res.data);
    }
  } catch (e) {
    console.error('AxiosComponent error:', e);
    callback(false, '');
    if (showMsg) {
      /* empty */
    }
    // const errorMsg = e?.response?.data?.message || 'خطا در برقراری ارتباط با سرور';
    if (e.response.data.error) {
      e.response.data.error.slug.forEach((msg) => {
        toast.error(msg);
      });
    }
    const statusCode = e?.request?.status;
    if (statusCode === 400 || statusCode === 402 || statusCode === 405 || statusCode === 500) {
      // handle specific status codes if needed
    } else if (statusCode === 401) {
      window.location.replace('/login');
    } else if (statusCode === 403) {
      // toast.error('شما اجازه دسترسی به این بخش را ندارید!');
    } else if (statusCode === 404) {
      callback(false, 'داده ای یافت نشد');
    }
  }
};

AxiosComponent.propTypes = {
  method: PropTypes.oneOf(['get', 'post', 'put', 'delete', 'patch']).isRequired,
  url: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any,
  showMsg: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};
