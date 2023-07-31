import { LoginCommand } from '@/app/commands/Common/Account'
import {useStore} from "@/store";

export default class AccountService {
  static async login() {
    const res = await new LoginCommand().handle('18056090106', '123456')
    console.log(res, 'useStore().state.userinfo')
    useStore().state.userinfo
  }
}
