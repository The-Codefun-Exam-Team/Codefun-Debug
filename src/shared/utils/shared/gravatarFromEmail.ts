import { Md5 } from "ts-md5";

export const gravatarFromEmail = (gmail: string) => {
  const md5 = new Md5();
  md5.appendStr(gmail);
  const hash = md5.end();
  return `https://www.gravatar.com/avatar/${hash}?d=https://s3.amazonaws.com/wll-community-production/images/no-avatar.png&r=r&s=500`;
};
