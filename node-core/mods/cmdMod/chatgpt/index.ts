import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import { message } from "node-mirai-sdk";
const SESSION_TOKEN = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..53PcqR3StLGprRUV.H_0mtNSeDzzvdLb1SUhbwUlqSEAdUs1M5HQox47LvZVAbXZWR3XO5eMEqE_sFBQJv9k7OqX46FxWhf3md607F3atUXbHHXPJ2howrvYZQV7ItV2YQ1Kxu35d78IRg8FWxxuoPMeDBcn4hEb7sWKZAF2MsUKrL2JORNVMNwp5SGYbYbnb9n443Kx9r_n0rVHAYtPd2cPRE9abJfaM1RLanx9EIJuUuNjMS4sRRY39-7zIAUJqTyfM1rKsZwdCWLYYLjCqEkYhxq5EscCIEsq8_7I-RVQCsl1ZUhTS8pU0cHqYI7466PrlmXrPHRdVtZ6Uys73JvTQbA74_-_ufSupFOX32m_spQ6MwY9Vl1G8SErpH0v_ryQltv9DCVzN3-tVhd_aSNpkeplFmION_tkwJ98XTR5BVCv95UfwSyIIse1h88p3NddwyURi9G9TdWEvFNPhsm6mDVAqDCqMP7Zr3XgDEm_3MtI4rTSUf2CIjUxm39gFT9fSCjRE4cMt7y-L2FIUzj4XOwJFKFI_0r98BBA9B3694gnPBhmxcu9rtzHc0DYHgOGQwusfqoqdytHM0QUdnorZvFRuOiIy5x9puUAM6sN0sHBiQAzFV6J8chHyHwabcVDfJ9U-aUVyJMYPQeD71JuDDZEnJy4NKxlIW_aD7fnYq9pJMU4nR2yRHjqBOX6G27_gik56pTSeCerYxa1AtSKY_9-GqsR1OsNRwl1_piZdNlxOVmZ0ebSJrCrcc0A5EQiN9VuQW4xTeq6xXj5IydwhpHqhKwStjbhyZgr_bWCxTp8MbPmwtSUSeUceHOkvnHeOXOxKRhNDf0-NivjvZ_DHkz-BBM3bcE-1cn--ibCnnXg3PYJKeoRe-_mio1suWxtLIHHuAvkkLymOZlOio_A1er6ds5dYnhUFKhyC3XmlZ8uvv-OKsK1QrOVJCVDIdRs72XDTUWBcy-hdqjUv1kIng_B48aG5FhRmkuqK2Uf063NQBGKHgl2cf8meVmeoWe-yvG8roAxSty1XUEZp_hDAlORGVD5aV6NA9Ff0Y1MAMYSaSp_oW_KcEBBlf3z94vi3iJ6jQBZx6psxDb5FqvqIgx1kJcUKAlmOs5AJ8i1dEGA-kAe294iCASh7THI8Vgd0CGLCXMN1343wkgZHfTOo0JFZtwvN1cLJjtl5yT-Cgp0rD_WHRNzA9ErFljv4Sv4yM_YwCC3doIcwjcxz4c1P0Z2pNpU6hmo6SNHu_uhd8vR3-AvbGUBdTcCDcFacOmGPo4MHChyakdpfeG4ypis9nbk9niNm7yp4h6dB06m0bJ6qug5lvZfa4RIcbL48VTGlynj4Tkv8LnTFDoOd30kop0q7u3VVXLPhSCE9EV2-dK9fv66H6dBvt9sMMy8x47572HvZj9RzFnWu3oOwey9LCTfyqbA7VLUS9HOfOKoLHBpw7wZ2PMKky0H5jmVKIQ3qpPZ-nL6_AAy0MavAvfSs50hNQX1scC2eiliAsomfeQCNL4sGAY2Xn4WACZ8ffzo6Jj0_DBv30R9gHG6fJNyvdpLVy86DQem3evweVzWDOQ_Unp57X9pkLW6OKFErnaztGC-EiNki_BZwzT9L4x4bHxmqh4hIfe_P5iBjyfkJ1AosQP1UbVNZXV4-cjBqzNk5E-83ty8YitknlgCHLJqAASj26Nhr5i7dR3ZgGaw8d7DTtd565rNB7bsTAeKRod5JED5EWo5jgqjts1__exVIDqmC8ZmYfyUqyEkqPcjONtpJa6exJgIMO7DFQT_JsTsRF8dYy2qLXW92hdbXtmTGkyFQ0Thkzk4AIbGOwKx9d8yhAbI8p2JKeC9nFY1nFxnwOQRPeaYhzwhYbwrothIz-QpqlT4FkiS58WPX3nadKPgg5Uw05SVuilSljRi3dBphCqT1gXRL3N2OM0dhFCiTfWCfyw7tPmIlv09OHPCVvmaB2M5oPDOtVMtqVqQYS75JJPtIreixDO2unEL2tu4lSGb3lpDwSGrCJVd1rcka4wLHxwlKiO6OTl60mGwJ1g_Q4jiieXymINtgTrNOn1kLld3efUpdAEECExfrTHKptHkcR4G-f1gUfu0ytqQiPNtwz5ySox_PG8kYkWLqySzF68Fx37bzMDZOvscjlBeIPrKcvTM37PzD40n3tU3ZQSHLDsYZc_lOVTWaVK5kJts_cOK92mZjn0luhB8k-HHT8Ldj5e2LYyO7Qvyv1LOt5EzkfAj6z9h6FtUf_7h6STfFShto0JOomGJeZ0-aPPXo4uyLW8KxxL2eeHC50ID2ysVkiDbZXyMMW9d9x1v5Dg9iJB2yx5qNQYV6v_rMM9W1SCRO_A.xA6Ywv0ligQP4f1lunJ2SQ'

export class chatgpt implements base {
  static instruction = '测试'
  bot: Bot
  params: any
  message: message
  conversationContexts: Map<number, any>
  timeout: number
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
    this.conversationContexts = new Map();
    this.timeout = 60 * 1000
  }
  async action(...params) {
    // const content = params.join(' ')
    // const currentUserId = this.bot.contextIsolate.message.sender.id;

    // const context = this.getConversationContext(currentUserId)

    // clearImmediate(context.timer)
    // context.timer = setTimeout(() => {
    //   this.conversationContexts.delete(currentUserId);
    // }, this.timeout);

    // const response = await context.conversation.sendMessage(content);
    // this.bot.speak(response, this.message);
  }
  getConversationContext(id) {
    const conversationContext = this.conversationContexts.get(id);
    if (conversationContext) {
      return conversationContext;
    }
  }
}
