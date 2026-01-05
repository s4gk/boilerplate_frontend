import { Button } from '@/components/ui/button'

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button variant="outline">Apple</Button>
      <Button variant="outline">Google</Button>
      <Button variant="outline">Meta</Button>
    </div>
  )
}
