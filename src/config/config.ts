require('dotenv').config;

export const config = {
  "dev": {
    "aws_region": process.env.AWS_DEFAULT_REGION,
    "aws_profile": process.env.AWS_PROFILE,
  }
}
