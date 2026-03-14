import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JwtExpiryCheckerTool from '@/components/tools/JwtExpiryCheckerTool';

export const metadata: Metadata = {
  title: 'JWT Expiry Checker (Check JSON Web Token Expiration Online)',
  description: 'Instantly check if a JWT has expired. Decode the token payload securely in your browser to view exact expiration dates and time remaining.',
};

export default function JwtExpiryCheckerPage() {
  return (
    <ToolLayout
      title="JWT Expiry Checker (Check JSON Web Token Expiration Online)"
      intro="Tokens failing in production? Paste your JSON Web Token (JWT) into this tool to instantly check its expiration status. It securely decodes the 'exp' claim locally in your browser to calculate the exact expiration date and time remaining, ensuring your sensitive tokens never leave your device."
      toolNode={<JwtExpiryCheckerTool />}
      howTo={[
        "Paste your raw JWT string into the input box.",
        "The tool will instantly decode the Base64Url payload.",
        "If the token contains an 'exp' claim, it will display the exact local expiration date.",
        "A green badge indicates the token is currently valid and active.",
        "A red badge indicates the token has expired."
      ]}
      examples={[
        {
          input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MjQ5OTk5OTl9.signature_here",
          output: "Token is Active (Expires: 1/1/2031, 12:53:19 AM)"
        }
      ]}
      useCases={[
        "Troubleshooting HTTP 401 Unauthorized errors in API integration.",
        "Verifying the lifespan configuration of newly generated authentication tokens.",
        "Checking if a refresh token flow needs to be triggered.",
        "Debugging frontend authentication state mismanagement."
      ]}
      faqs={[
        {
          question: "How does this tool check expiration?",
          answer: "A standard JWT consists of three parts separated by dots. The middle part is the payload, which is Base64Url encoded. This tool decodes that payload and looks for the 'exp' (expiration time) claim, which represents the number of seconds since the Unix Epoch (1970). It then compares that timestamp to your computer's current local time."
        },
        {
          question: "Is my JWT sent to a server?",
          answer: "No. The decoding javascript runs 100% locally in your web browser. No network requests are made with your token. If you are concerned, you can disable your internet connection after loading this page and the tool will still work perfectly."
        },
        {
          question: "Why does it say 'Invalid JWT structure'?",
          answer: "If you receive this error, either the string you pasted is not a properly formatted JWT (Header.Payload.Signature), or the decoded payload does not contain an 'exp' field. Some tokens are designed to live forever and omit the expiration claim entirely."
        },
        {
          question: "Can I use this to refresh an expired token?",
          answer: "No. A JWT cannot be modified or 'renewed' once its expiration time has passed, because changing the payload alters the signature. You must request a brand new token from your authentication server."
        },
        {
          question: "What timezone does the expiration date use?",
          answer: "The tool converts the Unix standard UTC timestamp baked into the token into your browser's local timezone for easier reading."
        }
      ]}
      relatedTools={[
        {
          name: "JWT Decoder & Validator",
          url: "/jwt-validator"
        },
        {
          name: "JWT Generator",
          url: "/jwt-generator"
        },
        {
          name: "Unix Timestamp Converter",
          url: "/timestamp-converter"
        }
      ]}
    />
  );
}
