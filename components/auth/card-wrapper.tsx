"use clients"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  showSocial,
  backButtonHref,
}: CardWrapperProps) => {
  return <Card className="w-[400px] shadow-md">{children}</Card>
}
