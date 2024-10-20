import * as minio from "minio";

declare const globalThis: {
    _client?: minio.Client;
};

const client =
    globalThis._client ??
    new minio.Client({
        endPoint: "localhost",
        port: 9000,
        accessKey: "devuser",
        secretKey: "devpassword",
        region: "us-east-1",
        useSSL: process.env.NODE_ENV === "production",
    });
if (process.env.NODE_ENV !== "production") {
    globalThis._client = client;
}
export { client };
