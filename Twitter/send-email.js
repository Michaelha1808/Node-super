/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { SendEmailCommand, SESClient } = require('@aws-sdk/client-ses')
const { envConfig } = require('./src/constants/config')

// Create SES service object.
const sesClient = new SESClient({
  region: envConfig.awsRegion,
  credentials: {
    secretAccessKey: envConfig.awsSecretAccessKey,
    accessKeyId: envConfig.awsAccessKeyId
  }
})

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

const sendVerifyEmail = async (toAddress, subject, body) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: envConfig.sesFromAddress,
    toAddresses: toAddress,
    body,
    subject
  })

  try {
    return await sesClient.send(sendEmailCommand)
  } catch (e) {
    console.error('Failed to send email.')
    return e
  }
}

sendVerifyEmail(
  'tuananh301603@gmail.com',
  'Tiêu đề email: test aws ses',
  '<h1>Nội dung email được gửi cho tuấn anh ngu dan từ haminhchi1808@gmail.com tức là michael ha đấy, ngày 23</h1>'
)
