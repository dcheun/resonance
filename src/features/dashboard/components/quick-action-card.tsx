import { Button } from '@/components/ui/button'
import { QuickAction } from '@/features/dashboard/data/quick-actions'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

type QuickAcationCardProps = QuickAction

const QuickActionCard = ({ title, description, gradient, href }: QuickAcationCardProps) => {
  return (
    <div className='bg-card flex gap-4 rounded-xl border p-3'>
      {/* Visual placeholder with gradient */}
      <div
        className={cn(
          'relative h-31 w-41 shrink-0 overflow-hidden rounded-xl bg-linear-to-br',
          gradient,
        )}
      >
        {/* Decorative elements */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='size-12 rounded-full bg-white/30' />
        </div>
        <div className='absolute inset-2 rounded-lg ring-2 ring-white/20 ring-inset' />
      </div>

      {/* Content */}
      <div className='flex flex-col justify-between py-1'>
        <div className='space-y-1'>
          <h3 className='text-sm font-medium'>{title}</h3>
          <p className='text-muted-foreground text-xs leading-relaxed'>{description}</p>
        </div>
        <Button variant='outline' size='xs' asChild className='w-fit'>
          <Link href={href}>
            Try now
            <ArrowRightIcon className='size-3' />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default QuickActionCard
