module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'reyhaneh.sa.mo@gmail.com',
          pass: 'cutnlhldswendxcs',
        },
        secure: false,
      },
      settings: {
        defaultFrom: 'reyhaneh.sa.mo@gmail.com',
        defaultReplyTo: 'reyhaneh.sa.mo@gmail.com',
      },
    },
  },
});
