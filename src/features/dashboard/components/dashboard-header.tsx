'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { HeadphonesIcon, ThumbsUpIcon } from 'lucide-react'
import Link from 'next/link'

const DashboardHeader = () => {
  const { isLoaded, user } = useUser()
  return (
    <div className='flex items-start justify-between'>
      <div className='space-y-1'>
        <p className='text-muted-foreground text-sm'>Nice to see you</p>
        <h1 className='text-2xl font-semibold tracking-tight lg:text-3xl'>
          {isLoaded ? (user?.fullName ?? user?.firstName ?? 'there') : '...'}
        </h1>
      </div>

      <div className='hidden items-center gap-3 lg:flex'>
        <Button variant='outline' size='sm' asChild>
          <Link href='mailto:support@bigdymedia.com'>
            <ThumbsUpIcon />
            <span className='hidden lg:block'>Feedback</span>
          </Link>
        </Button>

        <Button variant='outline' size='sm' asChild>
          <Link href='mailto:support@bigdymedia.com'>
            <HeadphonesIcon />
            <span className='hidden lg:block'>Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default DashboardHeader
