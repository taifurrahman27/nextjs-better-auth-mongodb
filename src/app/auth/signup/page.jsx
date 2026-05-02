"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const SignUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log("Submitted data", userData);

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,

            callbackURL: '/'
        });

        if (error) {
            console.log("Error signing up:", error);
            alert("Sign up failed: " + error.message);
        } else {
            console.log("Sign up successful:", data);
            alert("Sign up successful!");
        }
    };

    return (
        <Form className="container mx-auto max-w-3xl mt-10 px-4 py-8 space-y-5 shadow-2xl rounded-2xl" onSubmit={onSubmit}>

            <TextField
                isRequired
                name="name"
                type="text"
                validate={(value) => {
                    if (value.length < 2) {
                        return "Name must be at least 2 characters";
                    }
                    return null;
                }}
            >
                <Label className="text-lg font-medium text-amber-950">Name</Label>
                <Input suppressHydrationWarning placeholder="Your Name" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        return "Please enter a valid email address";
                    }

                    return null;
                }}
            >
                <Label className="text-lg font-medium text-amber-950">Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                    if (value.length < 8) {
                        return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                    }

                    return null;
                }}
            >
                <Label className="text-lg font-medium text-amber-950">Password</Label>
                <Input placeholder="Enter your password" />
                <Description>Must be at least 8 characters with 1 uppercase and 1 number

                </Description>
                <FieldError />
            </TextField>

            <div className="flex gap-2">
                <Button className="text-lg font-medium" type="submit">
                    Submit
                </Button>
                <Button className="text-lg font-medium" type="reset" variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    );
}

export default SignUpPage;