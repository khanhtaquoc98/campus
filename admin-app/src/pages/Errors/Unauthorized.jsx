import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Error Code */}
        <div className="text-9xl font-bold text-foreground">
          401
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Unauthorized
          </h1>
          <p className="text-muted-foreground text-base">
            You need to be authenticated to access this resource.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}
