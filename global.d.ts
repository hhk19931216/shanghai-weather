declare const localStorage: Storage;

declare global {
    interface Window {
        crypto: Crypto;
    }
}