import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';

const path = require('path');
const {KJUR} = require('jsrsasign');
const {rsu} = require('jsrsasign-util');

const app: Application = express();
const port: number = 2024;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
    res.send({
        hello: "Welcome to Cheater API",
    });
});


app.post("/asymetric/create", (req: Request, res: Response) => {
    let requestBody = req.body;
    const input = `${requestBody.clientId}|${requestBody.timestamp}`;
    const privateKey = `${requestBody.privateKey}`;
    console.log(requestBody);
    // const privateKey = "-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKlb8EuOh0qQwYfWam4O+NB3wG0UgVz441x8SCXdNTKUDwUj+2eMQ3wTykNE9kN76+fkRatwueNfuQ +i43O1OhXZcvC6seDCuAXKNx8ZmKZc8IsjSmHAR4EbcmHvNt8VOdMevuaE2IEFMfGkn9CNrTISH5IwGXPUVPg1Pa/MX10PYgcTGzP6jNLoW+5c6tM3hLxpBkbMQnBmsnaVM+6s7g4+qkCW6OFSB/SHIG7oABM0AkCkJNlYTJ/zkC+KhDva9S+cg8mlDVVqnWltCWPksf3MkTM08AlEYOeCEG91NS+wRdhC3nD1cRx+9T+UxlXXVMrKpECtgETJKbljpniorZAgMBAAECggEAB+PiLzRmdVi6LGAB9gDvw43lkjxnctYFI2oW6L7vwp7qNRH3Akvc1JEVpA2Xg/850iCH2AKmFLDkjeZ4k1Ufsjq7by0kqoRt00+IXCE9Sish76RFMa0IrYZ/HCB7ea47A/XUSxJL5r9ABYeYFx9Xqn5xXMs0vie4QdsLEo3ixeqePFGEP5YFWOA11T2GDMtGx9Xk3TBdKQJDx8ts+q2kQc1D3+myFJs9CEBunWm9dtg9WB3D0meQue3dYMIngBxNz/gt4EVezjkbYrMTgkuVMCnngybAomMej+lJQentlILi36z9MYv/BpEfWOS5K3/AiBhN/c4v0Gvl4XUO+VapgQKBgQD9WZqRWYj4EXGUslAPWgryKLuTaZC72ht00aqG9jS1c4ZLt7HabzXAHeD/Mzx908y5weaJKZohQFCDMj5h0unu2SDqa9+lkAfYz2ow94Efwstj8FH0K5SXHECR62EwBLTHk9ytNbGlyY7jEVLFzfMRZ+CAzFjI9LyRQdF1sregoQKBgQDMtDVlt+mlde2DVSlzeIj/yDWX00VOUX0cinqrx0Uf87UCWMCv6/3aFonQA/ODPzt63TBqpMVEZar38l97uGgLRIqz8pqRPDCd /3SdE1JCAVcIDthZkHj+bQrCygdrn6qK9eXMXGXoydZ3uT2phYVdvbMHm3uJgjoscP4ksqdnOQKBgAfa71/yVrzaTZs+rBzNvekkOiyn6UTpzlAg8BifKaM2ocNXPrx3FkOOqZtAC3AbUQ2xZWR7VbwSMmze8fA2iepN8SdTkOuhO50NUU2TXv2NHKFMoj3f3AuTZK0hjzHd83z8qKr2Lzvks/l2YAqiCBdSETPtIhOZAv+9+rCbifYBAoGBAIAwGYApO1cyEho8Kkj1IlWKuoTo+G2i+gX1cfxAPTlVE/T0PzXrQnxfwM1SrBt0bXrzKG6f4CiEwhui28hOIllsAq/NLJ3mY0uNvSjgAJL049tX8IOlxR8Oib6RZTQwOEvs0Iq5EdhFDNjMV6DgzDN3p7UL2MCznFpYJ84zUkGBAoGAYveRrLn4VLn63nEcP/dMwPCgjOiYj6smJKz5Jp5tKMSaQGx0sBdMnzNO11YqEOgugd98ITrnMxHtU+/20PI2jtDHajBi02O/+MRov3IXxMfNBxIe1hGsIry5np4CURcr/AZSDXXofgpVKECL92VIPhp+yoCSXMi5dv8FTpUz6c4=-----END PRIVATE KEY-----";
    try {
        var sigObject = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
        sigObject.init(privateKey);
        sigObject.updateString(input);
        var signatureHex = sigObject.sign();
        // the result was in Hex format, convert it into Base64 String format
        var signatureString = Buffer.from(signatureHex, 'hex').toString('base64')
        console.log(signatureString);
    } catch (err){
        console.error(err);

        return false;
    }

    res.send({
        signature: signatureString,
    });
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({
        error: true,
        message: error.message || "Something Went Wrong!",
        data: {}
    });
});

app.listen(port, () => {
    console.log("Application Running on Port =", "localhost:2024", port);
});

module.exports = app;
