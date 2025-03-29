export class WebAPIError {
  public static CODE_SUCC: number = 1;	// 成功
  public static CODE_ERROR: string = "10001";	// 未知错误
  public static CODE_NOT_LOGGED_IN: number = 401; //未登录或登录已超时
  public static CODE_ERROR_LOGGED_IN: number = 7034; //账号密码错误
  public static CODE_RESULT_FORMAT: string = '99999'; //返回格式错误
  public static SERVE_ERROR: number = 500;	// 服务端错误

  private _code: number;
  private _msg: string;

  constructor(code: number = WebAPIError.CODE_SUCC, msg: string = "成功") {
    this._code = code;
    this._msg = msg;
  }

  public get code(): number {
    return this._code;
  }

  public get msg(): string {
    return this._msg;
  }

  public toString(): string {
    return this.code + ': ' + this.msg;
  }
}

