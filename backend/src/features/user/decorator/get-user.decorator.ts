import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client'; // make sure this is the correct import

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) return null;

    if (data === 'safeUser') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userWithoutHash } = request.user;
      return userWithoutHash;
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
