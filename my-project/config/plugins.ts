export default ({ env }) => ({
    'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
});

module.exports = {
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587, 
        auth: {
          user: 'reyhaneh.sa.mo@gmail.com', 
          pass: 'cutn lhld swen dxcs', 
        },
      },
      settings: {
        defaultFrom: 'reyhaneh.sa.mo@gmail.com', 
        defaultReplyTo: 'reyhaneh.sa.mo@gmail.com',
      },
    },
  },
};

