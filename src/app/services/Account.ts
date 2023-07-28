import { LoginCommand } from '@/app/commands/Common/Account'

export default class AccountService {
  static async login() {
    await new LoginCommand().handle('18056090106', '123456')
  }
}
