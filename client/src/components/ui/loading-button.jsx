import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function LoadingButton({ children, loading, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
