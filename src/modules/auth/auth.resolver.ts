import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { TokenReponseDto } from './dto/token.response.dto';
import { AuthService } from './services/auth.service';

@Resolver(() => TokenReponseDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenReponseDto)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<TokenReponseDto> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => TokenReponseDto)
  async refrehLogin(
    @Args('tokenKey', { type: () => String, nullable: false }) tokenKey: string,
  ): Promise<TokenReponseDto> {
    return this.authService.refreshLogin(tokenKey);
  }

  @Mutation(() => Boolean)
  async logout(
    @Args('tokenKey', { type: () => String, nullable: false }) tokenKey: string,
  ): Promise<boolean> {
    await this.authService.logout(tokenKey);
    return true;
  }
}
