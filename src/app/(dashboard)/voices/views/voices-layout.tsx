import PageHeader from '@/components/page-header'

interface VoicesLayoutProps {
  children: React.ReactNode
}

const VoicesLayout = ({ children }: VoicesLayoutProps) => {
  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <PageHeader title='Voices' />
      {children}
    </div>
  )
}

export default VoicesLayout
