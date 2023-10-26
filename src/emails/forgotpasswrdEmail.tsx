
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from '@react-email/heading';
import { Text } from '@react-email/text';
import * as React from "react";


export default function ForgotPasswordEmail({params}:{params:{name:string,url:string}}){
    return (
        <Html>
            <Heading as="h2">Hello {params.name}</Heading>
            <Text>We recived the reset password request. if it's not you then pls ignore it</Text>
          <Button
            href={params.url}
            style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
          >
            Click me
          </Button>
          <hr />
          <Heading as="h3">Regards</Heading>
          <Text>Coding with Robin</Text>
        </Html>
      );
}