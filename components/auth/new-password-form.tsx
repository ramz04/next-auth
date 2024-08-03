"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { PasswordResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LucideLoader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"
import { PasswordInput } from "../ui/password-input"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const tokens = searchParams.get("token")

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
    },
  })

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      newPassword(values, tokens).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isPending}
                      placeholder="Enter new password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full gap-2">
              {isPending ? (
                <LucideLoader2 className="animate-spin size-5" />
              ) : (
                ""
              )}
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
