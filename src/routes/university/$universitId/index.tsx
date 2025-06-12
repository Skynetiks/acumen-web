import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/university/$universitId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/university/$universitId/"!</div>
}
