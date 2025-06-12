import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/university/$universitId/apply/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/university/$universitId/apply/"!</div>
}
