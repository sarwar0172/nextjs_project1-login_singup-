import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from '@react-email/heading';
import { Text } from '@react-email/text';
import * as React from "react";


export default function EmailValidationmail({params}:{params:{url:string}}){
    return (
        <Html>
            <Text>please click on the button to validate your email.</Text>
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