/* eslint-disable prettier/prettier */
const errorCode = {
    "0": "UnknownError",
    "8000": "ApiNotFound",
    "5001": "AddCountryError",
    "5002": "GetCountryError",
    "5003": "PersonalAccountAddError",
    "5004": "PersonalAccountUpdateError",
    "5005": "CurrencyAddError",
    "5006": "CurrencyGetError",
    "5007": "PersonalAccountGetError",

    "5010": "AddBankError",
    "5011": "AddBankBranchError",
    "5012": "AddUserBankError",

    "5013": "GetBankError",
    "5014": "GetBankBranchError",
    "5015": "GetUserBankError",

    "5016": "AddDocOptionError",
    "5017": "GetDocOptionError",
    "5018": "AddDocuementError",
    "5019": "GetDocuemntError",

    "5020": "ExchangeRateAddError",
    "8001": "UpdateExchangeRateError",
    "8002": "DeleteExchangeRateError",
    "5021": "InvoiceAddError",
    "5022": "GetInvoiceByIdError",
    "5023": "GetInvoiceByURLError",
    "5024": "GetAllInvoiceError",
    "5044": "UpdateInvoiceByIdError",
    "5045": "DeleteInvoiceByIdError",
    // "5022": "InvoiceGetError",
    // "5023": "AddPaymentError",
    // "5024": "GetPaymentsByLimitError",
    "5025": "GetPaymentByIdError",
    "5026": "PayWithLinkError",
    "5030": "AddPaymentMethodError",
    "5031": "GetPaymentMethodByLimitError",
    "5032": "GetPaymentMethodByIdError",
    "5033": "UpdatePaymentMethodByIdError",
    "5034": "DeletePaymentMethodByIdError",
    "5035": "GatewayFeeAddError",
    "5036": "GatewayFeeUpdateError",
    "5037": "GatewayFeeDeleteError",
    "5038": "GatewayFeeUpdateError",
    "5039": "GatewayFeeDeleteError",
    "5050": "SearchUserError",
    
    "1001": "TokenError",
    "1002": "Unauthorized",
    "1003": "InvalidPassword",
    "1004": "InvalidUsername",
    "1005": "EmailIncorrect",
    "1006": "InvalidInput",
    "1007": "RequiredDataError",
    "1008": "OtpError",
    "1009": "PhoneNumberError",
    "1010": "InvalidPersonalization",
    "1011":"UserNameTakenAlready",
    "1012":"EmailTakenAlready",
    '1013':'ErrorInFetchingPersonalization',
    '1014':'ErrorInSavingPersonalization',
    '1015': "WrongCredentials",
    "1016": "MobileOTPError",
    "1017": "OTPMisMatch",
    "1018": "OTPExpired",
    '1019': "SaveOTPError",
    "1020": "ResetPasswordError",
    "1021": "InvalidUser",
    "1022": "InvalidFullName",
    "1023": "DeviceTokenError",
    "1024": "PhoneAlreadyTakenError",
    "1025": "SignupError",
    "1030": "TokenSaveError",
    "1031": "DeviceTokenSaveError",
    "1050": "RefreshTokenError",
    "1051": "LogoutError",
    "1101": "RoleAddError",

    "2001": "OtpDeviceLoginError",
    "2002": "OtpDeviceTokenError",
    "2003": "OtpDeviceTokenGetError",
    "2004": "OTPForwardError",
    "2005": "OtpRefreshTokenError",
    "2006": "OtpDeviceLogoutError",

    "3001": "WithdrawMoneyError",
    "3002": "GetTransactionByIdError",
    "3003": "GetWithdrawalTransactionByLimitError",
    "3004": "UpdateWithdrawalTransactionByIdError",
    "3005": "DeleteWithdrawalTransactionByIdError",
    "3006": "WebHookError",

    "4001": "UploadKeyError",
    "4002": "ImageTypeError",
    "4003": "ImageDeleteFromLocalError",
    "4004": "FileNotFound",
    "4005": "FileTooLargeError",
    "4006": "PdfTypeError",
    "4111": "UploadImageByAdminError",
    "4112": "GetImageByKeyError",
    "4113": "UpdateImageError",

    "1102": "GetAdminRolesError",
    "1103": "GetAdminRoleByIdError",
    "1104": "UpdateAdminRoleByIdError",
    "1105": "DeleteAdminRoleByIdError",

    "2011": "UpdateAdminProfileError",

    "6001": "NotificationAddError",
    "6002": "NotificationUpdateError",
    "6003": "UserNotificationAddError",
    "6004": "UserNotificationsFindError",
    "6005": "NotificationsFindError",
    "6006": "AllNotificationsFIndError",
    "6007": "NotificationDeleteError",
    "6008": "AllNotificationsFindError",
    "7001": "FreelancerAccountAddError",
    "7002": "GetUserFreelanceAccountError",
    "7003": "DeleteFreelanceAccountError",

    

    "10001": "FetchUserBalanceError",
    "10002": "FetchTransactionError",
    "10003": "BalanceMismatchedError",
    "10004": "CreaditDebitWithBalanceMismatchedError",
    "10005": "TransactionUpdateError",
    "10006": "UpdateBalanceError",
    "10007": "UpdateWithdrawError",
    "10008": "CreditDebitAndLastBalanceMismatchedError",
    "10010": "GetStatementError",

    "12001": "DeleteFeesError",
    "12002": "GetFeesError",
    "12003": "AddFeesError",
    "12004": "UpdateFeesError",
    
    "12005": "GetPolicyError",
    "12006": "AddPolicyError",
    "12007": "UpdatePolicyError",
    "12008": "DeletePolicyError",
    "120010": "CombinedPolicyFindError",
}
module.exports = errorCode

/**
 * 
 * 
 * 
 * 
 */