/**
 *@author leewahjoel
 *@description jwt配置
 */
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET, // 秘钥
    audience: process.env.JWT_TOKEN_AUDIENCE, // 受众
    issuer: process.env.JWT_TOKEN_ISSUER, // 签发人
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  };
});
