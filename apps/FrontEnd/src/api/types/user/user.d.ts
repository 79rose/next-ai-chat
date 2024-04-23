declare module User{
//   interface Jwt {
//     /**
//      * 用户角色，保留使用
//      */
//     role: string
//     /**
//      * JWT 类型，有效值为 access 或 refresh
//      */
//     type: string
//     [property: string]: any
//   }
  export interface basic {
    id: number
    username: string
    // access_token: 'string'
    // refresh_token: 'string'
  }

}
