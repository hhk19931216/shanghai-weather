import {WebAPI} from "@/service/WebAPI";
import * as jose from 'jose'
import {generateKeyPair, importPKCS8, SignJWT} from "jose";
import webService from "@/service/WebService";



/**
 * @param instance
 * 当前浏览器不支持Ed25519算法未找到合适解决方案暂时弃用JWT
 */
export class JWTService {
    private static _instance: JWTService;
    public static token: string = '';
    private static pkcs8 = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIAlZGbjCIl6KjfMiQ7qxTz14nEQ+AG+/PaKpGVsYDO47
-----END PRIVATE KEY-----`

    public static getInstance(): JWTService {
        if (!this._instance) {
            this._instance = new JWTService();
        }
        return this._instance;
    }

    private static async supportsEd25519() {
        try {
            await window.crypto.subtle.importKey(
                "raw",
                new Uint8Array(32),
                { name: "Ed25519" },
                false,
                ["sign"]
            );
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 生成JWT
     * @constructor
     */
    public static async getJWT() {
        const customHeader = {
            alg: WebAPI.ALG,
            type:"JWT",
            kid: WebAPI.KID
        }
        const iat = Math.floor(Date.now() / 1000) - 30;
        const exp = iat + 900;
        const customPayload = {
            sub: WebAPI.SUB,
            iat: iat,
            exp: exp
        }
        const supports = await this.supportsEd25519();
        if(supports){
            const privateKey =  await jose.importPKCS8(this.pkcs8, "EdDSA",{extractable:true});
            const jwt = await new SignJWT(customPayload)
                .setProtectedHeader(customHeader) // 算法
                .sign(privateKey) // 签名
                .then(token => console.log('JWT: ' + token))
            return jwt;
        }
    }

}

