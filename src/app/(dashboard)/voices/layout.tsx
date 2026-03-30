import VoicesLayout from '@/app/(dashboard)/voices/views/voices-layout'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <VoicesLayout>{children}</VoicesLayout>
}

export default Layout
