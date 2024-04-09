enum ResponseCode {
  SUCCESS = 'SU',

  VALIDATION_FAIL = 'VF',
  DUPLICATE_EMAIL = 'DE',
  SIGN_IN_FAIL = 'SF',
  EMAILAUTHCODE_FAIL = 'EF',

  MAIL_FAIL = 'MF',
  DATABASE_ERROR = 'DBE',
}

export default ResponseCode
