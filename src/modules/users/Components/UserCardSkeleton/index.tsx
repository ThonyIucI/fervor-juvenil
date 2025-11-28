import { Card } from '@common/components/Card'

export function UserCardSkeleton() {
  return (
    <Card className="p-4 md:hidden">
      <div className="flex items-start gap-4">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Name */}
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />

          {/* Email and Phone */}
          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action button skeleton */}
      <div className="mt-4">
        <div className="h-9 w-full bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </Card>
  )
}
