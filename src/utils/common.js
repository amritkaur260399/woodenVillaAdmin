import { convertToRaw, ContentState, EditorState } from 'draft-js';
import moment from 'moment';
import DraftJSToHTML from 'draftjs-to-html';
import HTMLToDraftJS from 'html-to-draftjs';

export const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getInitials = (name) => {
  if (name) {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }
  return '';
};

export const decodeDollarsToDigits = (usd) => {
  let usdCurrency = usd;
  if (!usd) {
    return '';
  }
  if (usd?.indexOf('.') > 0) {
    usdCurrency = usd.substring(0, usd.indexOf('.'));
  }
  if (usdCurrency) {
    return `${usdCurrency.replace(/[^\d]/g, '')}${usd.substring(usd.indexOf('.'))}`;
  }
  return '';
};
export const returnApplicationStatusColor = (key) => {
  switch (key) {
    case 'rejected':
      return 'red';
    case 'completed':
      return 'green';
    case 'pending':
      return 'cyan';
    case 'active':
      return 'purple';
    case 'under_review':
      return 'yellow';
    case 'accepted':
      return 'geekblue';
    default:
      return 'cyan';
  }
};
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

// export const currencyFormatter = new Intl.NumberFormat('en-IN', {
//   style: 'currency',
//   currency: 'INR',
//   minimumFractionDigits: 0,
// });

export const currencyParser = (text) => (text ? Number(text.replace(/[^\d.-]/g, '')) : 0.0);

// input - +919876543210 or 9876543210
export const formatPhoneFromString = (country_code, phone) => {
  if (!phone) return null;
  if (phone.startsWith(country_code)) {
    // eslint-disable-next-line no-param-reassign
    phone = phone.replace(country_code, '');
  }
  return `${country_code} ${phone.substring(0, 5)}-${phone.substring(5)}`;
};

// converts the wysiwyg editor state to html
export const convertStateToHTML = (editorState) => {
  if (editorState) {
    return DraftJSToHTML(convertToRaw(editorState.getCurrentContent()));
  }
  return '';
};

// converts the html back to draft js editor state
export const convertHTMLToState = (html) => {
  if (html) {
    const contentBlock = HTMLToDraftJS(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  }
  return '';
};

// call this function, passing-in your date
export const dateToFromNowDaily = (date) => {
  // get from-now for this date
  const fromNow = moment(date).fromNow();
  // ensure the date is displayed with today and yesterday
  return moment(date).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: () => `[${fromNow}]`,
  });
};
